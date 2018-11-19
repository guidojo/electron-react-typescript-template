import * as url from "url";
import * as path from "path";
import * as React from "react";
import { remote, nativeImage, clipboard } from "electron";

type Props = {
    filePath: string;
};

export class GalleryItem extends React.Component<Props> {
    constructor(props: Props) {
        super(props);

        this._onContextMenu = this._onContextMenu.bind(this);
    }

    public render() {
        return <img src={this._fileUrl} onContextMenu={this._onContextMenu} />;
    }

    private _onContextMenu(event: React.MouseEvent) {
        event.preventDefault();
        const window = remote.getCurrentWindow();

        const menu = remote.Menu.buildFromTemplate([
            {
                label: "Show in Folder",
                click: () => {
                    try {
                        remote.shell.showItemInFolder(this.props.filePath);
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            {
                label: "Copy to Clipboard",
                click: () => {
                    try {
                        const image = nativeImage.createFromPath(this.props.filePath);
                        clipboard.writeImage(image);
                    } catch (error) {
                        console.error(error);
                    }
                }
            },
            {
                label: "Show EXIF Information",
                click: () => {
                    const appPath = remote.app.getAppPath();

                    let popupWindow = new remote.BrowserWindow({
                        width: 800,
                        height: 600,
                        parent: window,
                        modal: true,
                        minimizable: false,
                        maximizable: false,
                        webPreferences: {
                            preload: path.join(appPath, "src/renderer/preload.js"),
                            additionalArguments: ["--renderer-process-type=exif-info"]
                        }
                    });

                    const pageURL = url.format({
                        protocol: "file",
                        pathname: path.join(appPath, "src/renderer/popup.html"),
                        query: {
                            filePath: this.props.filePath
                        }
                    });

                    console.log(pageURL);
                    popupWindow.loadURL(pageURL);

                    popupWindow.once("closed", () => {
                        popupWindow = undefined;
                    });
                }
            }
        ]);

        menu.popup({ window });
    }

    private get _fileUrl() {
        return url.format({
            protocol: "file",
            pathname: this.props.filePath
        });
    }
}

import * as React from "react";
import { remote } from "electron";

import { Gallery } from "./Gallery";

interface IAppState {
    dirPath: string;
}

export class App extends React.Component<{}, IAppState> {
    constructor(props) {
        super(props);

        this.state = {
            dirPath: remote.app.getPath("pictures")
        };

        this._selectDirectory = this._selectDirectory.bind(this);
    }

    public render() {
        return (
            <>
                <button onClick={this._selectDirectory}>Select Directory</button>
                <Gallery dirPath={this.state.dirPath} />
            </>
        );
    }

    private _selectDirectory() {
        const window = remote.getCurrentWindow();
        remote.dialog.showOpenDialog(
            window,
            {
                defaultPath: this.state.dirPath,
                properties: ["openDirectory"]
            },
            filePaths => {
                if (!filePaths) return;
                this.setState({
                    dirPath: filePaths[0]
                });
            }
        );
    }
}

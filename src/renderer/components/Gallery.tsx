import * as fs from "fs";
import * as path from "path";
import * as React from "react";

import { GalleryItem } from "./GalleryItem";

type Props = {
    dirPath: string;
};

const kImageFilesPattern = /\.(jpg|png|gif)/i;

export class Gallery extends React.Component<Props> {
    public render() {
        const dirPath = this.props.dirPath;
        const files = fs.readdirSync(dirPath).filter(file => file.match(kImageFilesPattern));

        return (
            <>
                <h1>{dirPath}</h1>
                <div>
                    {files.map(file => (
                        <GalleryItem key={file} filePath={path.join(dirPath, file)} />
                    ))}
                </div>
            </>
        );
    }
}

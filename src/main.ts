import { app, BrowserWindow } from "electron";
import * as path from "path";

const preloadFilePath = path.resolve(app.getAppPath(), "lib/renderer/preload.js");
const html = path.resolve(app.getAppPath(), "lib/renderer/index.html");

// console.log(html);

let mainWindow: BrowserWindow;
app.once("ready", () => {
    mainWindow = new BrowserWindow({
        width: 1000,
        height: 700,
        webPreferences: {
            preload: preloadFilePath,
            additionalArguments: ["--renderer-process-type=main-window"],
            webSecurity: false
        }
    });
    mainWindow.loadFile("lib/renderer/index.html");
    // mainWindow.webContents.openDevTools();

    mainWindow.once("closed", () => {
        mainWindow = undefined;
    });
});

app.once("window-all-closed", () => {
    app.quit();
});

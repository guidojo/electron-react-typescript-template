import * as React from "react";
import * as ReactDOM from "react-dom";

import { App } from "./components/App";

function render() {
    ReactDOM.render(<App />, document.getElementById("root"));
}

document.addEventListener("DOMContentLoaded", render, { once: true });

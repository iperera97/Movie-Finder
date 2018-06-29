import React from "react";
import {render} from "react-dom";
import {BrowserRouter} from "react-router-dom";
import App from "./App";

//root ele
const ROOT_ELE = document.getElementById("root");

//render
render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
, ROOT_ELE)

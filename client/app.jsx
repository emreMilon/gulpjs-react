import React from "react"
import ReactDom from "react-dom"
import {HomePage} from "./components/HomePage/home-page.jsx"


const node_root = document.getElementById("root")

ReactDom.render(<HomePage/>, node_root)
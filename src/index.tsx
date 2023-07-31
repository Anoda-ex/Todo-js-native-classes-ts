
import { init } from "classes/TodoItem";
import { TodoApp } from "classes/TodoApp";
import { render } from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import { TodoTypes } from "types";
import "./styles/global.css"
import "./styles/index.css"

let list = new TodoApp({
    addTodoPopup: document.querySelector("#add-todo-popup"),
    openPopupButton: document.querySelector('#open-popup-button'),
    closePopupButton: document.querySelector('#close-popup-button'),
    inputNameElement: document.querySelector('#input-name'),
    inputTypeElement: document.querySelector('#input-type'),
    addTodoButton: document.querySelector("#add-todo-button")
})

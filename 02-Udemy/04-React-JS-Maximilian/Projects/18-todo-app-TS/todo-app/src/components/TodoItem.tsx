import React from "react"
import classes from "./TodoItem.module.css"

const TodoItem: React.FC<{text: string, onClick: () => void}> = (props) => {
  return <li className={classes.item} onClick={props.onClick}>{props.text}</li>
}

export default TodoItem
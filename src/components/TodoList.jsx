import React, { useState, useRef } from "react";
import { Menu, MenuItem } from "@material-ui/core";
import Card from "./Card";
import color from "./colors";

function generateId() {
  var length = 16,
    charset = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789",
    retVal = "";
  for (var i = 0, n = charset.length; i < length; ++i) {
    retVal += charset.charAt(Math.floor(Math.random() * n));
  }
  return retVal;
}

const TodoList = ({
  list,
  updateCallback,
  clearCallback,
  colorUpdateCallback,
  deleteCallback,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const { gray, black, red, orange, green, blue, deepBlue, purple, pink } =
    color;

  const currentTime = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });

  const handleAddTodo = (e) => {
    const id = generateId();

    updateCallback({
      id: id,
      title: "My brand new card",
      description: "Click on me to edit",
      color: gray,
      time: currentTime,
    });
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    switch (e.currentTarget.getAttribute("data-action")) {
      case "CLEAR":
        clearCallback();
        break;
      default:
        //
        break;
    }

    setAnchorEl(null);
  };

  return (
    <div className="todo__container">
      <div className="todo__header header">
        <h3 className="header__title">Simple to-do list</h3>
        <button className="header__menu" onClick={handleOpenMenu}></button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem data-action="CLEAR" onClick={handleClose}>
            Clear all
          </MenuItem>
        </Menu>
      </div>
      <div className="todo__body">
        {list.map((item) => {
          return (
            <Card
              title={item.title}
              description={item.description}
              color={item.color}
              time={item.time}
              key={item.id}
              id={item.id}
              colorUpdateCallback={colorUpdateCallback}
              deleteCallback={deleteCallback}
            />
          );
        })}
        <button className="todo__add" onClick={handleAddTodo}></button>
      </div>
    </div>
  );
};

export default TodoList;

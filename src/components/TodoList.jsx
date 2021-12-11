import React, { useState, useRef } from "react";
import {
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
} from "@material-ui/core";
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
  const [open, setOpen] = React.useState(false);
  const titleInput = useRef();
  const descInput = useRef();
  const { gray } = color;

  const currentTime = new Date().toLocaleString("en-GB", {
    day: "numeric",
    month: "short",
    hour: "numeric",
    minute: "numeric",
  });

  const handleAddTodo = (e) => {
    setOpen(true);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleCloseMenu = (e) => {
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

  const handleCloseModal = (e) => {
    setOpen(false);
  };

  const addCard = (e) => {
    let title = titleInput.current.value;
    let description = descInput.current.value;

    title = title.split(" ").join("").length ? title : "My unknown card";
    description = description.split(" ").join("").length
      ? description
      : "Without any description";

    const id = generateId();

    updateCallback({
      id: id,
      title: title,
      description: description,
      color: gray,
      time: currentTime,
    });

    setOpen(false);
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
          onClose={handleCloseMenu}>
          <MenuItem data-action="CLEAR" onClick={handleCloseMenu}>
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
        <Dialog
          open={open}
          onClose={handleCloseModal}
          aria-labelledby="form-dialog-title"
          className="modal">
          <span className="modal__title">Create new card</span>
          <DialogContent>
            <input
              ref={titleInput}
              className="modal__input"
              placeholder="Title"></input>
            <input
              ref={descInput}
              className="modal__input"
              placeholder="Description"></input>
          </DialogContent>
          <DialogActions>
            <button className="modal__close mbutton" onClick={handleCloseModal}>
              Close
            </button>
            <button className="modal__create mbutton" onClick={addCard}>
              Create
            </button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
};

export default TodoList;

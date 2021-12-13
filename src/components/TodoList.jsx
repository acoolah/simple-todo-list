import React, { useState, useRef } from "react";
import uniqid from "uniqid";
import Card from "./Card";
import AddDialog from "./AddDialog";
import ClearListMenu from "./ClearListMenu";
import color from "./colors";

const currentTime = new Date().toLocaleString("en-GB", {
  day: "numeric",
  month: "short",
  hour: "numeric",
  minute: "numeric",
});

const TodoList = ({
  list,
  updateCallback,
  clearCallback,
  colorUpdateCallback,
  deleteCallback,
}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const titleInput = useRef();
  const descInput = useRef();
  const { gray } = color;

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

  const handleAddTodo = (e) => {
    setOpen(true);
  };

  const handleOpenMenu = (e) => {
    setAnchorEl(e.currentTarget);
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

    const id = uniqid();

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
    <>
      <div className="todo__container">
        <div className="todo__header header">
          <h3 className="header__title">Simple to-do list</h3>
          <button className="header__menu" onClick={handleOpenMenu}></button>
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
      <AddDialog
        openCallback={open}
        onCloseCallback={handleCloseModal}
        titleInputRef={titleInput}
        descInputRef={descInput}
        addCardCallback={addCard}
      />
      <ClearListMenu
        elementAnchor={anchorEl}
        onCloseCallback={handleCloseMenu}
      />
    </>
  );
};

export default TodoList;

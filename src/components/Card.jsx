import React, { useState, useRef } from "react";
import { Tooltip, Zoom, withStyles, Menu, MenuItem } from "@material-ui/core";
import colors from "./colors";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.15)",
    fontSize: 12,
  },
}))(Tooltip);

const Card = ({
  id,
  color,
  time,
  title,
  description,
  colorUpdateCallback,
  deleteCallback,
}) => {
  const cardColorRef = useRef();
  const cardColorButton = useRef();
  const cardContainerRef = useRef();
  const [anchorEl, setAnchorEl] = useState(null);
  const cardId = id;

  const handleChangeColor = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleClose = (e) => {
    const selectedItem = e.currentTarget.firstChild;
    try {
      const colorId = selectedItem.getAttribute("data-color");
      const selectedColor = Object.values(colors);

      cardColorRef.current.style.backgroundColor = selectedColor[colorId];
      cardColorButton.current.style.backgroundColor = selectedColor[colorId];

      colorUpdateCallback(id, selectedColor[colorId]);
    } catch (e) {
      //
    }

    setAnchorEl(null);
  };

  const handleDeleteCard = (e) => {
    deleteCallback(cardId);
  };

  return (
    <div className="card__container" ref={cardContainerRef}>
      <button className="card__delete" onClick={handleDeleteCard}></button>
      <div
        className="card__color"
        style={{ backgroundColor: `${color}` }}
        ref={cardColorRef}
      ></div>
      <div className="card__body">
        <h4 className="card__title">{title}</h4>
        <span className="card__description">{description}</span>
      </div>
      <div className="card__footer footer">
        <h5 className="footer__time">{time}</h5>
        <LightTooltip
          title="Change color"
          placement="left"
          enterDelay={800}
          TransitionComponent={Zoom}
        >
          <button
            className="footer__color"
            style={{ backgroundColor: `${color}` }}
            onClick={handleChangeColor}
            ref={cardColorButton}
          ></button>
        </LightTooltip>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>
            <span data-color="0" className="color gray"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="1" className="color black"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="2" className="color red"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="3" className="color orange"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="4" className="color green"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="5" className="color blue"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="6" className="color deepBlue"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="7" className="color purple"></span>
          </MenuItem>
          <MenuItem onClick={handleClose}>
            <span data-color="8" className="color pink"></span>
          </MenuItem>
        </Menu>
      </div>
    </div>
  );
};

export default Card;

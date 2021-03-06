import React, { useState, useRef } from "react";
import { Tooltip, Zoom, withStyles } from "@material-ui/core";
import ColorMenu from "./ColorMenu";
import colors from "./colors";

const LightTooltip = withStyles((theme) => ({
  tooltip: {
    backgroundColor: theme.palette.common.white,
    color: "rgba(0, 0, 0, 0.87)",
    boxShadow: "0 6px 10px 0 rgba(0, 0, 0, 0.15)",
    fontSize: 12,
    fontFamily: "inherit",
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

  const handleCloseMenu = (e) => {
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
    const item = e.currentTarget.parentNode;
    item.style.animation = "onDelete 0.5s forwards ease";

    setTimeout(function () {
      deleteCallback(cardId);
    }, 300);
  };

  const handleChangeColor = (e) => {
    setAnchorEl(e.currentTarget);
  };

  return (
    <div className="card__container" ref={cardContainerRef}>
      <button className="card__delete" onClick={handleDeleteCard}></button>
      <div
        className="card__color"
        style={{ backgroundColor: `${color}` }}
        ref={cardColorRef}></div>
      <div className="card__body">
        <h4 className="card__title">{title}</h4>
        <span className="card__description">{description}</span>
      </div>
      <div className="card__footer footer">
        <LightTooltip
          title={"This card was created by you on " + time}
          placement="bottom"
          enterDelay={800}
          TransitionComponent={Zoom}>
          <h5 className="footer__time">{time}</h5>
        </LightTooltip>
        <LightTooltip
          title="Change color"
          placement="left"
          enterDelay={800}
          TransitionComponent={Zoom}>
          <button
            className="footer__color"
            style={{ backgroundColor: `${color}` }}
            onClick={handleChangeColor}
            ref={cardColorButton}></button>
        </LightTooltip>
        <ColorMenu
          elementAnchor={anchorEl}
          menuOnCloseCallback={handleCloseMenu}
        />
      </div>
    </div>
  );
};

export default Card;

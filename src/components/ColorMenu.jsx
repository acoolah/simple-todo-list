import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

function ColorMenu({ elementAnchor, menuOnCloseCallback }) {
  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={elementAnchor}
        keepMounted
        open={Boolean(elementAnchor)}
        onClose={menuOnCloseCallback}>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="0" className="color gray"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="1" className="color black"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="2" className="color red"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="3" className="color orange"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="4" className="color green"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="5" className="color blue"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="6" className="color deepBlue"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="7" className="color purple"></span>
        </MenuItem>
        <MenuItem onClick={menuOnCloseCallback}>
          <span data-color="8" className="color pink"></span>
        </MenuItem>
      </Menu>
    </>
  );
}

export default ColorMenu;

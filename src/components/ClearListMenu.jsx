import React from "react";
import { Menu, MenuItem } from "@material-ui/core";

function ClearListMenu({ elementAnchor, onCloseCallback }) {
  return (
    <>
      <Menu
        id="simple-menu"
        anchorEl={elementAnchor}
        keepMounted
        open={Boolean(elementAnchor)}
        onClose={onCloseCallback}>
        <MenuItem data-action="CLEAR" onClick={onCloseCallback}>
          Clear all
        </MenuItem>
      </Menu>
    </>
  );
}

export default ClearListMenu;

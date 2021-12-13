import React from "react";
import { Dialog, DialogActions, DialogContent } from "@material-ui/core";

function AddDialog({
  openCallback,
  onCloseCallback,
  titleInputRef,
  descInputRef,
  addCardCallback,
}) {
  return (
    <>
      <Dialog
        open={openCallback}
        onClose={onCloseCallback}
        aria-labelledby="form-dialog-title"
        className="modal">
        <span className="modal__title">Create new card</span>
        <DialogContent>
          <input
            ref={titleInputRef}
            className="modal__input"
            placeholder="Title"></input>
          <input
            ref={descInputRef}
            className="modal__input"
            placeholder="Description"></input>
        </DialogContent>
        <DialogActions>
          <button className="modal__close mbutton" onClick={onCloseCallback}>
            Close
          </button>
          <button className="modal__create mbutton" onClick={addCardCallback}>
            Create
          </button>
        </DialogActions>
      </Dialog>
    </>
  );
}

export default AddDialog;

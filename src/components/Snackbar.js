import React from "react";
import Snackbar from "@material-ui/core/Snackbar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/icons/Close";

type Props = {
  open: boolean
};

function SimpleSnackbar(props: Props) {
  function handleClick() {
    // setOpen(true);
  }

  // function handleClose(event, reason) {
  //   if (reason === "clickaway") {
  //     return;
  //   }

  //   // setOpen(false);
  // }

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={props.open}
        autoHideDuration={3000}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">Question Required</span>}
        action={[
          <IconButton
            key="close"
            aria-label="Close"
            color="inherit"
            className={"close"}
            onClick={props.handleClose}
          >
            <CloseIcon />
          </IconButton>
        ]}
      />
    </div>
  );
}

export default SimpleSnackbar;

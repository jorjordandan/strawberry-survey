// @flow
import React from "react"
import Snackbar from "@material-ui/core/Snackbar"
import IconButton from "@material-ui/core/IconButton"
import CloseIcon from "@material-ui/icons/Close"

type Props = {
  userMessage: {
    type: string,
    content: string
  },
  handleClose: () => mixed
}

function checkOpen(message) {
  if (message.type === "none") {
    return false
  } else {
    return true
  }
}

function SimpleSnackbar(props: Props) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right"
        }}
        open={checkOpen(props.userMessage)}
        autoHideDuration={3000}
        onClose={props.handleClose}
        ContentProps={{
          "aria-describedby": "message-id"
        }}
        message={<span id="message-id">{props.userMessage.content}</span>}
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
  )
}

export default SimpleSnackbar

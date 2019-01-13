import React from "react";
import Button from "@material-ui/core/Button";
import { withStyles } from "@material-ui/core/styles";

const styles = theme => ({
  button: {
    margin: theme.spacing.unit
  },
  input: {
    display: "none"
  }
});

function NextButton(props) {
  return (
    <div>
      <Button
        variant="outlined"
        color="primary"
        size="large"
        onClick={props.onClick}
      >
        Next
      </Button>
    </div>
  );
}

export default withStyles(styles)(NextButton);

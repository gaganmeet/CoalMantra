import React from "react";
import CssBaseline from "@material-ui/core/CssBaseline";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(4),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
}));

const MainContainer = ({ children, ...props }) => {
  return (
    <>
      <CssBaseline />
      <Container className={useStyles.root} maxWidth="sm" {...props}>
        {children}
      </Container>
    </>
  );
};

export default MainContainer;

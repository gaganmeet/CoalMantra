import { Container, Button, Popover } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";
import Card from "../card/Card";
import Form from "../form/Form";
const Board = ({ formData, setFormData }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: "flex",
      flexWrap: "wrap",
      justifyContent: "space-around",
      alignItems: "space-between",
      height: "100vh",
      backgroundColor: theme.palette.background.paper,
    },
  }));
  const open = Boolean(anchorEl);
  return (
    <>
      <Container className={useStyles.root} maxWidth="sm">
        <Button variant="contained" color="primary" onClick={handleClick}>
          Create new
        </Button>
        <Popover
          open={open}
          anchorEl={anchorEl}
          onClose={handleClose}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "center",
          }}
          transformOrigin={{
            vertical: "top",
            horizontal: "center",
          }}
        >
          <Form />
        </Popover>
        {formData &&
          formData.map((item) => (
            <Card
              key={item.id}
              data={item}
              setFormData={setFormData}
              formData={formData}
            />
          ))}
      </Container>
    </>
  );
};

export default Board;

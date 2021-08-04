import {
  Card as MCard,
  CardActions,
  Typography,
  CardContent,
  Button,
  Popover,
} from "@material-ui/core";
import Form from "../form/Form";
import { makeStyles } from "@material-ui/core/styles";
import React from "react";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    margin: "1em",
  },
  bullet: {
    display: "inline-block",
    margin: "0 2px",
    transform: "scale(0.8)",
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});
/* make cardList using data received from form 
  on edit open form and send id as props to replace the form in object
  add activity if the update goes through
*/

/*
StockType
DealDate
StartDate
LiftingDate
Port
Vessel
Activity
*/

const Card = ({ data, setFormData, formData }) => {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleDelete = () => {
    let newData = formData.filter((item) => {
      return item._id !== data._id;
    });
    setFormData(newData);
  };
  const {
    _id,
    StockType,
    Port,
    Vessel,
    DealDate,
    StartDate,
    LiftingDate,
    user,
  } = data;
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  return (
    <>
      
      <MCard className={classes.root}>
        <CardContent>
          <Typography variant="h5">Title</Typography>
          <Typography variant="body2">StockType:{StockType}</Typography>
          <Typography variant="body2">Vessel: {Vessel}</Typography>
          <Typography variant="body2">
            Ports: {Port.map((item) => item.value)}
          </Typography>

          <Typography variant="subtitle">Created by: {user}</Typography>
        </CardContent>
        <CardActions>
          <Button onClick={handleClick}>Edit</Button>
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
            <Form id={_id} />
          </Popover>
          <Button onClick={handleDelete}>Delete</Button>
        </CardActions>
      </MCard>
    </>
  );
};

export default Card;

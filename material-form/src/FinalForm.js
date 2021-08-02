import React from "react";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PrimaryButton } from "./components/PrimaryButton";
import { MainContainer } from "./components/MainContainer";
import { Form } from "./components/Form";
import InputLabel from "@material-ui/core/InputLabel";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import MenuItem from "@material-ui/core/MenuItem";
import Select from "@material-ui/core/Select";
import * as yup from "yup";
import FormContainer from "./components/MainContainer";
import { CssBaseline } from "@material-ui/core";

const schema = yup.object().shape({
  StockType: yup.string().required().typeError("required field"),
  DealDate: yup
    .date()
    .required()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Enter Current date or later date"
    )
    .typeError("required field"),
  // yup StartDate schema depend on DealDate
  StartDate: yup
    .date()
    .required()
    .when(
      "DealDate",
      (DealDate, schema) =>
        DealDate &&
        schema.min(DealDate, "Enter Deal date or later date").required(),
      "Enter Current date or later date"
    ),
  LiftingDate: yup
    .date()
    .required()
    .when(
      "StartDate",
      (StartDate, schema) =>
        StartDate &&
        schema.min(StartDate, "Enter Deal date or later date").required(),
      "Enter Current date or later date"
    ),

  Port: yup.array().of(yup.object()).required().typeError("required field"),
  Vessel: yup.string().required().typeError("required field"),
  Lifting: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError("required field"),
});

const initialValues = {
  stockType: "",
  port: "",
  dealDate: new Date(),
  startDate: "",
  lifting: "",
  liftingDate: "",
  vessel: "",
};

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(2),
    minWidth: 500,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

const FinalForm = () => {
  const [formData, setFormData] = React.useState();
  const [stockTypes, setStockTypes] = React.useState([]);
  const [vessels, setVessels] = React.useState([]);
  const [ports, setPorts] = React.useState([]);
  const classes = useStyles();
  React.useEffect(() => {
    fetch("http://localhost:5000/data", {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setStockTypes(data.stockTypes);
        console.log(data);
        setVessels(data.vessel);
        const dports = data.ports.map((port) => ({
          value: port,
          label: port,
        }));
        setPorts(dports);
      });
  }, []);
  const newDate = new Date();
  const date = newDate.toISOString().substring(0, 10);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { isSubmitSuccessful, errors },
    control,
    reset,
    getValues,
  } = useForm({
    defaultValues: {
      DealDate: date,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    console.log(values);
    //setFormData(values);
  };
  React.useEffect(() => {
    if (isSubmitSuccessful) {
      reset({ ...formData, Port: [] });
    }
  }, [formData, isSubmitSuccessful, reset]);

  const getStockOptions = () => {
    let obj = stockTypes.map((stockType) => ({
      value: stockType,
      label: stockType,
    }));
    console.log(obj);
    return obj;
  };

  return (
    <>
      <CssBaseline />
      <FormContainer>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <FormControl
            variant="outlined"
            required
            className={classes.formControl}
          >
            <InputLabel htmlFor="age-native-required">Stock Type</InputLabel>
            <Controller
              name="stockType"
              label="Stock Type"
              type="select"
              error={!!errors.stockType}
              helperText={errors?.stockType?.message}
              control={control}
              defaultValue=""
              render={({ field }) => (
                <Select name="stockType" displayEmpty {...field}>
                  {stockTypes &&
                    stockTypes.map((stockType) => (
                      <MenuItem key={stockType} value={stockType}>
                        {stockType}
                      </MenuItem>
                    ))}
                </Select>
              )}
            />
            
            <FormHelperText>Required</FormHelperText>
          </FormControl>
        </Form>
      </FormContainer>
    </>
  );
};

export default FinalForm;

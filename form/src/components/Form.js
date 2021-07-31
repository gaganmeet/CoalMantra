import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "./Form.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

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

const errorStyle = {
  color: "red",
};

const labelStyle = "ma2";
const divStyle = "flex flex-column justify-center items-center";

const Form = () => {
  // Initialize the form
  const [formData, setFormData] = React.useState();
  const [stockTypes, setStockTypes] = React.useState([]);
  const [vessels, setVessels] = React.useState([]);
  const [ports, setPorts] = React.useState([]);
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

  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className={divStyle}>
          <label className={labelStyle} htmlFor="StockType">
            Stock Type:{" "}
          </label>
          <select className="form-input" {...register("StockType")}>
            {stockTypes &&
              stockTypes.map((stockType) => (
                <option value={stockType} key={stockType}>
                  {stockType}
                </option>
              ))}
          </select>
          {errors.StockType && (
            <p style={errorStyle}>{errors.StockType.message}</p>
          )}
        </div>
        <div className={divStyle}>
          <label htmlFor="port" className={labelStyle}>
            Select Port:
          </label>
          <Controller
            name="Port"
            isClearable
            control={control}
            render={({ field }) => (
              <Select
                {...field}
                options={ports}
                isMulti
                className="form-input"
              />
            )}
          />
          {errors.Port && <p style={errorStyle}>{errors.Port.message}</p>}
        </div>
        <div className={divStyle}>
          <label htmlFor="DealDate" className={labelStyle}>
            Deal Date:{" "}
          </label>
          <input
            className="form-input"
            type="date"
            placeholder="Deal Date"
            {...register("DealDate")}
          />
          {errors.DealDate && (
            <p style={errorStyle}>{errors.DealDate.message}</p>
          )}
        </div>
        <div className="start-date">
          <div className={divStyle}>
            <label htmlFor="StartDate" className={labelStyle}>
              Start Date:
            </label>
            <input
              className="form-input start-date-in"
              type="date"
              placeholder="Start Date"
              {...register("StartDate")}
            />
            {errors.StartDate && (
              <p style={errorStyle}>{errors.StartDate.message}</p>
            )}
          </div>
          <div className={divStyle}>
            <input
              type="button"
              className="date-btn start-date-btn"
              onClick={() =>
                setValue("StartDate", newDate.toISOString().substring(0, 10))
              }
              value="Current Date"
            />
          </div>
        </div>
        <div className="start-date">
          <div className={divStyle}>
            <label htmlFor="Lifting" className={labelStyle}>
              Lifting Time:{" "}
            </label>
            <input
              className="form-input mb3"
              type="number"
              placeholder="Lifting"
              {...register("Lifting")}
              onChange={(e) => {
                let val = getValues("StartDate");
                let nd;
                if (val) {
                  nd = new Date(val);
                  let buf = e.target.value;
                  buf = Number(buf);
                  nd.setDate(new Date(val).getDate() + buf);
                  let d = nd.toISOString().substring(0, 10);
                  setValue("LiftingDate", d);
                }
              }}
            />
            {errors.Lifting && (
              <p style={errorStyle}>{errors.Lifting.message}</p>
            )}
          </div>
          <div className={divStyle}>
            <label htmlFor="LiftingDate" className={labelStyle}>
              Lifting Date:
            </label>
            <input
              className="form-input mb3"
              type="date"
              placeholder="Lifting Date"
              {...register("LiftingDate")}
              onChange={(e) => {
                let liftingDate = new Date(e.target.value);
                let val = getValues("StartDate");
                let nd;
                if (val) {
                  nd = new Date(val);
                  const utc1 = Date.UTC(
                    liftingDate.getFullYear(),
                    liftingDate.getMonth(),
                    liftingDate.getDate()
                  );
                  const utc2 = Date.UTC(
                    nd.getFullYear(),
                    nd.getMonth(),
                    nd.getDate()
                  );
                  let d = Math.floor((utc1 - utc2) / (24 * 60 * 60 * 1000));
                  setValue("Lifting", d);
                }
              }}
            />
            {errors.LiftingDate && (
              <p style={errorStyle}>{errors.LiftingDate.message}</p>
            )}
          </div>
        </div>

        <div className={divStyle}>
          <label htmlFor="Vessel" className={labelStyle}>
            Vessel:
          </label>
          <select className="form-input" {...register("Vessel")}>
            {vessels &&
              vessels.map((vessel) => (
                <option value={vessel} key={vessel}>
                  {vessel}
                </option>
              ))}
          </select>
          {errors.Vessel && <p style={errorStyle}>{errors.Vessel.message}</p>}
        </div>
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
};

export default Form;

/*
.when(
      "StartDate",

      (startDate, schema) =>
        startDate &&
        schema.min(startDate, "Enter Start date or later date").required(),
      "Enter Current date or later date"
    )
    */

/*
    .when(
      "DealDate",
      (DealDate, schema) =>
        DealDate &&
        schema.min(DealDate, "Enter Deal date or later date").required(),
      "Enter Current date or later date"
    )

    .when(
      "StartDate",
      (startDate, schema) =>
        startDate &&
        schema.min(startDate, "Enter Start date or later date").required(),
      "Enter Current date or later date"
    )
    */

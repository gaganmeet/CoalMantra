import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";

import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

const schema = yup.object().shape({
  StockType: yup.string().required().typeError("required field"),
  Port: yup
    .array()
    .of(yup.string())
    .test({ test: (arr) => arr.length !== 0, message: "Select atleast 1 port" })
    .required()
    .typeError("required field"),
  DealDate: yup.date().required().typeError("required field"),
  LiftingDate: yup.date().required().typeError("required field"),
  StartDate: yup.date().required().typeError("required field"),
  Vessel: yup.string().required().typeError("required field"),
  Lifting: yup
    .number()
    .required()
    .positive()
    .integer()
    .typeError("required field"),
});

const Form = () => {
  // Initialize the form
  const [formData, setFormData] = React.useState();

  const newDate = new Date();
  const date = newDate.toISOString().substring(0, 10);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      DealDate: date,
    },
    resolver: yupResolver(schema),
  });
  const onSubmit = (values) => {
    //log values
    setFormData(values);
    console.log(formData);
  };
  console.log(errors);
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <select className="form-input" {...register("StockType")}>
            <option value="Stock 1">Stock 1</option>
            <option value=" Stock 2"> Stock 2</option>
            <option value=" Stock 3"> Stock 3</option>
          </select>
        </div>
        {errors.StockType && <p>{errors.StockType.message}</p>}
        <select
          className="form-input"
          {...register("Port")}
          multiple="multiple"
        >
          <option value="Port 1">Port 1</option>
          <option value="Port 2">Port 2</option>
        </select>
        {errors.Port && <p>{errors.Port.message}</p>}

        <input
          className="form-input"
          type="date"
          placeholder="Deal Date"
          {...register("DealDate")}
        />
        {errors.DealDate && <p>{errors.DealDate.message}</p>}
        <div className="start-date">
          <input
            className="form-input mb3"
            type="number"
            placeholder="Lifting"
            {...register("Lifting")}
            onChange={(e) => {
              let nd = new Date();
              let buf = e.target.value;
              buf = Number(buf);
              //console.log(buf);
              nd.setDate(newDate.getDate() + buf);
              let d = nd.toISOString().substring(0, 10);
              setValue("LiftingDate", d);
            }}
          />
          {errors.Lifting && <p>{errors.Lifting.message}</p>}
          <input
            className="form-input mb3"
            type="date"
            placeholder="Lifting Date"
            {...register("LiftingDate")}
            onChange={(e) => {
              let liftingDate = new Date(e.target.value);
              let nd = new Date();
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
            }}
          />
          {errors.LiftingDate && <p>{errors.LiftingDate.message}</p>}
        </div>
        <div className="start-date">
          <input
            className="form-input start-date-in"
            type="date"
            placeholder="Start Date"
            {...register("StartDate")}
          />
          {errors.StartDate && <p>{errors.StartDate.message}</p>}
          <button
            className="date-btn start-date-btn"
            onClick={() => setValue("StartDate", date)}
          >
            Current Date
          </button>
        </div>
        <select className="form-input" {...register("Vessel")}>
          <option value="Delhi">Delhi</option>
          <option value=" Punjab"> Punjab</option>
          <option value=" Haryana"> Haryana</option>
        </select>
        {errors.Vessel && <p>{errors.Vessel.message}</p>}
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
};

export default Form;

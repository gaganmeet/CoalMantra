import React from "react";
import { useForm } from "react-hook-form";
import "./Form.css";
const Form = () => {
  // Initialize the form
  const [formData, setFormData] = React.useState();

  const newDate = new Date();
  const date = newDate.toISOString().substring(0, 10);
  const {
    register,
    handleSubmit,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    defaultValues: {
      DealDate: date,
    },
  });
  const onSubmit = (values) => {
    //log values
    setFormData(values);
    console.log(formData);
  };
  return (
    <div className="container">
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col">
          <select
            className="form-input"
            {...register("StockType", { required: true })}
          >
            <option value="Stock 1">Stock 1</option>
            <option value=" Stock 2"> Stock 2</option>
            <option value=" Stock 3"> Stock 3</option>
          </select>
        </div>
        <select
          className="form-input"
          {...register("Port", { required: true })}
          multiple="multiple"
        > 
          <option value="Port 1">Port 1</option>
          <option value="Port 2">Port 2</option>
        </select>
        <input
          className="form-input"
          type="date"
          placeholder="Deal Date"
          {...register("DealDate", { required: true })}
        />
        <div className="start-date">
          <input
            className="form-input mb3"
            type="number"
            placeholder="Lifting"
            {...register("Lifting", { required: true, max: 100, min: 1 })}
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
          <input
            className="form-input mb3"
            type="date"
            placeholder="Lifting Date"
            {...register("LiftingDate", { required: true })}
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
        </div>
        <div className="start-date">
          <input
            className="form-input start-date-in"
            type="date"
            placeholder="Start Date"
            {...register("StartDate", { required: true })}
          />
          <button
            className="date-btn start-date-btn"
            onClick={() => setValue("StartDate", date)}
          >
            Current Date
          </button>
        </div>
        <select
          className="form-input"
          {...register("Vessel", { required: true })}
        >
          <option value="Delhi">Delhi</option>
          <option value=" Punjab"> Punjab</option>
          <option value=" Haryana"> Haryana</option>
        </select>
        <input className="submit-btn" type="submit" />
      </form>
    </div>
  );
};

export default Form;

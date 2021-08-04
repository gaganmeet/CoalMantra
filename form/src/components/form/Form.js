import React from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import "./Form.css";
import { ValidationSchema } from "./ValidationSchema";
import { yupResolver } from "@hookform/resolvers/yup";
import { errorStyle, labelStyle, divStyle } from "./styles";
import { nanoid } from "nanoid";
import Activity from "../activity/Activity";


const Form = ({ id, formData, setFormData }) => {
  // form state

  const [stockTypes, setStockTypes] = React.useState([]);
  const [vessels, setVessels] = React.useState([]);
  const [ports, setPorts] = React.useState([]);

  // fetch data for the form and set state
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
    console.log(id);
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
    defaultValues: { formData },
    resolver: yupResolver(ValidationSchema),
  });
  const onSubmit = (values) => {
    let newData = formData;
    const fid = () => {
      if (id) {
        newData = newData.filter((form) => {
          return form._id !== id;
        });
        console.log(id);
        return id;
      }
      return nanoid();
    };
    const user = "Gaganmeet Bahri";
    const _id = fid();
    values = { _id, user, ...values };
    // add values to formData
    setFormData([...newData, values]);
    console.log(formData);
  };
  React.useEffect(() => {
    if (localStorage.getItem("formData")) {
      const data = JSON.parse(localStorage.getItem("formData"));
      setFormData(data);
    }
  }, []);

  React.useEffect(() => {
    localStorage.setItem("formData", JSON.stringify(formData));
  }, [formData]);

  // render form
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
          <input
            type="button"
            className="date-btn start-date-btn"
            onClick={() =>
              setValue("StartDate", newDate.toISOString().substring(0, 10))
            }
            value="Current Date"
          />
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
        <input className="submit-btn mt3" type="submit" />
      </form>
    </div>
  );
};

export default Form;

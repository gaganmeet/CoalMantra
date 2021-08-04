import * as yup from "yup";
export const ValidationSchema = yup.object().shape({
  StockType: yup.string().required().typeError("required field"),
  DealDate: yup
    .date()
    .default(null)
    .required()
    .min(
      new Date(new Date().setDate(new Date().getDate() - 1)),
      "Enter Current date or later date"
    )
    .typeError("required field"),
  StartDate: yup
    .date()
    .default(null)
    .when(
      "DealDate",
      (DealDate, yup) =>
        DealDate && yup.min(DealDate, "Enter Start date later than Deal Date")
    )
    .typeError("required field"),
  Port: yup.array().of(yup.object()).required().typeError("required field"),
  Vessel: yup.string().required().typeError("required field"),
  Lifting: yup.number().required().min(0).integer().typeError("required field"),
});

import React from "react";
import { useForm } from "react-hook-form";
import { Form } from "./components/Form";
import { Header } from "./components/Header";
import { MainContainer } from "./components/MainContainer";
import { Input } from "./components/Input";
export const FinalForm = (props) => {
  const { register, handleSubmit, errors } = useForm();
  const onSubmit = (data) => {
    console.log(data);
  };
  return (
    <MainContainer>
      <Header />
      <Form>
        <Input
          ref={register}
          name="firstName"
          type="text"
          placeholder="first name"
        />
        <Input
          ref={register}
          name="lastName"
          type="text"
          placeholder="last name"
        />
      </Form>
    </MainContainer>
  );
};

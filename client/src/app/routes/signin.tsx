import React from "react";
import { LoginContainer, MIN_LENGTH } from "./login-data";
import Field, { FieldInput } from "app/components/field";
import Button from "app/components/button";
import { useForm } from "react-hook-form";
import { TLoginData, registerUser } from "app/api/users";
import Title from "app/components/title";
import { Link, useNavigate } from "react-router-dom";

export default function () {
  const nav = useNavigate()
  
  const {register, handleSubmit, formState: {isDirty, isValid}} = useForm<TLoginData>({
    defaultValues: {
      password: "",
      login: ""
    }
  })
  
  return (
    <LoginContainer>
      <Title>Register</Title>
      <Field label="Login">
        <FieldInput {...register("login", {
          minLength: MIN_LENGTH
        })}/>
      </Field>
      <Field label="password" >
        <FieldInput type="password" {...register("password", {minLength: MIN_LENGTH})}/>
      </Field>
      <Link to="/login" >Already have an account? Click to login</Link>
      <Button className="rounded" style={{ width: "100%" }} onClick={handleSubmit(async (data) => {
        if (isDirty && isValid) {
         registerUser(nav)(data)
        }
      })}>
        Sign in
      </Button>
    </LoginContainer>
  );
}

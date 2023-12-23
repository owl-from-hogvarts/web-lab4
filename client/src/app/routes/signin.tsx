import React from "react";
import { LoginContainer, MIN_LENGTH, TLoginData } from "./login-data";
import Field, { FieldInput } from "app/components/field";
import Button from "app/components/button";
import { useForm } from "react-hook-form";

export default function () {
  const {register, handleSubmit, formState: {isDirty, isValid}} = useForm<TLoginData>({
    defaultValues: {
      password: "",
      login: ""
    }
  })
  
  return (
    <LoginContainer>
      <Field label="Login">
        <FieldInput {...register("login", {
          minLength: MIN_LENGTH
        })}/>
      </Field>
      <Field label="password" >
        <FieldInput {...register("password", {minLength: MIN_LENGTH})}/>
      </Field>
      <Button className="rounded" style={{ width: "100%" }} onClick={handleSubmit(async (data) => {
        // if (isDirty && isValid) {
        //   fetch(USER_ENDPOINT_URL, {method: "POST", body: JSON.stringify(data)})
        // }
      })}>
        Sign in
      </Button>
    </LoginContainer>
  );
}

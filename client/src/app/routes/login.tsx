import Button from "app/components/button";
import Field, { FieldInput } from "app/components/field";
import React from "react";
import { LoginContainer } from "./login-data";
import { useForm } from "react-hook-form";
import { Link, redirect, useLocation } from "react-router-dom";
import { TLoginData, loginUser } from "app/api/users";
import { REDIRECT_TO_PARAM_NAME } from "app/api/api";

export default function Login() {
  const location = useLocation()
  
  const { register, handleSubmit, formState: {isValid, isDirty} } = useForm<TLoginData>({
    mode: "onChange",
    defaultValues: {
      password: "",
      login: ""
    }
  });


  return (
    <LoginContainer>
      <Field label="Login">
        <FieldInput required {...register("login", {
          minLength: 3
        })} />
      </Field>
      <Field label="password">
        <FieldInput required type="password" {...register("password", {
          minLength: 3
        })} />
      </Field>
      <Link to="/signin" >Do not have an account yet? Register now</Link>
      <Button className="rounded" style={{ width: "100%" }} onClick={handleSubmit(async (data) => {
        if (isValid && isDirty) {
          await loginUser(data)
          const to = new URLSearchParams(location.search).get(REDIRECT_TO_PARAM_NAME)
          if (!to) {
            redirect("/")
            return
          }

          redirect(decodeURI(to))
        }
      })} >
        Login
      </Button>
    </LoginContainer>
  );
}


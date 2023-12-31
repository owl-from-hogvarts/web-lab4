import Button from "app/components/button";
import Field, { FieldInput } from "app/components/field";
import React, { useEffect } from "react";
import { LoginContainer } from "./login-data";
import { useForm } from "react-hook-form";
import { Link, redirect, useLocation, useNavigate } from "react-router-dom";
import { TLoginData, loginUser } from "app/api/users";
import { REDIRECT_TO_PARAM_NAME } from "app/api/api";
import getUserToken from "app/auth/auth";
import Title from "app/components/title";

const SubmitButton = Button.withComponent("input")

export default function Login() {
  const location = useLocation();
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { isValid, isDirty },
  } = useForm<TLoginData>({
    mode: "onChange",
    defaultValues: {
      password: "",
      login: "",
    },
  });

  useEffect(() => {
    if (getUserToken()) {
      navigateTo("/");
      return;
    }
  });

  return (
    <LoginContainer>
      <Title>Login</Title>
      <Field label="Login">
        <FieldInput
          required
          {...register("login", {
            minLength: 3,
          })}
        />
      </Field>
      <Field label="password">
        <FieldInput
          required
          type="password"
          {...register("password", {
            minLength: 3,
          })}
        />
      </Field>
      <Link to="/signin">Do not have an account yet? Register now</Link>
      <SubmitButton
        className="rounded"
        type="submit"
        value="Login"
        style={{ width: "100%" }}
        onClick={handleSubmit(async (data) => {
          if (isValid && isDirty) {
            await loginUser(data);
            const to = new URLSearchParams(location.search).get(
              REDIRECT_TO_PARAM_NAME
            );
            if (!to) {
              navigateTo("/");
              return;
            }

            navigateTo(decodeURI(to));
          }
        })}
      />
    </LoginContainer>
  );
}

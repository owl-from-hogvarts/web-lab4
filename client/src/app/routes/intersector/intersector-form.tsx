import React, { useEffect } from "react";
import Field, { FieldInput } from "app/components/field";
import Scale from "./scale";
import Button from "app/components/button";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { Controller, UseFormRegisterReturn, useForm } from "react-hook-form";
import api from "app/api/api";
import { TScaledPoint, TPoint } from "app/api/point";
import { NaNToUndefined, mergeQueryParams, nonUndefinedProperties } from "utils/url";

const scaleValues = [1, 1.5, 2, 2.5, 3];

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

type TFormFields = TPoint;

const defaultFormValues: TFormFields = {
  pointX: 0,
  pointY: 0,
};

const maxInputLength = 10;

const fieldConstraints = {
  min: -5,
  max: 5,
  maxLength: maxInputLength,
};

export type IntersectorFormProps = {
  onPointAdd?: (point: TPoint) => void;
  scale: number;
  onScaleSet: (scale: number) => void;
};

export default function IntersectorForm({
  onPointAdd = () => {},
  scale,
  onScaleSet = () => {},
}: IntersectorFormProps) {
  // default values should be simple enough to autoconvert to strings
  // queryParams are the highest priority
  const [queryParams, setQueryParams] = useSearchParams(
    defaultFormValues as any
  );

  // deduce default values from query params
  // that is prefill the form
  // if invalid value is found, fallback to absolute defaults
  const {
    register,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TFormFields>({
    // defaultValues: defaultFormValues,
    defaultValues: { ...defaultFormValues, ...parseQueryParams(queryParams) },
    mode: "onChange",
  });

  // useSearchParams does not self default values by itself
  // need to explicitly call set for the first time
  const values = watch(["pointX", "pointY"])
  useEffect(() => {
    const newParams = mergeQueryParams(
      new URLSearchParams(window.location.search),
      new URLSearchParams(getValues() as any)
    );
    setQueryParams(newParams, { replace: true });
  }, [...values]);

  const pointXController = register("pointX", fieldConstraints);
  const pointYController = register("pointY", fieldConstraints);

  function createOnChange<T extends keyof TFormFields>(
    field: UseFormRegisterReturn<T>,
    name: keyof TFormFields
  ) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value.trim();

      if ((value.length > 0 && value[0] !== "-") || value.length > 1) {
        if (value.length > 10) {
          event.target.value = getValues(name).toString();
          field.onChange(event);
          return;
        }

        const num = +value;
        event.target.value = (
          NaNToUndefined(num) ?? defaultFormValues.pointY
        ).toString();
        field.onChange(event);
      }
    };
  }

  return (
    <Settings>
      <Field label="X">
        <FieldInput
          required
          className={errors.pointX ? "invalid" : ""}
          {...pointXController}
          onChange={createOnChange(pointXController, "pointX")}
          type="text"
        />
      </Field>
      <Field label="Y">
        <FieldInput
          required={true}
          className={errors.pointY ? "invalid" : ""}
          {...pointYController}
          onChange={createOnChange(pointYController, "pointY")}
          type="text"
        />
      </Field>
      <Field label="Scale">
        <Scale
          scaleValues={scaleValues}
          currentScale={scale}
          onScaleChange={(event) => {
            onScaleSet(event);
          }}
        />
      </Field>
      <Button
        className="rounded"
        onClick={handleSubmit(async (data) => {
          await api.post("/points", null, { params: {...data, scale} });

          onPointAdd(data);
        })}
      >
        Process!
      </Button>
    </Settings>
  );
}

function parseQueryParams(params: URLSearchParams): Partial<TFormFields> {
  const parsed: Partial<TFormFields> = {
    pointX: NaNToUndefined(params.get("pointX")),
    pointY: NaNToUndefined(params.get("pointY")),
  };

  return nonUndefinedProperties(parsed);
}

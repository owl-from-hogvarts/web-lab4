import React, { useEffect } from "react";
import Field, { FieldInput } from "app/components/field";
import Scale from "./scale";
import Button from "app/components/button";
import styled from "@emotion/styled";
import { useSearchParams } from "react-router-dom";
import { Controller, UseFormRegisterReturn, useForm } from "react-hook-form";
import { colors } from "app/styles/colors";

const scaleValues = [1, 1.5, 2, 2.5, 3];

const Settings = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export type TPoint = {
  pointX: number;
  pointY: number;
};

export type TScaledPoint = TPoint & { scale: number };

const defaultFormValues: TScaledPoint = {
  pointX: 0,
  pointY: 0,
  scale: 1,
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
    control,
    handleSubmit,
    watch,
    getValues,
    formState: { errors },
  } = useForm<TScaledPoint>({
    // defaultValues: defaultFormValues,
    defaultValues: { ...defaultFormValues, ...parseQueryParams(queryParams) },
    mode: "onChange",
  });

  useEffect(() => {
    setQueryParams(getValues() as any);
  }, []);

  // useSearchParams does not self default values by itself
  // need to explicitly call set for the first time
  useEffect(() => {
    const subscription = watch((data) => {
      setQueryParams(data as any, { replace: true });
    });

    return () => subscription.unsubscribe();
  }, [watch]);

  const pointXController = register("pointX", fieldConstraints)
  const pointYController = register("pointY", fieldConstraints);

  function createOnChange<T extends keyof TScaledPoint>(field: UseFormRegisterReturn<T>, name: keyof TScaledPoint) {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const value  = event.target.value.trim();

      if (value.length > 0 && value[0] !== "-" || value.length > 1) {
        if (value.length > 10) {
          event.target.value = getValues(name).toString()
          field.onChange(event)
          return;
        }

        const num = +value;
        event.target.value = (NaNToUndefined(num) ?? defaultFormValues.pointY).toString();
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
        <Controller
          name="scale"
          control={control}
          defaultValue={scale}
          render={({ field }) => (
            <Scale
              scaleValues={scaleValues}
              currentScale={field.value}
              onScaleChange={(event) => {
                field.onChange(event);
                onScaleSet(event);
              }}
            />
          )}
        />
      </Field>
      <Button
        className="rounded"
        onClick={handleSubmit(async (data) => {
          await fetch("/api/v1/points", {
            method: "POST",
            body: JSON.stringify(data),
          });

          onPointAdd(data);
          onScaleSet(getValues("scale"));
        })}
      >
        Process!
      </Button>
    </Settings>
  );
}

function parseQueryParams(params: URLSearchParams): Partial<TPoint> {
  const parsed = {
    pointX: NaNToUndefined(params.get("pointX")),
    pointY: NaNToUndefined(params.get("pointY")),
    scale: NaNToUndefined(params.get("scale")),
  };

  const nonUndefinedProperties = Object.entries(parsed).filter(
    ([_, v]) => v !== undefined
  );
  return Object.fromEntries(nonUndefinedProperties);
}

function NaNToUndefined(
  possibleNaN: string | number | undefined | null
): number | undefined {
  if (possibleNaN === "" || possibleNaN === undefined || possibleNaN === null) {
    return;
  }

  const parse = Number(possibleNaN);
  return isNaN(parse) ? undefined : parse;
}

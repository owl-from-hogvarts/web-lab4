import React, { useEffect, useState } from "react";
import Plot from "./plot";
import IntersectorForm from "./intersector-form";
import PointsTable from "./table";
import {
  PointCheckResult,
  TScale,
  TScaledPoint,
  addPoint,
  getPoints,
} from "app/api/point";
import Pager from "./pager";
import usePages from "app/hooks/usePages";
import { Controller, useForm } from "react-hook-form";
import {
  NaNToUndefined,
  mergeQueryParams,
  nonUndefinedProperties,
} from "utils/url";
import { useSearchParams } from "react-router-dom";

type TRefreshPointsConfig = {
  scale?: TScaledPoint["scale"];
  page?: number;
};

const DEFAULT_PAGE = 1;

type TFormFields = TScale;
const defaultFormValues: TFormFields = {
  scale: 1,
};

export default function Intersector() {
  const [points, setPoints] = useState([] as PointCheckResult[]);
  const [params, setParams] = useSearchParams();

  const { control, watch } = useForm<TFormFields>({
    mode: "onChange",
    defaultValues: {
      ...defaultFormValues,
      ...nonUndefinedProperties({ scale: NaNToUndefined(params.get("scale")) }),
    },
  });

  const { page, totalPages, setPage, setTotalPages } = usePages({
    defaultPage: DEFAULT_PAGE,
    paramName: true,
  });

  const scale = watch("scale");

  useEffect(() => {
    const newParams = mergeQueryParams(
      new URLSearchParams(window.location.search),
      new URLSearchParams({ scale } as any)
    );

    setParams(newParams);
  }, [scale])

  useEffect(() => {
    // watch runs in the same react-render cycle
    // so updates of pages and scale are grouped.
    // So they cause refreshPoints to run only once
    // per two dependencies change
    const subscription = watch((_) => {
      setPage(DEFAULT_PAGE);
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  // on scale change reset page
  // on initial scale set, leave page as is

  useEffect(() => {
    refreshPoints({ scale, page });
  }, [scale, page]);

  async function refreshPoints({ scale, page }: TRefreshPointsConfig = {}) {
    // try {
    const response = await getPoints({ scale, page });
    setPoints(response.points);
    setTotalPages(response.totalPages);
    // } catch (error) {
    //   setPage(DEFAULT_PAGE)
    // }
  }

  return (
    <>
      <Plot
        points={points}
        scale={scale}
        onPointAdd={async (point) => {
          await addPoint({ ...point, scale });
          refreshPoints({ scale, page });
        }}
      />
      <Controller
        control={control}
        name="scale"
        render={({ field }) => (
          <IntersectorForm
            onPointAdd={() => refreshPoints({ scale, page })}
            scale={field.value}
            onScaleSet={(event) => field.onChange(event)}
          />
        )}
      />
      <Pager totalPages={totalPages} page={page} onPageChange={setPage} />
      <PointsTable points={points} />
    </>
  );
}

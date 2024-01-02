import { useReducer, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { NaNToUndefined, mergeQueryParams } from "utils/url";

const DEFAULT_PAGE = 1;
const DEFAULT_TOTAL_PAGES = 1;
const DEFAULT_PARAM_NAME = "page";

type TPagerActions =
  | {
      type: "next" | "previous";
    }
  | {
      type: "setPage";
      page: number;
    }
  | {
      type: "setTotalPages";
      totalPages: number;
    };

export type TPageParamName = string | true | undefined;

export type TUsePagesConfig = {
  defaultPage?: number;
  totalPages?: number;
  /** If `true` provided, use default param name
   * Undefined means do not use search param
   */
  paramName?: TPageParamName;
};

export type TPagesState = {
  page: number;
  totalPages: number | null;
};

export default function usePages(
  config: TUsePagesConfig = { defaultPage: 1, totalPages: 1 }
) {
  const [params, setParams] = useSearchParams(buildParamObject(config));

  const [state, dispatch] = useReducer(
    (prev: TPagesState, action: TPagerActions) => {
      if (action.type === "setPage") {
        return { ...prev, page: getValidPage(action.page, prev.totalPages) };
      }

      if (action.type === "setTotalPages") {
        console.assert(action.totalPages > 0);
        const page =
          prev.page > action.totalPages
            ? config.defaultPage ?? DEFAULT_PAGE
            : prev.page;
        return { ...prev, totalPages: action.totalPages, page };
      }

      return prev;
    },
    {
      page: parsePage(params, getParamName(config.paramName)),
      totalPages: config.totalPages ?? null,
    },
    (init) => {
      const defaultPage = config.defaultPage ?? DEFAULT_PAGE;
      const page =
        init.page === undefined
          ? defaultPage
          : getValidPage(init.page, init.totalPages);

      return {
        page: page,
        totalPages: init.totalPages,
      };
    }
  );

  useEffect(() => {
    const newParams = buildParamObject(config, state.page);
    if (newParams === undefined) {
      return;
    }

    const mergedParams = mergeQueryParams(
      new URLSearchParams(window.location.search),
      new URLSearchParams(newParams)
    );
    setParams(mergedParams, { replace: true });
  }, [state]);

  return {
    ...state,
    setPage: (page: number) => dispatch({ type: "setPage", page }),
    setTotalPages: (totalPages: number) =>
      dispatch({ type: "setTotalPages", totalPages }),
  };
}

function buildParamObject(config: TUsePagesConfig, page?: number) {
  let initSearchParams = undefined;
  if (typeof config.paramName !== "undefined") {
    const paramName = getParamName(config.paramName);

    initSearchParams = {
      [paramName]: (page ?? config.defaultPage ?? DEFAULT_PAGE).toString(),
    };
  }

  return initSearchParams;
}

function getParamName(paramName: TPageParamName) {
  return typeof paramName === "string" ? paramName : DEFAULT_PARAM_NAME;
}

function getValidPage(page: number, totalPages: number | null): number {
  if (page < 1) {
    return 1;
  }

  if (totalPages !== null && page > totalPages) {
    return totalPages;
  }

  return page;
}

function parsePage(params: URLSearchParams, paramName: string) {
  return NaNToUndefined(params.get(paramName));
}

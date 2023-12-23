import { TPoint } from "./point.js";
import { clearTable, insertRow } from "./table.js";
import { buildEndpointUrl, isRequestOk, displaySimpleRequestError, TErrorResponse, displayKnownError } from "./url.js";

const tableBody = document.querySelector("#results-table > tbody") as HTMLTableElement

export type AreaCheckResult = {
  point: TPoint;
  result: boolean;
  calculationTime: number;
  calculatedAt: number;
};

type AreaCheckResponse = {
  user: {
    points: AreaCheckResult[];
  };
};

export async function initPoints(currentScale: number) {
  try {
    const points = await requestPoints()
    updatePoints(currentScale, points)
  } catch (_) {
    updatePoints(currentScale)
  }
}

export function updateTable(
  points: AreaCheckResult[],
  tableBody: HTMLTableElement
) {
  points.reverse();

  clearTable(tableBody);
  for (const { point, result, calculatedAt, calculationTime } of points) {
    insertRow(
      tableBody,
      point,
      result.toString(),
      new Date(calculatedAt).toLocaleTimeString("ru-RU"),
      calculationTime.toString()
    );
  } 
}

export async function requestPoints() {
  // make separate request to update points data
  const pointsRequestUrl = buildEndpointUrl();
  const response = await fetch(pointsRequestUrl, { method: "GET" });
  if (!isRequestOk(response)) {
    if (response.status !== 501) {
      displaySimpleRequestError(response.status);
      return;
    }

    const error = await response.json() as TErrorResponse
    displayKnownError(error)
    return;
  }

  const { points } = ((await response.json()) as AreaCheckResponse).user;

  return points;
}

export function updatePoints(currentScale: number, points?: AreaCheckResult[]) {
  updatePlot(points?.filter(point => point.point.scale === currentScale))
  if (points) {
    updateTable(points, tableBody)
  }
}

// ------- dots -------
// ---- init phase ----
// request current list of dots

// ---- input phase ----
// on new dot pushed to server, re-request list

// ---- update phase ----
// redraw points
// refill table

import { toPreciseString } from "utils/point";
import api from "./api";

const POINTS_ENDPOINT = "/points"

export type TPoint = {
  pointX: number;
  pointY: number;
};

export type TScaledPoint = TPoint & { scale: number };
export type PointCheckResult = {
  id: string;
  isIntersects: boolean;
  calculatedAt: number;
  calculationTime: number;
} & TScaledPoint;

export type TGetPointsParams = {
  scale?: TScaledPoint["scale"]
  page? : number
}

export type TGetPointsResponse = {
  points: PointCheckResult[],
  totalPages: number,
}

export async function getPoints({ scale, page }: TGetPointsParams): Promise<TGetPointsResponse> {
  const response = await api.get(POINTS_ENDPOINT, {
    params: {
      scale,
      page
    },
  });
  return response.data.response;
}

export async function addPoint(point: TScaledPoint) {
  await api.post(POINTS_ENDPOINT, null, {
    params: {
      pointX: toPreciseString(point.pointX),
      pointY: toPreciseString(point.pointY),
      scale: toPreciseString(point.scale),
    }
  })
}

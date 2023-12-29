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

export async function getPoints(scale?: TScaledPoint["scale"]): Promise<PointCheckResult[]> {
  const response = await api.get(POINTS_ENDPOINT, {
    params: {
      scale
    }
  });
  return response.data.ArrayList;
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

import { toPreciseString } from "utils/point";
import api from "./api";

const API_POINTS = "/points"

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

export async function getPoints(): Promise<PointCheckResult[]> {
  const response = await api.get(API_POINTS);
  return response.data.ArrayList;
}

export async function addPoint(point: TScaledPoint) {
  await api.post(API_POINTS, null, {
    params: {
      pointX: toPreciseString(point.pointX),
      pointY: toPreciseString(point.pointY),
      scale: toPreciseString(point.scale),
    }
  })
}

import { clearError, displayError } from "./error.js";
import { Point, TPoint, closeToValueInSet, toPreciseString } from "./point.js";
import { mergeQueryParams } from "./url.js";


const POINT_X_URL_ID = "pointX"
const POINT_Y_URL_ID = "pointY"
const SCALE_URL_ID = "scale"


const scaleValues = [1, 1.5, 2, 2.5, 3]

export class PointInputData {
  public point: Point
  public scale: number = 1
  
  constructor({x, y, scale = 1}: Partial<TPoint> = {}) {
    this.point = new Point(x, y) ?? new Point()
    this.setScale(scale);
  }

  setScale(scale: number) {
    console.log(scale)
    const val = closeToValueInSet(scale, scaleValues)

    if (val === undefined) {
      throw new Error(`Should be one of the following: ${scaleValues.join(" ")}`)
    }

    this.scale = val
  }
}

export const form = document.querySelector("#intersect-input-form") as HTMLFormElement
export const pointXInput = form.querySelector("#input-point-x") as HTMLInputElement
export const pointYInput = form.querySelector("#input-point-y") as HTMLInputElement
export const scaleInput = form.querySelector("#scale-input") as HTMLDivElement
const checkboxes = scaleInput.querySelectorAll(`scale > input[type="checkbox"]`) as NodeListOf<HTMLInputElement>


export function init(url?: URL) {
  const urlParams: Partial<TPoint> = url ? {
    x: Number(url.searchParams.get(POINT_X_URL_ID)) || undefined,
    y: Number(url.searchParams.get(POINT_Y_URL_ID)) || undefined,
    scale: Number(url.searchParams.get(SCALE_URL_ID)) || undefined
  } : {}

  let formData = new PointInputData()
  try { 
    formData = new PointInputData(urlParams)
  } catch (e) {
    // just ignore
    // stick with default values
    // const error = e as Error
    // displayError(error.message);
  }
  updateX(formData)
  updateY(formData)
  update(formData)
  return formData
}

export function updateX(state: PointInputData) {
  setField(pointXInput, state.point.getX())
  update(state)
}

export function updateY(state: PointInputData) {
  setField(pointYInput, state.point.getY())
  update(state)
}

function setField(element: HTMLInputElement, value: number) {
  element.value = toPreciseString(value)
  clearError(element)
}

export function update(state: PointInputData) {
  updateCheckbox(checkboxes, state.scale.toString())
  updateUrl(state)
}

function updateUrl(formData: PointInputData) {
  const queryParams = buildQueryParams(formData)

  const url = new URL(document.URL)
  mergeQueryParams(url.searchParams, queryParams)

  window.history.replaceState({}, "", url)

}

export function buildQueryParams(formData: PointInputData) {
  const url = new URLSearchParams()
  
  url.set(POINT_X_URL_ID, toPreciseString(formData.point.getX()))
  url.set(POINT_Y_URL_ID, toPreciseString(formData.point.getY()))
  url.set(SCALE_URL_ID, formData.scale.toString())

  return url
}

function updateCheckbox(checkboxes: NodeListOf<HTMLInputElement>, value: string) {
  checkboxes.forEach(checkbox => {
    if (checkbox.value === value) {
      checkbox.checked = true
      return;
    }

    checkbox.checked = false
  })
}

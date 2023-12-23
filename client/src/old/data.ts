import { displayError } from "./error.js";
import { buildQueryParams, form, init, pointXInput, pointYInput, scaleInput, updateX, updateY, update } from "./input-form.js";
import { validateNumberInput } from "./point.js";
import { buildEndpointUrl, displayKnownError, displaySimpleRequestError, isRequestOk, mergeQueryParams, url } from "./url.js";
import { initPoints, requestPoints, updatePoints } from "./display-points.js";

const state = init(url)
initPoints(state.scale)

const DEBOUNCE_TIME = 400

pointXInput.addEventListener("input", onNumberInput(DEBOUNCE_TIME, "X", (value) => {
  state.point.setX(value)
  updateX(state)
}))

pointYInput.addEventListener("input", onNumberInput(DEBOUNCE_TIME, "Y", (value) => {
  state.point.setY(value)
  updateY(state)
}))

function onNumberInput(debounceMs: number, name: string, callback: (value: number) => void) {
  return debounce((event: Event) => {
    const input = event.target as HTMLInputElement
  
    const result = validateNumberInput(input.value, name)
    if (result instanceof Error) {
      const error = result
      displayError(error.message, input)
      return;
    }
  
    try {
      callback(result)
    } catch (e) {
      const message = e instanceof Error ? e.message : e as string
      displayError(message, input)
    }
  }, debounceMs)
}

scaleInput.addEventListener("click", (event) => {
  if (!(event.target instanceof HTMLInputElement)) {
    return;
  }

  if (event.target.type !== "checkbox") {
    return;
  }

  const { target } = event
  const scale = Number(target.value)
  state.setScale(scale);

  update(state);
  (async () => {
    const points = await requestPoints()
    updatePoints(scale, points)
  })()
})

form.addEventListener("submit", event => {
  event.preventDefault()

  const request = new XMLHttpRequest()
  // should only check submit data to server
  // server SHOULD NOT send new list of points
  // client requests new point data by itself
  const url = buildEndpointUrl()
  mergeQueryParams(url.searchParams, buildQueryParams(state))

  request.open("GET", url)
  request.send()
  request.addEventListener("load", async response => {
    // check if error
    if (!isRequestOk(request)) {
      if (request.status === 501) {
        displayKnownError(JSON.parse(request.responseText))
        return;
      }
      
      displaySimpleRequestError(request.status)
      return;
    }

    const points = await requestPoints()
    updatePoints(state.scale, points)
  })
})

const canvas = document.querySelector("#plot") as HTMLCanvasElement;
canvas.addEventListener("click", (event) => {

})


function debounce<T extends Function>(callback: T, timeoutMs: number) {
  let timerId: number | undefined = undefined

  return ((...args: any) => {
    window.clearTimeout(timerId)
    timerId = setTimeout(() => callback(...args), timeoutMs) as unknown as number
  })
}



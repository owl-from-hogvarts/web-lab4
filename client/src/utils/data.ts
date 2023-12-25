import { displayError } from "./error.js";
import { validateNumberInput } from "./point.js";

const DEBOUNCE_TIME = 400

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


function debounce<T extends Function>(callback: T, timeoutMs: number) {
  let timerId: number | undefined = undefined

  return ((...args: any) => {
    window.clearTimeout(timerId)
    timerId = setTimeout(() => callback(...args), timeoutMs) as unknown as number
  })
}





const MAX_FLOAT_INPUT_LENGTH = 10

export function toPreciseString(num: number) {
  const str = num.toString()
  if (str.length > MAX_FLOAT_INPUT_LENGTH) {
    return num.toFixed(MAX_FLOAT_INPUT_LENGTH - 3)
  }

  return str
}

export class Point {
  private static DEFAULT_X = 0
  private static DEFAULT_Y = 0
  
  #x: number = Point.DEFAULT_X
  #y: number = Point.DEFAULT_Y

  getX() {
    return this.#x
  }

  getY() {
    return this.#y
  }

  constructor(x?: number, y?: number) {
    this.setX(x)
    this.setY(y)
  }

  setX(x?: number) {
    if (x === undefined || x === null) {
      this.#x = Point.DEFAULT_X
      return;
    }

    if (!(-3 <= x && x <= 3)) {
      throw new Error(`Should be number in range [-3, 3]. Got ${x}`)
    }

    this.#x = x;
  }

  setY(y?: number) {
    if (y == undefined || y == null) {
      this.#y = Point.DEFAULT_Y
      return;
    }

    if (!(-3 <= y && y <= 5)) {
      throw new Error(`Should be number in range [-3, 5]. Got ${y}`)
    }

    this.#y = y;
  }
}

export function closeToValueInSet(value: number, valueSet: number[]) {
  for (const possibleValue of valueSet) {
    if (Math.abs(possibleValue - value) <= 0.25) {
      return possibleValue;
    }
  }
}

export function validateNumberInput(input: string, filedName: string): Error | number {
  const value = Number(input)
  
  if (input.length != 0 && Number.isNaN(value)) {
    return new Error(`Should be number like 1.123, got ${input}`);
  }

  if (input.length > MAX_FLOAT_INPUT_LENGTH) {
    return new Error(`Too large ${filedName} input. Try shorter numbers`)
  }
  
  if (input.length === 0) {
    return value;
  }

  return value
}


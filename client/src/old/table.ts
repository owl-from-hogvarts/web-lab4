import type { TPoint } from "./point";

export function clearTable(tableBody: HTMLTableElement) {
  tableBody!.innerHTML = "";
}

export function insertRow(tableBody: HTMLTableElement, {x, y, scale}: TPoint, result: string, current_time: string, execution_time: string) {
  const row = document.createElement("tr")
  const x_cell = `<td>${x}</td>`
  const y_cell = `<td>${y}</td>`
  const scale_cell = `<td>${scale}</td>`
  const result_cell = `<td>${result}</td>`
  const current_time_cell = `<td>${current_time}</td>`
  const execution_time_cell = `<td>${execution_time} ms</td>`

  const cells = [x_cell, y_cell, scale_cell, result_cell, current_time_cell, execution_time_cell]
  for (const cell of cells) {
    row.insertAdjacentHTML("beforeend", cell)
  }

  tableBody?.appendChild(row)
}
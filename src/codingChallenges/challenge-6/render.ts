import type { CellStatus, Grid } from "./types";

/**
 * Converts a cell status to its display symbol.
 *
 * @param aliveVal Cell status to represent.
 * @returns A heart for a living cell or a skull for a dead cell.
 */
const getStatusChar = (aliveVal: CellStatus) => (aliveVal === 1 ? "❤️" : "💀");

/**
 * Prints the complete grid to the console, with one line per row.
 *
 * @param grid Grid to display.
 */
export const renderGrid = (grid: Grid) => {
  let printStr = "\n";

  grid.forEach((row) => {
    row.forEach((cell) => {
      printStr += getStatusChar(cell);
    });
    printStr += "\n";
  });

  console.log(printStr);
};

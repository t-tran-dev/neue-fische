import { cursorTo, clearScreenDown } from "readline";
import type { CellStatus, Grid } from "./types";

/**
 * Converts a cell status into a colored terminal block.
 *
 * Uses two spaces with an ANSI background color for consistent width.
 * Resets terminal formatting after each cell.
 *
 * @param aliveVal Cell status to represent.
 * @returns A green block for a living cell or a red block for a dead cell.
 */
const getStatusChar = (aliveVal: CellStatus): string =>
  aliveVal === 1 ? "\x1b[42m   \x1b[0m" : "\x1b[41m   \x1b[0m";

/**
 * Prints the complete grid to the console, with one line per row.
 *
 * @param grid Grid to display.
 */
export const renderGrid = (grid: Grid): void => {
  const frame = grid.map((row) => row.map(getStatusChar).join("")).join("\n");

  cursorTo(process.stdout, 0, 0);
  clearScreenDown(process.stdout);
  process.stdout.write(frame);
};

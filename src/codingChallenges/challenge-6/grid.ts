import { GRID_SIZE } from "./constants";
import type { CellStatus, GridRow, Grid } from "./types";
import { isGridRow, isGrid } from "./validation";

/**
 * Generates a random cell status = dead or alive
 */
const getZeroOrOne = (): CellStatus => (Math.random() < 0.5 ? 0 : 1);

/**
 * Creates a row of GRID_SIZE independently randomized cell statuses.
 *
 * @throws {Error} If the generated row fails validation.
 */
const getGridRow = (): GridRow => {
  const gridRow: CellStatus[] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const aliveVal = getZeroOrOne();
    gridRow.push(aliveVal);
  }
  if (!isGridRow(gridRow)) {
    throw new Error("Invalid gridRow");
  }

  return gridRow;
};

/**
 * Creates a random GRID_SIZE × GRID_SIZE grid.
 *
 * Each row is a separate array, and each cell has an approximately
 * 50% probability of being alive.
 *
 * @throws {Error} If a generated row or the grid fails validation.
 */
export const getGrid = (): Grid => {
  const grid: GridRow[] = [];
  for (let i = 0; i < GRID_SIZE; i++) {
    const row = getGridRow();
    grid.push(row);
  }

  if (!isGrid(grid)) {
    throw new Error("Invalid grid");
  }

  return grid;
};

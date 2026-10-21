import { GRID_SIZE } from "./constants";
import type { CellStatus, Grid, GridRow } from "./types";

/**
 * Checks whether a value represents a valid cell status.
 *
 * @param value Value to validate.
 * @returns Whether the value is exactly 0 or 1.
 */
const isCellStatus = (value: unknown): value is CellStatus => {
  return value === 0 || value === 1;
};

/**
 * Checks whether a value is an array of GRID_SIZE valid cell statuses.
 *
 * @param value Value to validate.
 * @returns Whether the value passes the row checks.
 */
export const isGridRow = (value: unknown): value is GridRow => {
  if (!Array.isArray(value)) return false;

  const isCorrectLength = value.length === GRID_SIZE;
  const validCellStatuses = Array.from(value).every(isCellStatus);

  return isCorrectLength && validCellStatuses;
};

/**
 * Checks whether a value is an array of GRID_SIZE valid rows.
 *
 * @param value Value to validate.
 * @returns Whether the value passes the grid checks.
 */
export const isGrid = (value: unknown): value is Grid => {
  if (!Array.isArray(value)) return false;

  const isCorrectLength = value.length === GRID_SIZE;
  const validGridRows = Array.from(value).every(isGridRow);

  return isCorrectLength && validGridRows;
};

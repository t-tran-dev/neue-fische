import { GRID_SIZE } from "./constants";
import type { GridCoords, Grid, CellStatus } from "./types";
import { isGrid } from "./validation";

/**
 * Returns an index and its adjacent indices within the grid boundaries.
 * Indices are returned in ascending order without wrapping at edges.
 *
 * @param index Valid zero-based index from 0 to GRID_SIZE - 1.
 * @returns Two indices at an edge, or three elsewhere.
 */
const getSurroundingIndices = (
  index: number,
): [number, number] | [number, number, number] => {
  switch (index) {
    case 0:
      return [index, index + 1];

    case GRID_SIZE - 1:
      return [index - 1, index];

    default:
      return [index - 1, index, index + 1];
  }
};

/**
 * Returns the coordinates of all neighbors, including diagonals.
 *
 * Excludes the starting cell and positions outside the grid.
 * Returns 3 neighbors at corners, 5 at other edges, and 8 elsewhere.
 *
 * @param rowIndex Valid zero-based row index.
 * @param colIndex Valid zero-based column index.
 * @returns Neighbor coordinates in [row, column] order.
 */
const getNeighborCoords = (
  rowIndex: number,
  colIndex: number,
): GridCoords[] => {
  const rowIndices = getSurroundingIndices(rowIndex);
  const colIndices = getSurroundingIndices(colIndex);
  const neighbors: GridCoords[] = [];

  rowIndices.forEach((entryRow) => {
    colIndices.forEach((entryCol) => {
      if (entryCol === colIndex && entryRow === rowIndex) return;
      neighbors.push([entryRow, entryCol]);
    });
  });

  return neighbors;
};

/**
 * Counts the living neighbors of a cell, including diagonals.
 * The starting cell itself is not counted.
 *
 * @param grid Current generation to read from.
 * @param startCoords Valid coordinates in [row, column] order.
 * @returns Number of living neighbors, from 0 to 8.
 */
const getLivingNeighborsCount = (grid: Grid, startCoords: GridCoords) => {
  const neighborCoords = getNeighborCoords(startCoords[0], startCoords[1]);
  const neighborCount = neighborCoords.reduce((acc, curr) => {
    const currAliveVal = grid[curr[0]][curr[1]];
    acc += currAliveVal;
    return acc;
  }, 0);

  return neighborCount;
};

/**
 * Determines a cell's next status using Conway's Game of Life rules.
 *
 * - A living cell survives with 2 or 3 living neighbors.
 * - A living cell dies with fewer than 2 or more than 3 living neighbors.
 * - A dead cell becomes alive with exactly 3 living neighbors.
 * - All other dead cells remain dead.
 *
 * @param currStatus Current status of the cell.
 * @param currLivingNeighborsCount Number of living neighbors, from 0 to 8.
 * @returns Cell status for the next generation.
 */
const determineStatus = (
  currStatus: CellStatus,
  currLivingNeighborsCount: number,
): CellStatus => {
  switch (true) {
    case currStatus === 1 &&
      (currLivingNeighborsCount === 2 || currLivingNeighborsCount === 3):
    case currStatus === 0 && currLivingNeighborsCount === 3:
      return 1;

    default:
      return 0;
  }
};

/**
 * Calculates the next generation without modifying the input grid.
 *
 * Every next status is calculated from the same original generation.
 * The returned grid and all its rows are newly created arrays.
 * Grid boundaries do not wrap.
 *
 * @param grid Current generation.
 * @returns Validated grid representing the next generation.
 * @throws {Error} If the calculated grid fails validation.
 */
export const getNextGeneration = (grid: Grid): Grid => {
  const nextGrid = grid.map((row, rowIndex) => {
    return row.map((currStatus, colIndex) => {
      const currLivingNeighborsCount = getLivingNeighborsCount(grid, [
        rowIndex,
        colIndex,
      ]);
      const nextStatus = determineStatus(currStatus, currLivingNeighborsCount);
      return nextStatus;
    });
  });

  if (!isGrid(nextGrid)) {
    throw new Error("Invalid grid");
  }

  return nextGrid;
};

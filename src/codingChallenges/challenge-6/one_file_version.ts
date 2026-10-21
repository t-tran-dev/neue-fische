// #region constants.ts

/** Number of rows and columns in the square grid. */
const GRID_SIZE = 50;

/** Time between generation updates, in milliseconds. */
const ANIMATION_DELAY = 500;

// #endregion

// #region types.ts

/** State of a cell: 0 = dead, 1 = alive. */
type CellStatus = 0 | 1;

/**
 * A tuple containing exactly GRID_SIZE cell statuses.
 *
 * Created by recursively adding entries to the accumulator until it reaches
 * the required length.
 *
 * @typeParam Acc Internal accumulator used to construct the tuple.
 */
type GridRow<Acc extends CellStatus[] = []> =
  Acc["length"] extends typeof GRID_SIZE ? Acc : GridRow<[...Acc, CellStatus]>;

/**
 * A tuple containing exactly GRID_SIZE rows.
 *
 * Together with GridRow, this describes a GRID_SIZE × GRID_SIZE grid.
 *
 * @typeParam Acc Internal accumulator used to construct the tuple.
 */
type Grid<Acc extends GridRow[] = []> = Acc["length"] extends typeof GRID_SIZE
  ? Acc
  : Grid<[...Acc, GridRow]>;

/** Zero-based coordinates in [row, column] order. */
type GridCoords = [rowIndex: number, colIndex: number];

// #endregion

// #region validation.ts

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
const isGridRow = (value: unknown): value is GridRow => {
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
const isGrid = (value: unknown): value is Grid => {
  if (!Array.isArray(value)) return false;

  const isCorrectLength = value.length === GRID_SIZE;
  const validGridRows = Array.from(value).every(isGridRow);

  return isCorrectLength && validGridRows;
};

// #endregion

// #region grid.ts

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
const getGrid = (): Grid => {
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

// #endregion

// #region render.ts

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
const renderGrid = (grid: Grid) => {
  let printStr = "\n";

  grid.forEach((row) => {
    row.forEach((cell) => {
      printStr += getStatusChar(cell);
    });
    printStr += "\n";
  });

  console.log(printStr);
};

// #endregion

// #region simulation.ts

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
const getNextGeneration = (grid: Grid): Grid => {
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

// #endregion

// #region index.ts

/**
 * Displays a random initial grid as generation 0, then starts the animation.
 *
 * Each update clears the console and displays the next generation,
 * approximately ANIMATION_DELAY milliseconds after the previous frame.
 * The timer stops after the requested number of updates.
 *
 * Invalid input prints a message without starting the simulation.
 * This function returns without waiting for the animation to finish.
 *
 * @param updateCount Non-negative integer specifying the number of updates
 * after generation 0. Zero displays only the initial grid.
 */
const gameOfLife = (updateCount: number): void => {
  const isInteger = Number.isInteger(updateCount);
  const isNonNegative = updateCount >= 0;
  const isInvalid = !isInteger || !isNonNegative;
  if (isInvalid) return console.log("Please use a non-negative integer");
  let currentGrid = getGrid();
  let generation = 0;
  renderGrid(currentGrid);
  if (generation === updateCount) return;

  const updateDisplay = setInterval(() => {
    generation++;
    const nextGrid = getNextGeneration(currentGrid);
    currentGrid = nextGrid;
    console.clear();
    renderGrid(currentGrid);

    if (generation === updateCount) {
      clearInterval(updateDisplay);
    }
  }, ANIMATION_DELAY);
};

gameOfLife(3);

// #endregion

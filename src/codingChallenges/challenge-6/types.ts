import type { GRID_SIZE } from "./constants";

/** State of a cell: 0 = dead, 1 = alive. */
export type CellStatus = 0 | 1;

/**
 * A tuple containing exactly GRID_SIZE cell statuses.
 *
 * Created by recursively adding entries to the accumulator until it reaches
 * the required length.
 *
 * @typeParam Acc Internal accumulator used to construct the tuple.
 */
export type GridRow<Acc extends CellStatus[] = []> =
  Acc["length"] extends typeof GRID_SIZE ? Acc : GridRow<[...Acc, CellStatus]>;

/**
 * A tuple containing exactly GRID_SIZE rows.
 *
 * Together with GridRow, this describes a GRID_SIZE × GRID_SIZE grid.
 *
 * @typeParam Acc Internal accumulator used to construct the tuple.
 */
export type Grid<Acc extends GridRow[] = []> =
  Acc["length"] extends typeof GRID_SIZE ? Acc : Grid<[...Acc, GridRow]>;

/** Zero-based coordinates in [row, column] order. */
export type GridCoords = [rowIndex: number, colIndex: number];

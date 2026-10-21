import { clearScreenDown, cursorTo } from "node:readline";
import { ANIMATION_DELAY } from "./constants";
import { getNextGeneration } from "./simulation";
import { getGrid } from "./grid";
import { renderGrid } from "./render";

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
    // console.clear();

    cursorTo(process.stdout, 0, 0);
    clearScreenDown(process.stdout);
    renderGrid(currentGrid);

    if (generation === updateCount) {
      clearInterval(updateDisplay);
    }
  }, ANIMATION_DELAY);
};

gameOfLife(3);

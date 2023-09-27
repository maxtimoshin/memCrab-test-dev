import { createContext, useState } from "react";
import { Child, ContextData } from "./@types/Context";
import { Cell } from "./@types/Table";
import { getRandomNumber } from "./services/getRandomNumber";

const defaultValue: ContextData = {
  table: [],
  highlightedIds: [],
  currentRowHoveredIdx: null,
  generateTable: () => {},
  increaseAmount: () => {},
  handleMouseEnter: () => {},
  handleMouseLeave: () => {},
  setClosestValue: () => {},
  removeRowHandler: () => {},
  addRowHandler: () => {},
};

const AppContext = createContext<ContextData>(defaultValue);

const AppContextProvider = ({ children }: Child) => {
  const [table, setTable] = useState<Cell[][] | []>([]);
  const [highlightedIds, setHighlightedIds] = useState<number[]>([]);
  const [closestValue, setClosestValue] = useState<number>(1);
  const [currentRowHoveredIdx, setCurrentRowHoveredIdx] = useState<
    number | null
  >(null);

  // Increase Cell amount by click on it
  function increaseAmount(cellId: number, isDisabled: boolean) {
    if (isDisabled) {
      return;
    }
    const newTable = table?.map((row) =>
      row.map((el) =>
        el.id === cellId ? { ...el, amount: (el.amount += 1) } : el
      )
    );
    setTable(newTable);
  }

  // Show closest elements to current hovered element
  function handleMouseEnter(rowIdx: number, cellId: number, cell: Cell) {
    if (cell.type === "sumCell") {
      setCurrentRowHoveredIdx(rowIdx);
    }

    if (cell.type === "avgCell") {
      return;
    }

    const hoveredElement = table[rowIdx].find((cell) => cell.id === cellId);

    if (!hoveredElement) {
      return;
    }

    const allElements = table?.flat();
    const sortedElements = [...allElements].sort(
      (a: Cell, b: Cell) =>
        Math.abs(a.amount - hoveredElement.amount) -
        Math.abs(b.amount - hoveredElement.amount)
    );

    const closestElementIds = sortedElements
      .slice(1, closestValue + 1)
      .map((element) => element.id);

    setHighlightedIds([...closestElementIds, cellId]);
  }

  // Clear highlighted elements/rows after mouse leave
  function handleMouseLeave() {
    setHighlightedIds([]);
    setCurrentRowHoveredIdx(null);
  }

  // Generate table with random cells amount
  function generateTable(
    rows: number,
    columns: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) {
    e.preventDefault();
    const tableMatrix: Cell[][] = [];
    for (let i = 0; i < rows; i++) {
      tableMatrix.push([]);
      for (let j = 0; j < columns; j++) {
        tableMatrix[i].push({
          // TBD: Refactor to set better id`s for cells
          id: +Math.floor(Math.random() * new Date().getTime()),
          amount: getRandomNumber(0, 301),
          isDisabled: false,
        });
      }
    }
    setTable(tableMatrix);
  }

  // Add new row to table
  function addRowHandler() {
    const rowSize = table[0]?.length || 1;
    const newRow = [];

    for (let cell = 0; cell < rowSize; cell++) {
      newRow.push({
        // TBD: Refactor to set better id`s for cells
        id: +Math.floor(Math.random() * new Date().getTime()),
        amount: getRandomNumber(0, 301),
        isDisabled: false,
      });
    }
    setTable([...table, newRow]);
  }

  function removeRowHandler(rowIdx: number) {
    const removedRowTable = table.filter((_, id) => id !== rowIdx);
    setTable(removedRowTable);
  }

  return (
    <AppContext.Provider
      value={{
        table,
        highlightedIds,
        currentRowHoveredIdx,
        generateTable,
        increaseAmount,
        handleMouseEnter,
        handleMouseLeave,
        setClosestValue,
        removeRowHandler,
        addRowHandler,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export { AppContextProvider, AppContext };

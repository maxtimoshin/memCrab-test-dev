import { ReactNode } from "react";
import { Cell } from "./Table";

export type Child = {
  children: ReactNode;
};

export type ContextData = {
  generateTable: (
    rows: number,
    columns: number,
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => void;
  table: Cell[][] | [];
  currentRowHoveredIdx: number | null;
  highlightedIds: number[];
  increaseAmount: (cellId: number, isDisabled: boolean) => void;
  handleMouseEnter: (rowIdx: number, cellId: number, cell: Cell) => void;
  handleMouseLeave: () => void;
  setClosestValue: (value: number) => void;
  removeRowHandler: (rowIdx: number) => void;
  addRowHandler: () => void;
};

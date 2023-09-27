import { useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./TableCell.module.css";
import { Cell } from "../../@types/Table";

const TableCell = ({ cell, rowIdx }: { cell: Cell; rowIdx: number }) => {
  const {
    increaseAmount,
    handleMouseEnter,
    handleMouseLeave,
    highlightedIds,
    currentRowHoveredIdx,
    tableWithStats,
  } = useContext(AppContext);

  function calculateCellPercent(table: Cell[][], cell: Cell): number {
    let cellPercent = 0;
    const rowSumm = table[rowIdx][table[rowIdx]?.length - 1]?.amount;
    cellPercent = (cell.amount / rowSumm) * 100;
    return cellPercent;
  }

  return (
    <button
      onClick={() => increaseAmount(cell.id, cell.isDisabled)}
      onMouseEnter={() => handleMouseEnter(rowIdx, cell.id, cell)}
      onMouseLeave={handleMouseLeave}
      className={`${styles.tableCell} ${
        cell.isDisabled ? styles.disabled : ""
      } ${highlightedIds.includes(cell.id) ? styles.highlighted : ""}`}
    >
      {currentRowHoveredIdx === rowIdx
        ? cell.type !== "sumCell"
          ? `${calculateCellPercent(tableWithStats, cell).toFixed(1)}%`
          : cell.amount
        : cell.amount}
    </button>
  );
};

export default TableCell;

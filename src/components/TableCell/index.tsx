import { useContext } from "react";
import { AppContext } from "../../AppContext";
import styles from "./TableCell.module.css";
import { Cell } from "../../@types/Table";

const TableCell = ({ cell, rowIdx }: { cell: Cell; rowIdx: number }) => {
  const { increaseAmount, handleMouseEnter, handleMouseLeave, highlightedIds } =
    useContext(AppContext);
  return (
    <button
      onClick={() => increaseAmount(cell.id, cell.isDisabled)}
      onMouseEnter={() => handleMouseEnter(rowIdx, cell.id, cell)}
      onMouseLeave={handleMouseLeave}
      className={`${styles.tableCell} ${
        cell.isDisabled ? styles.disabled : ""
      } ${highlightedIds.includes(cell.id) ? styles.highlighted : ""}`}
    >
      {cell.amount}
    </button>
  );
};

export default TableCell;

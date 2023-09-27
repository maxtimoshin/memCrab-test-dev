import { useContext } from "react";
import { Cell } from "../../@types/Table";
import TableCell from "../TableCell";
import styles from "./TableRow.module.css";
import { AppContext } from "../../AppContext";

const TableRow = ({ row, rowIdx }: { row: Cell[]; rowIdx: number }) => {
  const { currentRowHoveredIdx, removeRowHandler, addRowHandler, table } =
    useContext(AppContext);
  return (
    <div
      className={
        currentRowHoveredIdx === rowIdx
          ? `${styles.hoveredRow} ${styles.tableRow} `
          : styles.tableRow
      }
    >
      {row?.map((cell: Cell) => (
        <TableCell key={cell.id} cell={cell} rowIdx={rowIdx}></TableCell>
      ))}
      {rowIdx !== table.length ? (
        <button
          onClick={() => removeRowHandler(rowIdx)}
          className={styles.removeRowCross}
        ></button>
      ) : (
        <button
          onClick={() => addRowHandler()}
          className={styles.addRowButton}
        ></button>
      )}
    </div>
  );
};

export default TableRow;

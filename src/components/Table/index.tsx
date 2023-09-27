import { useMemo, useContext } from "react";
import styles from "./Table.module.css";
import { AppContext } from "../../AppContext";
import TableRow from "../TableRow";
import { Cell } from "../../@types/Table";
import { getRandomNumber } from "../../services/getRandomNumber";

const Table = () => {
  const { table } = useContext(AppContext);

  function generateTableWithStats(table: Cell[][]) {
    const tableWithStats: Cell[][] = [];

    if (table) {
      const numRows = table?.length;
      const numColumns = table[0]?.length;

      // add vertical column to calculate sum
      for (let row = 0; row < table.length; row++) {
        tableWithStats.push([
          ...table[row],
          {
            id: getRandomNumber(1, 99999),
            amount: table[row].reduce(
              (acc: number, val: Cell) => (acc += val.amount),
              0
            ),
            isDisabled: true,
            type: "sumCell",
          },
        ]);
      }
      const columnSums = [];

      for (let columnIndex = 0; columnIndex < numColumns; columnIndex++) {
        let sum = 0;

        for (let rowIndex = 0; rowIndex < numRows; rowIndex++) {
          sum += table[rowIndex][columnIndex].amount;
        }

        columnSums.push(sum);
      }

      // Calculate the averages for each column
      const columnAverages = columnSums.map((sum) => sum / numRows);

      const averageValueColumn = columnAverages.map((e: number) => {
        return {
          id: getRandomNumber(1, 99999),
          amount: +e.toFixed(2),
          isDisabled: true,
          type: "avgCell",
        };
      });
      tableWithStats.push(averageValueColumn);
      tableWithStats[tableWithStats.length - 1]?.push({
        id: getRandomNumber(1, 99999),
        // TBD : fix amount visualization
        amount: null,
        isDisabled: true,
        type: "avgCell",
      });
    }

    return tableWithStats;
  }

  const tableWithStats = useMemo(() => generateTableWithStats(table), [table]);

  return (
    <>
      <div className={styles.table}>
        {tableWithStats.map((row: Cell[], idx: number) => (
          <TableRow key={idx} row={row} rowIdx={idx} />
        ))}
      </div>
    </>
  );
};

export default Table;

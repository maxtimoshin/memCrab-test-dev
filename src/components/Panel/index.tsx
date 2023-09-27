import { ChangeEvent, useCallback, useContext, useState } from "react";
import styles from "./Panel.module.css";
import { AppContext } from "../../AppContext";
import { TTableSize } from "../../@types/Table";

const Panel = () => {
  const { generateTable, setClosestValue } = useContext(AppContext);
  const [tableSize, setTableSize] = useState<TTableSize>({
    rows: "",
    columns: "",
  });

  const tableSizeHandler = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      if (e.target.name === "rows") {
        if (+e.target.value > 100) {
          setTableSize({ ...tableSize, rows: 100 });
          return;
        } else if (+e.target.value < 0) {
          setTableSize({ ...tableSize, rows: 1 });
          return;
        }
        setTableSize({ ...tableSize, rows: +e.target.value });
      } else {
        if (+e.target.value > 100) {
          setTableSize({ ...tableSize, columns: 100 });
          return;
        } else if (+e.target.value < 0) {
          setTableSize({ ...tableSize, columns: 1 });
          return;
        }
        setTableSize({ ...tableSize, columns: +e.target.value });
      }
    },
    [tableSize]
  );

  return (
    <div className={styles.panel}>
      <form action="">
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Number of rows"
          name="rows"
          value={tableSize.rows}
          onChange={(e) => tableSizeHandler(e)}
        />
        <input
          type="number"
          min={0}
          max={100}
          placeholder="Number of columns"
          name="columns"
          value={tableSize.columns}
          onChange={(e) => tableSizeHandler(e)}
        />
        <input
          type="number"
          name="nearest"
          placeholder="Find nearest by value (1 default)"
          // TBD: change event prop
          onChange={(e) => setClosestValue(+e.target.value)}
        />
        <button
          type="submit"
          onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
            generateTable(+tableSize.rows, +tableSize.columns, e)
          }
        >
          Generate Table
        </button>
      </form>
    </div>
  );
};

export default Panel;

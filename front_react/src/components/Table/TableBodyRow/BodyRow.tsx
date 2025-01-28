import { Dispatch, useEffect } from "react";

import { useSearchParams } from "react-router-dom";

import { TableType } from "../../../types/TableType";

import styles from "./BodyRow.module.css";
import BodyRowCell from "./TableBodyRowCell/BodyRowCell";
import BodyRowOrderExtension from "./TableBodyRowOrderExtension/BodyRowOrderExtension";
import BodyRowUserExtension from "./TableBodyRowUserExtension/BodyRowUserExtension";

interface IProps<T> {
  item: T;
  chosenToExpand: number | null;
  setChosenToExpand: Dispatch<number | null>;
}

const BodyRow = <T extends TableType>({
  item,
  chosenToExpand,
  setChosenToExpand,
}: IProps<T>) => {
  const query = useSearchParams();

  useEffect(() => {
    setChosenToExpand(null);
  }, [query[0]]);

  const clickHandle = () => {
    if (chosenToExpand === item.id) {
      setChosenToExpand(null);
    } else {
      setChosenToExpand(item.id);
    }
  };
  return (
    <>
      <tr onClick={clickHandle} className={styles.order_row}>
        {Object.entries(item || {}).map((cell, i) => (
          <BodyRowCell key={i} cell={[cell[0], String(cell[1])]} />
        ))}
      </tr>
      {!!item && "manager" in item && (
        <BodyRowOrderExtension
          chosenToExpand={chosenToExpand}
          order_id={item.id}
        />
      )}
      {!!item && "role" in item && (
        <BodyRowUserExtension
          chosenToExpand={chosenToExpand}
          user_id={item.id}
        />
      )}
    </>
  );
};

export default BodyRow;

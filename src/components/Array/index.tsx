import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../redux-store";
import startSorting from "../../sorting-logic/logic";
import { toggleIsSorting } from "../../redux-store/sortingSlice";

const createRandomArray = (size: number) => {
  let multiplier: number;
  if (size < 100) {
    multiplier = 5;
  } else if (size < 200) {
    multiplier = 4;
  } else if (size < 300) {
    multiplier = 2.5;
  } else if (size < 400) {
    multiplier = 2;
  } else {
    multiplier = 1.5;
  }
  const newArr = Array(size);
  for (let i = 0; i < size; i++) {
    newArr[i] = (i + 1) * multiplier;
  }

  // shuffle array randomly
  newArr.sort((a, b) => 0.5 - Math.random());
  return newArr;
};

const SortingVisualizer = () => {
  const size = useSelector((state: RootState) => state.config.size);
  const mode = useSelector((state: RootState) => state.config.mode);
  const isSorting = useSelector((state: RootState) => state.sorting.isSorting);
  const [arr, setArr] = useState<number[]>([]);
  const dispatch = useDispatch();

  useEffect(() => {
    const randomArr = createRandomArray(size);
    setArr(randomArr);
  }, [size]);

  useEffect(() => {
    const sortedArr = [...arr].sort((a, b) => a - b);
    if (isSorting) {
      if (JSON.stringify(arr) === JSON.stringify(sortedArr)) {
        dispatch(toggleIsSorting());
        return;
      }
      const newArr = [...arr];
      startSorting(setArr, newArr, mode);
    }
  }, [isSorting, arr]);

  return (
    <div className={styles.container}>
      {arr.map((item, index) => (
        <div
          className={styles.sortItem}
          style={{
            height: `${item}px`,
          }}
          key={index}
        ></div>
      ))}
    </div>
  );
};

export default SortingVisualizer;

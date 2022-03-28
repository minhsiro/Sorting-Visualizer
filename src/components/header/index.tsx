import { useRef, useState } from "react";
import styles from "./styles.module.scss";
import SortingAlgos from "../../const/sorting";
import {
  changeMode,
  changeIteration,
  changeSize,
} from "../../redux-store/arrayConfigSlice";
import { toggleIsSorting } from "../../redux-store/sortingSlice";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux-store";

const Header = () => {
  const mode = useSelector((state: RootState) => state.config.mode);
  const arrSize = useSelector((state: RootState) => state.config.size);
  const delay = useSelector((state: RootState) => state.config.iteration);
  const isSorting = useSelector((state: RootState) => state.sorting.isSorting);
  const dispatch = useDispatch();

  const modeChangeHandler = (event: any) => {
    dispatch(changeMode(event.target.value));
  };
  const submitHandler = (event: any) => {
    dispatch(toggleIsSorting());
    event.preventDefault();
  };

  const arrSizeChangeHandler = (event: any) => {
    dispatch(changeSize(event.target.value));
  };

  const delayChangeHandler = (event: any) => {
    dispatch(changeIteration(event.target.value));
  };

  return (
    <>
      <header className={styles.header}>
        <form onSubmit={submitHandler}>
          <label htmlFor="modes">Sorting Mode:</label>
          <select
            name="modes"
            id="modes"
            value={mode}
            onChange={modeChangeHandler}
            disabled={isSorting}
          >
            <option value={SortingAlgos.bubble}>Bubble Sort</option>
            <option value={SortingAlgos.selection}>Selection Sort</option>
            <option value={SortingAlgos.insertion}>Insertion Sort</option>
            <option value={SortingAlgos.merge}>Merge Sort</option>
            <option value={SortingAlgos.heap}>Heap Sort</option>
            <option value={SortingAlgos.radix}>Radix Sort</option>
            <option value={SortingAlgos.quick}>Quick Sort</option>
            <option value={SortingAlgos.bitonic}>Bitonic Sort</option>
          </select>
          <div>
            <p>Array Size:</p>
            <input
              type="range"
              id="vol"
              name="vol"
              min="10"
              max="500"
              value={arrSize}
              onChange={arrSizeChangeHandler}
              disabled={isSorting}
            />
            <p>{arrSize}</p>
          </div>

          <div>
            <p>Iteration Delay:</p>
            <input
              type="range"
              id="delay"
              name="delay"
              min="1"
              max="100"
              value={delay}
              onChange={delayChangeHandler}
              disabled={isSorting}
            />
            <p>{delay}</p>
          </div>
          <button type="submit" disabled={isSorting}>
            Sort
          </button>
        </form>
      </header>
    </>
  );
};

export default Header;

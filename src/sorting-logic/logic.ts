import SortingAlgos from "../const/sorting";
import store from "../redux-store/index";
import delay from "../utils/time";

type callback = (x: number[]) => void;

export default function startSorting(
  fn: callback,
  arr: number[],
  mode: string
) {
  let iteration = store.getState().config.iteration;
  switch (mode) {
    case SortingAlgos.bubble: {
      bubbleSort(fn, arr, iteration);
      return;
    }
    case SortingAlgos.insertion: {
      insertionSort(fn, arr, iteration);
      return;
    }
    case SortingAlgos.selection: {
      selectionSort(fn, arr, iteration);
      return;
    }
    case SortingAlgos.merge: {
      const condition = {
        hasSorted: false,
      };
      fn(mergeSort(arr, condition));
      delay(iteration);
      return;
    }
    case SortingAlgos.quick: {
      quickSort(fn, arr, iteration);
      return;
    }
  }
}

// stable algorithm
function bubbleSort(fn: callback, arr: number[], iteration: number) {
  let hasSorted = false;
  for (let i = 0; i < arr.length - 1; i++) {
    for (let j = i; j < arr.length - i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        hasSorted = true;
        // break; // this will change the behavior of the visualization
      }
    }
    if (hasSorted) {
      delay(iteration);
      fn(arr);
      break;
    }
  }
}

// stable algorithm
function insertionSort(fn: callback, arr: number[], iteration: number) {
  let hasSorted = false;
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && key < arr[j]) {
      arr[j + 1] = arr[j];
      j = j - 1;
      hasSorted = true;
    }
    arr[j + 1] = key;
    if (hasSorted) {
      delay(iteration);
      fn(arr);
      break;
    }
  }
}

// stable algorithm
function selectionSort(fn: callback, arr: number[], iteration: number) {
  let hasSorted = false;
  for (let i = 0; i < arr.length; i++) {
    let minIndex = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[minIndex]) {
        minIndex = j;
        hasSorted = true;
      }
    }
    let temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
    if (hasSorted) {
      delay(iteration);
      fn(arr);
      break;
    }
  }
}

// divide & conquer algorithm
function mergeSort(arr: number[], condition: { hasSorted: boolean }): number[] {
  if (arr.length < 2) {
    return arr;
  }
  let mid = arr.length / 2;
  const left = arr.slice(0, mid);
  const right = arr.slice(mid);
  return merge(
    mergeSort(left, condition),
    mergeSort(right, condition),
    condition
  );
}

function merge(
  left: number[],
  right: number[],
  condition: {
    hasSorted: boolean;
  }
): number[] {
  if (condition.hasSorted === true) {
    return [...left, ...right];
  }

  let arr = [];
  let i = 0;
  let j = 0;
  while (i < left.length && j < right.length) {
    if (left[i] < right[j]) {
      arr.push(left[i++]);
    } else {
      arr.push(right[j++]);
    }
  }

  while (i < left.length) arr.push(left[i++]);
  while (j < right.length) arr.push(right[j++]);
  if (JSON.stringify(arr) !== JSON.stringify([...left, ...right])) {
    condition.hasSorted = true;
  }
  return arr as number[];
}

function quickSort(fn: callback, arr: number[], iteration: number) {}

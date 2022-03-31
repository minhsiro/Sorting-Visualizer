import SortingAlgos from "../const/sorting";
import store from "../redux-store/index";
import delay from "../utils/time";

type callback = (x: number[]) => void;

export let quickSortHelper: number[] = [];

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
      const condition = {
        hasSorted: false,
      };
      quickSort(arr, 0, arr.length - 1, condition);
      fn(arr);
      delay(iteration);
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
/**
 * Ideas
 * - split the array in half,
 * and then split those 2 small arrays in half
 * keep doing it recursively until those arrays can't be splitted anymore
 * this will be LogN
 * - merge those small arrays then return the sorted array
 */
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

/**
 * ideas:
 * - select a pivot (axis) element. There are different variations of quick sort
 * where the pivot element is selected from different positions.
 */
function quickSort(
  arr: number[],
  low: number,
  high: number,
  condition: { hasSorted: boolean }
) {
  if (low < high) {
    let pi = partition(arr, low, high, condition);
    if (condition.hasSorted === false) {
      quickSort(arr, low, pi - 1, condition);
      quickSort(arr, pi + 1, high, condition);
    }
  }
}

function partition(
  arr: number[],
  low: number,
  high: number,
  condition: {
    hasSorted: boolean;
  }
) {
  let pivot = arr[high];
  let i = low - 1;
  for (let j = low; j < high; j++) {
    if (arr[j] <= pivot) {
      i += 1;
      let temp = arr[i];
      arr[i] = arr[j];
      arr[j] = temp;
    }
  }

  let temp = arr[i + 1];
  arr[i + 1] = arr[high];
  arr[high] = temp;
  if (quickSortHelper.includes(i + 1)) {
  } else {
    condition.hasSorted = true;
    quickSortHelper.push(i + 1);
  }
  return i + 1;
}

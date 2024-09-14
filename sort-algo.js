const arrayContainer = document.getElementById('array');
const generateBtn = document.getElementById('generate');
const sortBtn = document.getElementById('sort');
const stopBtn = document.getElementById('stop');
const algorithmSelect = document.getElementById('algorithm');
const speedSlider = document.getElementById('speed');
const speedValueDisplay = document.getElementById('speedValue');
const arraySizeSlider = document.getElementById('arraySize');
const arraySizeValueDisplay = document.getElementById('arraySizeValue');

let array = [];
let speed = 500;
let arraySize = 10;
let stopSorting = false;

// Generate random array and display bars
function createRandomArray(size = 50) {
  array = [];
  arrayContainer.innerHTML = '';
  for (let i = 0; i < size; i++) {
    const height = Math.floor(Math.random() * 300) + 10;
    const arrayBar = document.createElement('div');
    arrayBar.classList.add('array-bar');
    arrayBar.style.height = `${height}px`;
    arrayBar.style.width = `${100 / size}%`;
    arrayContainer.appendChild(arrayBar);
    array.push(height);
  }
}

// Swap function
async function swap(bars, i, j) {
  return new Promise((resolve) => {
    setTimeout(() => {
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;

      bars[i].style.height = `${array[i]}px`;
      bars[j].style.height = `${array[j]}px`;
      resolve();
    }, speed);
  });
}

// Sleep function for timing control
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// Bubble Sort
async function bubbleSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < array.length - 1; i++) {
    if (stopSorting) break;
    for (let j = 0; j < array.length - i - 1; j++) {
      if (stopSorting) break;
      bars[j].style.backgroundColor = 'yellow';
      bars[j + 1].style.backgroundColor = 'yellow';

      await sleep(speed);

      if (array[j] > array[j + 1]) {
        bars[j].style.backgroundColor = 'red';
        bars[j + 1].style.backgroundColor = 'red';

        await sleep(speed);
        await swap(bars, j, j + 1);
      }

      bars[j].style.backgroundColor = 'teal';
      bars[j + 1].style.backgroundColor = 'teal';
    }
  }
}

// Selection Sort
async function selectionSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 0; i < array.length; i++) {
    if (stopSorting) break;
    let minIndex = i;
    bars[i].style.backgroundColor = 'yellow';

    for (let j = i + 1; j < array.length; j++) {
      if (stopSorting) break;
      bars[j].style.backgroundColor = 'yellow';

      await sleep(speed);

      if (array[j] < array[minIndex]) {
        minIndex = j;
      }

      bars[j].style.backgroundColor = 'teal';
    }

    if (minIndex !== i) {
      bars[i].style.backgroundColor = 'red';
      bars[minIndex].style.backgroundColor = 'red';

      await sleep(speed);
      await swap(bars, i, minIndex);
    }

    bars[i].style.backgroundColor = 'teal';
    bars[minIndex].style.backgroundColor = 'teal';
  }
}

// Insertion Sort
async function insertionSort() {
  const bars = document.getElementsByClassName('array-bar');
  for (let i = 1; i < array.length; i++) {
    if (stopSorting) break;
    let key = array[i];
    let j = i - 1;

    bars[i].style.backgroundColor = 'yellow';

    while (j >= 0 && array[j] > key) {
      if (stopSorting) break;
      bars[j].style.backgroundColor = 'yellow';

      await sleep(speed);

      array[j + 1] = array[j];
      bars[j + 1].style.height = `${array[j]}px`;

      j--;
    }
    array[j + 1] = key;
    bars[j + 1].style.height = `${key}px`;

    await sleep(speed);
    bars[i].style.backgroundColor = 'teal';
  }
}

// Merge Sort
async function mergeSortHelper(arr, start, end, bars) {
  if (start >= end || stopSorting) return;

  const mid = Math.floor((start + end) / 2);
  await mergeSortHelper(arr, start, mid, bars);
  await mergeSortHelper(arr, mid + 1, end, bars);
  await merge(arr, start, mid, end, bars);
}

async function merge(arr, start, mid, end, bars) {
  let left = arr.slice(start, mid + 1);
  let right = arr.slice(mid + 1, end + 1);
  let i = 0, j = 0, k = start;

  while (i < left.length && j < right.length) {
    if (stopSorting) break;
    bars[k].style.backgroundColor = 'yellow';
    await sleep(speed);

    if (left[i] <= right[j]) {
      arr[k] = left[i];
      bars[k].style.height = `${left[i]}px`;
      i++;
    } else {
      arr[k] = right[j];
      bars[k].style.height = `${right[j]}px`;
      j++;
    }

    bars[k].style.backgroundColor = 'teal';
    k++;
  }

  while (i < left.length) {
    if (stopSorting) break;
    bars[k].style.backgroundColor = 'yellow';
    await sleep(speed);

    arr[k] = left[i];
    bars[k].style.height = `${left[i]}px`;
    bars[k].style.backgroundColor = 'teal';
    i++;
    k++;
  }

  while (j < right.length) {
    if (stopSorting) break;
    bars[k].style.backgroundColor = 'yellow';
    await sleep(speed);

    arr[k] = right[j];
    bars[k].style.height = `${right[j]}px`;
    bars[k].style.backgroundColor = 'teal';
    j++;
    k++;
  }
}

async function mergeSort() {
  const bars = document.getElementsByClassName('array-bar');
  await mergeSortHelper(array, 0, array.length - 1, bars);
}

// Quick Sort
async function partition(arr, low, high, bars) {
  let pivot = arr[high];
  let i = low - 1;

  bars[high].style.backgroundColor = 'red';

  for (let j = low; j < high; j++) {
    if (stopSorting) break;
    bars[j].style.backgroundColor = 'yellow';

    await sleep(speed);

    if (arr[j] < pivot) {
      i++;
      await swap(bars, i, j);
    }

    bars[j].style.backgroundColor = 'teal';
  }

  await swap(bars, i + 1, high);
  bars[high].style.backgroundColor = 'teal';

  return i + 1;
}

async function quickSortHelper(arr, low, high, bars) {
  if (low < high && !stopSorting) {
    let pi = await partition(arr, low, high, bars);
    await quickSortHelper(arr, low, pi - 1, bars);
    await quickSortHelper(arr, pi + 1, high, bars);
  }
}

async function quickSort() {
  const bars = document.getElementsByClassName('array-bar');
  await quickSortHelper(array, 0, array.length - 1, bars);
}

// Control event listeners
generateBtn.addEventListener('click', () => {
  stopSorting = false;
  createRandomArray(arraySize);
});

sortBtn.addEventListener('click', () => {
  stopSorting = false;
  const algorithm = algorithmSelect.value;
  switch (algorithm) {
    case 'bubble':
      bubbleSort();
      break;
    case 'selection':
      selectionSort();
      break;
    case 'insertion':
      insertionSort();
      break;
    case 'merge':
      mergeSort();
      break;
    case 'quick':
      quickSort();
      break;
    default:
      bubbleSort();
  }
});

stopBtn.addEventListener('click', () => {
  stopSorting = true;
});

// Update speed value
speedSlider.addEventListener('input', () => {
  speed = speedSlider.value;
  speedValueDisplay.textContent = `${speed}ms`;
});

// Update array size dynamically
arraySizeSlider.addEventListener('input', () => {
  arraySize = arraySizeSlider.value;
  arraySizeValueDisplay.textContent = arraySize;
  createRandomArray(arraySize);
});
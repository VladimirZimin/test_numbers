document.querySelectorAll('input[name="option"]').forEach((option) => {
  option.addEventListener("change", function () {
    document.querySelector(".fileInput").disabled = false;
  });
});

document.querySelector(".fileInput").addEventListener("change", function () {
  this.disabled = true;
  readFile(this);
});

async function readFile(input) {
  const start = performance.now();

  let file = input.files[0];

  let reader = new FileReader();

  reader.readAsText(file);

  reader.onload = async function () {
    const numArray = reader.result
      .split("\n")
      .filter((num) => num !== "")
      .map(Number);

    const option = document.querySelector('input[name="option"]:checked').value;

    let result;
    switch (option) {
      case "max":
        result = await getMaxNumber(numArray);
        console.log("Максимальне число:", result);
        alert(`Максимальне число в файлі: ${result}`);
        break;
      case "min":
        result = await getMinNumber(numArray);
        console.log("Мінімальне число:", result);
        alert(`Мінімальне число в файлі: ${result}`);
        break;
      case "median":
        result = getMedian(numArray);
        console.log("Медіана:", result);
        alert(`Медіана в файлі: ${result}`);
        break;
      case "average":
        result = getAverage(numArray);
        console.log("Середнє арифметичне значення:", result);
        alert(`Середнє арифметичне значення в файлі: ${result}`);
        break;
      case "increasing":
        result = findIncreasingSequence(numArray);
        console.log("Найбільша збільшуюча послідовність:", result);
        alert(`Найбільша збільшуюча послідовність: ${result}`);
        break;
      case "decreasing":
        result = findDecreasingSequence(numArray);
        console.log("Найбільша зменшуюча послідовність:", result);
        alert(`Найбільша зменшуюча послідовність: ${result}`);
        break;

      default:
        console.log("Непідтримана опція");
        break;
    }

    location.reload();

    const end = performance.now();
    const executionTime = end - start;
    alert("Час виконання функції: " + executionTime + " мс");
  };

  reader.onerror = function () {
    console.log(reader.error);
  };
}

function getMaxNumber(numbers) {
  let arr = [];

  const chunkSize = 5000;
  const chunks = _.chunk(numbers, chunkSize);

  for (const chunk of chunks) {
    arr.push(Math.max(...chunk));
  }

  return Math.max(...arr);
}

function getMinNumber(numbers) {
  let arr = [];

  const chunkSize = 5000;
  const chunks = _.chunk(numbers, chunkSize);

  for (const chunk of chunks) {
    arr.push(Math.min(...chunk));
  }

  return Math.min(...arr);
}

function getMedian(numbers) {
  numbers.sort((a, b) => a - b);
  const length = numbers.length;

  if (length % 2 === 0) {
    const middle = length / 2;
    return (numbers[middle - 1] + numbers[middle]) / 2;
  } else {
    return numbers[Math.floor(length / 2)];
  }
}

function getAverage(numbers) {
  const length = numbers.length;
  const sum = numbers.reduce((a, b) => a + b, 0);
  return sum / length;
}

function findIncreasingSequence(numbers) {
  let maxSequence = [];
  let currentSequence = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] < numbers[i + 1]) {
      currentSequence.push(numbers[i]);
      if (currentSequence.length > maxSequence.length) {
        maxSequence = [...currentSequence];
      }
    } else {
      currentSequence = [];
    }
  }

  return maxSequence;
}

function findDecreasingSequence(numbers) {
  let maxSequence = [];
  let currentSequence = [];

  for (let i = 0; i < numbers.length - 1; i++) {
    if (numbers[i] > numbers[i + 1]) {
      currentSequence.push(numbers[i]);
      if (currentSequence.length > maxSequence.length) {
        maxSequence = [...currentSequence];
      }
    } else {
      currentSequence = [];
    }
  }

  return maxSequence;
}

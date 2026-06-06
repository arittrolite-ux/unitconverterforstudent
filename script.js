// ==========================
// UNIT DATA
// ==========================

const unitCategories = {
  Length: {
    meter: 1,
    kilometer: 1000,
    centimeter: 0.01,
    millimeter: 0.001,
    inch: 0.0254,
    foot: 0.3048,
    yard: 0.9144,
    mile: 1609.34
  },

  Area: {
    "square meter": 1,
    "square kilometer": 1000000,
    "square centimeter": 0.0001,
    "square foot": 0.092903,
    acre: 4046.86,
    hectare: 10000
  },

  Volume: {
    "cubic meter": 1,
    liter: 0.001,
    milliliter: 0.000001,
    "cubic foot": 0.0283168,
    gallon: 0.00378541
  },

  Mass: {
    kilogram: 1,
    gram: 0.001,
    milligram: 0.000001,
    tonne: 1000,
    pound: 0.453592,
    ounce: 0.0283495
  },

  Temperature: {
    Celsius: "C",
    Fahrenheit: "F",
    Kelvin: "K"
  },

  Pressure: {
    Pa: 1,
    kPa: 1000,
    MPa: 1000000,
    bar: 100000,
    psi: 6894.76
  }
};

// ==========================
// LOAD CATEGORIES
// ==========================

const categorySelect = document.getElementById("category");
const fromUnit = document.getElementById("fromUnit");
const toUnit = document.getElementById("toUnit");

for (let category in unitCategories) {
  let option = document.createElement("option");
  option.value = category;
  option.textContent = category;
  categorySelect.appendChild(option);
}

loadUnits();

// ==========================
// LOAD UNITS
// ==========================

function loadUnits() {
  const category = categorySelect.value;

  fromUnit.innerHTML = "";
  toUnit.innerHTML = "";

  const units = Object.keys(unitCategories[category]);

  units.forEach(unit => {
    let option1 = document.createElement("option");
    option1.value = unit;
    option1.textContent = unit;

    let option2 = document.createElement("option");
    option2.value = unit;
    option2.textContent = unit;

    fromUnit.appendChild(option1);
    toUnit.appendChild(option2);
  });

  toUnit.selectedIndex = 1;
  updateHint();
}

// ==========================
// UNIT CONVERTER
// ==========================

function convertUnits() {
  const category = categorySelect.value;
  const value = parseFloat(
    document.getElementById("valueInput").value
  );

  if (isNaN(value)) {
    document.getElementById(
      "conversionResult"
    ).innerHTML = "Enter a value.";
    return;
  }

  const from = fromUnit.value;
  const to = toUnit.value;

  let result;

  // Temperature special handling
  if (category === "Temperature") {
    result = convertTemperature(value, from, to);
  } else {
    const base =
      value * unitCategories[category][from];

    result =
      base / unitCategories[category][to];
  }

  document.getElementById(
    "conversionResult"
  ).innerHTML =
    `${value} ${from} = ${result.toFixed(4)} ${to}`;

  document.getElementById(
    "conversionFormula"
  ).innerHTML =
    `Converted from ${from} → ${to}`;
}

function convertTemperature(value, from, to) {
  let celsius;

  if (from === "Celsius")
    celsius = value;

  else if (from === "Fahrenheit")
    celsius = (value - 32) * 5 / 9;

  else
    celsius = value - 273.15;

  if (to === "Celsius")
    return celsius;

  if (to === "Fahrenheit")
    return celsius * 9 / 5 + 32;

  return celsius + 273.15;
}

// ==========================
// SWAP UNITS
// ==========================

function swapUnits() {
  let temp = fromUnit.value;
  fromUnit.value = toUnit.value;
  toUnit.value = temp;

  convertUnits();
}

// ==========================
// CLEAR
// ==========================

function clearConverter() {
  document.getElementById(
    "valueInput"
  ).value = "";

  document.getElementById(
    "conversionResult"
  ).innerHTML =
    "Choose a unit and enter a value.";
}

// ==========================
// MINI CALCULATOR
// ==========================

function simpleCalc(type) {
  let a = parseFloat(
    document.getElementById("calcA").value
  );

  let b = parseFloat(
    document.getElementById("calcB").value
  );

  let result;

  switch (type) {
    case "add":
      result = a + b;
      break;

    case "sub":
      result = a - b;
      break;

    case "mul":
      result = a * b;
      break;

    case "div":
      result = b !== 0
        ? a / b
        : "Cannot divide by zero";
      break;

    case "pow":
      result = Math.pow(a, b);
      break;

    case "mod":
      result = a % b;
      break;

    case "sqrtA":
      result = Math.sqrt(a);
      break;

    case "percent":
      result = (a / b) * 100 + "%";
      break;
  }

  document.getElementById(
    "calcResult"
  ).innerHTML = result;
}

// ==========================
// TRIGONOMETRY
// ==========================

function calcTrig() {
  const angle = parseFloat(
    document.getElementById("angleDeg").value
  );

  const rad =
    angle * Math.PI / 180;

  const sin = Math.sin(rad);
  const cos = Math.cos(rad);
  const tan = Math.tan(rad);

  document.getElementById(
    "trigResult"
  ).innerHTML = `
    sin(${angle}°) = ${sin.toFixed(4)}<br>
    cos(${angle}°) = ${cos.toFixed(4)}<br>
    tan(${angle}°) = ${tan.toFixed(4)}
  `;
}

function clearTrig() {
  document.getElementById(
    "angleDeg"
  ).value = "";

  document.getElementById(
    "trigResult"
  ).innerHTML =
    "sin, cos, and tan will appear here.";
}

// ==========================
// CIVIL ENGINEERING
// ==========================

function steelWeight() {
  const d = parseFloat(
    document.getElementById("steelDia").value
  );

  const l = parseFloat(
    document.getElementById("steelLen").value
  );

  const weight =
    ((d * d) / 162) * l;

  document.getElementById(
    "steelResult"
  ).innerHTML =
    `${weight.toFixed(2)} kg`;
}

function concreteVolume() {
  const l = parseFloat(
    document.getElementById("concreteL").value
  );

  const b = parseFloat(
    document.getElementById("concreteB").value
  );

  const h = parseFloat(
    document.getElementById("concreteH").value
  );

  const volume = l * b * h;

  document.getElementById(
    "concreteResult"
  ).innerHTML =
    `${volume.toFixed(3)} m³`;
}

function brickCount() {
  const l = parseFloat(
    document.getElementById("brickL").value
  );

  const h = parseFloat(
    document.getElementById("brickH").value
  );

  const t = parseFloat(
    document.getElementById("brickT").value
  );

  const volume = l * h * t;
  const bricks = volume * 500;

  document.getElementById(
    "brickResult"
  ).innerHTML =
    `${Math.round(bricks)} bricks`;
}

function updateHint() {
  document.getElementById(
    "conversionHint"
  ).innerHTML =
    `${fromUnit.value} → ${toUnit.value}`;
}

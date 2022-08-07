// ---------carousel-----

const track = document.querySelector(".carousel-track"),
  slides = [...document.querySelectorAll(".carousel-card")],
  skipBtn = document.querySelector(".skip-btn"),
  nextBtn = document.querySelector(".next-btn"),
  carouselNav = document.querySelector(".carousel-nav"),
  startBtn = document.getElementById("startBtn"),
  mainContent = document.getElementById("main-content"),
  menu = document.getElementById("menu-panel");

const slideWidth = slides[0].getBoundingClientRect().width;

slides.forEach(function (slide, i) {
  slide.style.left = `${slideWidth * i}px`;
});

nextBtn.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current");
  const nextSlide = currentSlide.nextElementSibling;
  const nextSlidePosition = nextSlide.style.left;

  track.style.transform = `translateX(-${nextSlidePosition})`;
  currentSlide.classList.remove("current");
  nextSlide.classList.add("current");
});

skipBtn.addEventListener("click", () => {
  track.style.transform = `translateX(-${
    slides[slides.length - 1].style.left
  })`;
});

const userName = document.getElementById("user-name"),
  male = document.getElementById("male"),
  female = document.getElementById("female"),
  other = document.getElementById("other"),
  userPass = document.getElementById("user-pass"),
  showPass = document.getElementById("showPass"),
  salutation = document.querySelector(".salutation"),
  genPass = document.getElementById("genPass"),
  username = document.querySelector(".name");

startBtn.addEventListener("click", () => {
  if (userName.value.trim() === "" || userPass.value.trim() === "") {
    alert("Please enter your details");
    return;
  }
  if (!male.checked && !female.checked && !other.checked) {
    alert("Please indicate your gender");
    return;
  }

  username.textContent = userName.value.trim();

  if (male.checked) salutation.textContent = "Sir";
  if (female.checked) salutation.textContent = "Ma'am";
  if (other.checked) salutation.textContent = userName.value.trim();

  mainContent.style.transform = "translateX(0)";
  if (document.body.clientWidth < 768) return;
  menu.classList.add("menu-open");

  mainContent.style.paddingLeft = `${menu.getBoundingClientRect().width}px`;
});

showPass.addEventListener("click", () => {
  if (userPass.getAttribute("type") === "password") {
    userPass.setAttribute("type", "text");
    showPass.textContent = "hide";
  } else {
    userPass.setAttribute("type", "password");
    showPass.textContent = "show";
  }
});
genPass.addEventListener("click", () => {
  let characters = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
    0,
    "!",
    "@",
    "#",
    "$",
    "%",
    "^",
    "&",
    "*",
    "(",
    ")",
    "_",
    "-",
    "+",
    "=",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "<",
  ];

  let pass = "";

  for (let i = 0; i < 8; i++) {
    let random = Math.floor(Math.random() * characters.length);

    pass = pass + characters[random];
  }
  userPass.value = pass;
});

let menuToggle = document.getElementById("menuToggle"),
  closeMenu = document.getElementById("closeMenuBtn");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("menu-open");
});

//---------code for spans -----------

const time = new Date().getHours(),
  timeOfDay = document.querySelector(".time");

if (time > 0 && time < 10) {
  timeOfDay.textContent = "morning";
}
if (time > 10 && time < 12) {
  timeOfDay.textContent = "day";
}
if (time > 12 && time < 17) {
  timeOfDay.textContent = "afternoon";
}
if (time > 17 && time < 22) {
  timeOfDay.textContent = "evening";
}
if (time > 22) {
  timeOfDay.textContent = "night";
}

// --------code for quote section----
const quote = document.getElementById("quote"),
  author = document.querySelector(".author");
function getQuote() {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((result) => {
      console.log(result);
      quote.textContent = result.content;
      author.textContent = result.author;
    });
}

getQuote();
// -----------code for to-do section-------

const todoBody = document.getElementById("todo-body"),
  todoInput = document.getElementById("todo-input"),
  todoBtn = document.getElementById("todo-btn");

todoBtn.addEventListener("click", () => {
  if (todoInput.value.trim() === "") {
    alert("Please type in the field in order to add a todo");
    return;
  }
  let tr = document.createElement("tr"),
    tdWord = document.createElement("td"),
    tdCheck = document.createElement("td"),
    // tdEdit = document.createElement("td"),
    tdDel = document.createElement("td");

  function createElement(parent, genClass, jsValue, value) {
    let btnEl = document.createElement("button");
    btnEl.classList.add("btn", `btn-${genClass}`, jsValue);
    btnEl.textContent = value;
    parent.appendChild(btnEl);
  }
  tdWord.textContent = todoInput.value.trim();
  createElement(tdCheck, "success", "check-btn", "check");
  // createElement(tdEdit, "warning", "edit-btn", "edit");
  createElement(tdDel, "danger", "del-btn", "del");

  tr.append(tdWord, tdCheck, tdDel);
  todoBody.appendChild(tr);

  tr.addEventListener("click", (e) => {
    const item = e.target,
      par = item.parentElement.parentElement;
    //check item
    if (item.classList.contains("check-btn")) {
      par.classList.add("bg-success");
    }
    if (item.classList.contains("del-btn")) {
      par.remove();
    }
  });

  todoInput.value = "";
});

// --------------expense calculator section

const incomeName = document.getElementById("income-name"),
  currency = document.getElementById("currency"),
  incomeAmt = document.getElementById("income-amt"),
  incomeBtn = document.getElementById("incomeBtn");

const expenseName = document.getElementById("expense-name"),
  expenseAmt = document.getElementById("expense-amt"),
  expenseBtn = document.getElementById("expenseBtn");

const transBody = document.getElementById("trans-body"),
  totalIncAmt = document.getElementById("inc-amt"),
  totalExpAmt = document.getElementById("exp-amt");

const calculator = {
  transactions: [],
  totalIncome: [],
  totalExpense: [],
};

incomeBtn.addEventListener("click", () => {
  if (incomeName.value.trim() === "" || +incomeAmt.value.trim() === "") {
    alert("the input fields cannot be empty");
    return;
  }

  calculator.transactions.push({
    transactName: incomeName.value.trim(),
    transactAmt: +incomeAmt.value.trim(),
    type: "income",
  });

  createRecord();

  calculator.totalIncome.push(+incomeAmt.value.trim());

  let returnedVal = addition(calculator.totalIncome);
  totalIncAmt.textContent = returnedVal;
});

expenseBtn.addEventListener("click", () => {
  if (expenseName.value.trim() === "" || +expenseAmt.value.trim() === "") {
    alert("the input fields cannot be empty");
    return;
  }

  calculator.transactions.push({
    transactName: expenseName.value.trim(),
    transactAmt: +expenseAmt.value.trim(),
    type: "expense",
  });

  createRecord();
  calculator.totalExpense.push(+expenseAmt.value.trim());

  let returnedVal = addition(calculator.totalExpense);
  totalExpAmt.textContent = returnedVal;
});

function createRecord() {
  let trEl = document.createElement("tr"),
    tdName = document.createElement("td"),
    tdType = document.createElement("td"),
    tdAmt = document.createElement("td");

  calculator.transactions.forEach((transaction) => {
    tdName.textContent = transaction.transactName;
    tdType.textContent = transaction.type;
    tdAmt.textContent = `${currency.value.trim()} ${transaction.transactAmt}`;

    trEl.append(tdName, tdType, tdAmt);
  });
  transBody.appendChild(trEl);
}

function addition(val) {
  let i = 0;
  val.forEach((value) => {
    i += value;
  });
  return i;
}

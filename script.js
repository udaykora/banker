"use strict";

const account1 = {
  owner: "Jonas Schmedtmann",
  movements: [500],
  interestRate: 1.2, // %
  pin: 1111,
  curr_money: 500,
  datest: ["12/3/2023 12:45:56"],
};

const account2 = {
  owner: "Jessica Davis",
  movements: [500],
  interestRate: 1.5,
  pin: 2222,
  curr_money: 500,
  datest: ["12/3/2023 12:45:56"],
};

const account3 = {
  owner: "Steven Thomas Williams",
  movements: [500],
  interestRate: 0.7,
  pin: 3333,
  datest: ["12/3/2023 12:45:56"],
  curr_money: 500,
};

const account4 = {
  owner: "Sarah Smith",
  movements: [500],
  interestRate: 1,
  pin: 4444,
  datest: ["12/3/2023 12:45:56"],
  curr_money: 500,
};

const accounts = [account1, account2, account3, account4];
let date;
let month;
let year;
let hour;
let min;
let sec;
const setdate = function () {
  let dates = new Date();
  date = dates.getDate();
  month = dates.getMonth() + 1;
  year = dates.getFullYear();
  hour = dates.getHours();
  min = dates.getMinutes();
  sec = dates.getSeconds();
};

// Elements
const labelWelcome = document.querySelector(".welcome");
const labelDate = document.querySelector(".date");
const movdate = document.querySelector(".movements__date");
const labelBalance = document.querySelector(".balance__value");
const labelSumIn = document.querySelector(".summary__value--in");
const labelSumOut = document.querySelector(".summary__value--out");
const labelSumInterest = document.querySelector(".summary__value--interest");
const labelTimer = document.querySelector(".timer");

const containerApp = document.querySelector(".app");
const containerApp1 = document.querySelector(".just");

const containerMovements = document.querySelector(".movements");

const btnLogin = document.querySelector(".login__btn");
const btnTransfer = document.querySelector(".form__btn--transfer");
const btnLoan = document.querySelector(".form__btn--loan");
const btnclose = document.querySelector(".form__btn--close");
const btnSort = document.querySelector(".btn--sort");

const inputLoginUsername = document.querySelector(".login__input--user");
const inputLoginPin = document.querySelector(".login__input--pin");
const inputTransferTo = document.querySelector(".form__input--to");
const inputTransferAmount = document.querySelector(".form__input--amount");
const inputLoanAmount = document.querySelector(".form__input--loan-amount");
const inputCloseUsername = document.querySelector(".form__input--user");
const inputClosePin = document.querySelector(".form__input--pin");

for (let i = 0; i < accounts.length; i++) {
  let deposits = accounts[i].movements.filter((mov) => mov > 0);
  accounts[i].deposits = deposits;
}

/*for (let i = 0; i < accounts.length; i++) {
  accounts[i].curr_money = accounts[i].deposits.reduce((acc, curr) => {
    return acc + curr;
  }, 0);*/

for (let i = 0; i < accounts.length; i++) {
  accounts[i].curr_in = accounts[i].deposits.reduce((acc, curr) => {
    return acc + curr;
  }, 0);
}
for (let i = 0; i < accounts.length; i++) {
  let withdrawals = accounts[i].movements.filter((mov) => mov < 0);
  accounts[i].withdrawals = withdrawals;
}

for (let i = 0; i < accounts.length; i++) {
  accounts[i].out = accounts[i].withdrawals.reduce((acc, curr) => {
    return acc + Math.abs(curr);
  }, 0);
}

let interestRatefu = function () {
  const interest = account.movements
    .filter((mov) => mov > 0)
    .map((deposit) => (deposit * account.interestRate) / 100)
    .filter((int, i, arr) => {
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${interest}€`;
};

containerMovements.innerHTML = " ";
let account;
let timer;

const displaymovements = function (movements) {
  containerMovements.innerHTML = " ";
  for (let i = 0; i < movements.length; i++) {
    let type = movements[i] > 0 ? "deposit" : "withdrawal";
    let k = i + 1;
    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}"> ${k} ${type} </div>
          <div class="movements__date">${account.datest[i]}</div>
          <div class="movements__value">${movements[i]}</div>
        </div>`;

    containerMovements.insertAdjacentHTML("afterbegin", html);
  }
};

for (let i = 0; i < accounts.length; i++) {
  accounts[i].username = accounts[i].owner
    .toLowerCase()
    .split(" ")
    .map((item) => item[0])
    .join("");
}

/////// login credentials ...........................................
btnLogin.addEventListener("click", function (event) {
  event.preventDefault();

  const x = inputLoginUsername.value;

  let y = inputLoginPin.value;
  account = accounts.find((acc) => acc.username === x);
  if (account == undefined) {
    alert("INVALID USER ID");
  } else {
    if (account.pin == y) {
      setdate();
      interestRatefu();
      if (timer) clearInterval(timer);
      timer = logouttimer();

      document.querySelector(
        ".date"
      ).textContent = `${date}/${month}/${year} ${hour}:${min}:${sec}`;
      labelWelcome.textContent = `welcome ${account.owner}`;
      containerApp.classList.remove("just");
      displaymovements(account.movements);
      document.querySelector(".balance__value").textContent =
        account.curr_money;
      document.querySelector(".summary__value--out").textContent = account.out;
      document.querySelector(".summary__value--in").textContent =
        account.curr_in;
    } else {
      alert("INVALID PIN");
    }
  }
});

///// close account..................................
btnclose.addEventListener("click", function (event) {
  event.preventDefault();
  console.log("hiiihello");
  let a = document.querySelector(".form__input--user").value;
  let b = document.querySelector(".form__input--pin").value;
  if (a == account.username && b == account.pin) {
    containerApp.classList.add("just");
    labelWelcome.textContent = "login to get started";
  } else {
    alert("INVALID CREDENTIALS");
  }
  document.querySelector(".form__input--user").value = "";
  document.querySelector(".form__input--pin").value = "";
});

//////money transfer
btnTransfer.addEventListener("click", function (event) {
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = logouttimer();

  let tranferto = document.querySelector(".form__input--to").value;
  let tranferamount = document.querySelector(".form__input--amount").value;
  let accounty = accounts.find((acc) => acc.username === tranferto);
  if (accounty == undefined) {
    alert("PLEASE PROVIDE THE VALID USER ID");
  } else {
    for (let i = 0; i < accounts.length; i++) {
      if (accounts[i] == accounty) {
        let a = accounts[i];
        for (let j = 0; j < accounts.length; j++) {
          if (accounts[j] == account) {
            let b = accounts[j];
            if (b.curr_money >= tranferamount) {
              a.movements.push(Number(tranferamount));
              b.movements.push(Number(-tranferamount));
              setdate();
              document.querySelector(
                ".date"
              ).textContent = `${date}/${month}/${year} ${hour}:${min}:${sec}`;
              a.datest.push(`${date}/${month}/${year} ${hour}:${min}:${sec}`);

              b.datest.push(`${date}/${month}/${year} ${hour}:${min}:${sec}`);

              displaymovements(a.movements);
              displaymovements(b.movements);
              a.curr_money = a.curr_money + Number(tranferamount);

              b.curr_money = b.curr_money - Number(tranferamount);

              document.querySelector(".balance__value").textContent =
                b.curr_money;
              b.out = b.out + Number(tranferamount);
              a.curr_in = a.curr_in + Number(tranferamount);

              document.querySelector(".summary__value--out").textContent =
                b.out;
            } else {
              alert("INSUFFICIENT AMOUNT TO TRANSFER");
            }
            document.querySelector(".form__input--to").value = "";
            document.querySelector(".form__input--amount").value = "";
          }
        }
      }
    }
  }
});

///// Money loan
btnLoan.addEventListener("click", function (event) {
  event.preventDefault();
  if (timer) clearInterval(timer);
  timer = logouttimer();
  let x = inputLoanAmount.value;
  for (let i = 0; i < accounts.length; i++) {
    if (accounts[i] == account) {
      let q = accounts[i];
      q.movements.push(Number(x));
      setdate();
      q.datest.push(`${date}/${month}/${year} ${hour}:${min}:${sec}`);

      displaymovements(q.movements);
      interestRatefu();
      q.curr_money = q.curr_money + Number(x);
      q.curr_in = q.curr_in + Number(x);
      setdate();
      document.querySelector(
        ".date"
      ).textContent = `${date}/${month}/${year} ${hour}:${min}:${sec}`;
      document.querySelector(".balance__value").textContent = q.curr_money;
      document.querySelector(".summary__value--in").textContent = q.curr_in;
      document.querySelector(".form__input--loan-amount").value = "";
    }
  }
});

//////// sorting the payment history
btnSort.addEventListener("click", function (event) {
  event.preventDefault();
  let xc = account.movements.sort();
  displaymovements(xc);
});

///////  timer
const logouttimer = function () {
  const tick = function () {
    let min = String(Math.trunc(time / 60)).padStart(2, 0);
    let sec = String(Math.trunc(time % 60)).padStart(2, 0);
    labelTimer.textContent = `${min}:${sec}`;

    if (time == 0) {
      clearInterval(timer);
      containerApp.classList.add("just");
      labelWelcome.textContent = "login to get started";
      alert("Your session has expired. Please log in again to continue.");
    }
    time--;
  };
  let time = 300;
  tick();

  timer = setInterval(tick, 1000);
  return timer;
};

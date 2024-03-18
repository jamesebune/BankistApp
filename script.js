'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
  movementsDates: [
    '2024-03-17T21:31:17.178Z',
    '2024-03-15T07:42:02.383Z',
    '2018-08-16T18:31:27.177Z',
    '2019-10-18T21:31:17.178Z',
    '2018-09-18T21:31:17.178Z',
    '2020-11-08T14:11:59.178Z',
    '2019-05-11T23:36:17.929Z',
    '2019-07-12T21:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2019-10-23T07:42:02.383Z',
    '2020-09-15T08:31:17.177Z',
    '2019-08-18T21:31:17.178Z',
    '2018-10-18T21:31:17.178Z',
    '2020-11-08T14:11:59.178Z',
    '2019-05-11T23:36:17.929Z',
    '2019-07-12T21:51:36.790Z',
  ],
  currency: 'USD',
  locale: 'en-us',
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
  movementsDates: [
    '2019-11-18T21:31:17.178Z',
    '2020-07-23T07:42:02.383Z',
    '2019-10-13T22:32:17.174Z',
    '2020-09-18T21:31:17.178Z',
    '2020-11-18T21:31:17.178Z',
    '2020-10-08T14:11:59.178Z',
    '2019-05-11T23:36:17.929Z',
    '2019-07-12T21:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
  movementsDates: [
    '2019-10-18T21:31:17.178Z',
    '2019-10-23T07:42:02.383Z',
    '2018-11-23T07:43:02.343Z',
    '2019-09-18T21:31:17.178Z',
    '2020-11-18T21:31:17.178Z',
    '2020-09-08T14:11:59.178Z',
    '2019-05-11T23:36:17.929Z',
    '2020-07-12T21:51:36.790Z',
  ],
  currency: 'EUR',
  locale: 'pt-PT',
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

//Bankist App:
//function to formatDate
const formateMovementDate = function (date, locale) {
  const calcDaysPassed = (date1, date2) =>
    Math.round(Math.abs(date2 - date1) / (1000 * 60 * 60 * 24));
  const daysPassed = calcDaysPassed(new Date(), date);
  if (daysPassed === 0) return 'Today';
  if (daysPassed === 1) return 'Yesterday';
  if (daysPassed <= 7) return `${daysPassed}days ago`;
  //
  return new Intl.DateTimeFormat('locale').format(date);
};

//function format currency
const formatCurrency = function (value, locale, currency) {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currency,
  }).format(value);
};
//Timer function
const startLogOutTimer = function () {
  //set time to 5 minutes
  let time = 1000;
  //call the timer every second
  const timer = setInterval(function () {
    // const min = String(Math.trunc(time / 60)).padStart(2, 0);
    const sec = time % 60;
    //in each call, print the remaining time to UI
    labelTimer.textContent = `${min}:${sec}`;

    //When 0 seconds, stop timer and log out user
    if (time === 0) clearInterval(timer);
    labelWelcome.textContent = 'Login to get started';
    containerApp.style.opacity = 0;
    //decrease by 1
    time--;
  }, 1000);
};

//Display movement function
const displayMovements = function (acc, sort = false) {
  containerMovements.innerHTML = '';
  //sorting the movements
  const movs = sort
    ? acc.movements.slice().sort((a, b) => a - b)
    : acc.movements;

  // for (const [i, mov] of account1.movements.entries()) {
  movs.forEach(function (mov, i) {
    const type = mov > 0 ? 'deposit' : 'withdrawal';
    const date = new Date(acc.movementsDates[i]);

    const displayDate = formateMovementDate(date, acc.locale);
    const formattedMov = formatCurrency(mov, acc.locale, acc.currency);

    const html = `<div class="movements__row">
    <div class="movements__type movements__type--${type}"> ${
      i + 1
    } ${type}</div>
    <div class="movements__date">${displayDate}</div>
    <div class="movements__value">${formattedMov}</div>
  </div>`;

    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};

//create Date
// // const now = new Date();
// const date = `${now.getDate()}`.padStart(2, 0);
// const month = `${now.getMonth() + 1}`.padStart(2, 0);
// const day = `${now.getDay()}`.padStart(2, 0);
// const year = `${now.getFullYear()}`.padStart(2, 0);
// const hour = `${now.getHours()}`.padStart(2, 0);
// const min = `${now.getMinutes()}`.padStart(2, 0);
// labelDate.textContent = `${day}/${month}/${year},${hour}:${min}`;

// Display Balance
const calDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, cur) => acc + cur, 0);
  // labelBalance.textContent = `${acc.balance} €`;
  labelBalance.textContent = formatCurrency(
    acc.balance,
    acc.locale,
    acc.currency
  );
};

//Display Summary in:
const calcdisplaySummary = function (acc) {
  const incomes = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, cur) => acc + cur, 0);
  // labelSumIn.textContent = `${incomes}€`;
  labelSumIn.textContent = formatCurrency(incomes, acc.locale, acc.currency);

  //summary of money OUT
  const debit = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, cur) => acc + cur, 0);
  labelSumOut.textContent = formatCurrency(
    Math.abs(debit),
    acc.locale,
    acc.currency
  );

  // //interest
  const interest = acc.movements
    .filter(mov => mov > 0)
    .map(mov => (mov * acc.interestRate) / 100)
    .filter((int, i, arr) => int >= 1) // excluding interest less than 1
    .reduce((acc, cur) => acc + cur, 0);
  labelSumInterest.textContent = formatCurrency(
    interest,
    acc.locale,
    acc.currency
  );
};

//create usernames
const createUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
createUsernames(accounts);

//function for updating UI
const updateUI = function (acc) {
  //display movement
  displayMovements(acc);
  //display summary
  calcdisplaySummary(acc);
  //display balance
  calDisplayBalance(acc);
};
//================================implementing login===========================
//event handler
let currentAccount;

// //internationalization  date API
// const now = new Date();
// const options = {
//   hour: 'numeric',
//   minute: 'numeric',
//   day: 'numeric',
//   month: 'numeric',
//   year: 'numeric',
//   weekday: 'long',
// };
// //getting the locale dynamically from user browser
// const locale = navigator.language;
// console.log(locale);
// labelDate.textContent = new Intl.DateTimeFormat('en-US', locale).format(now);

btnLogin.addEventListener('click', function (e) {
  //prevent form from submitting on default
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  console.log(currentAccount);
  if (currentAccount && currentAccount.pin === Number(inputLoginPin.value)) {
    //i can use optional chaining instead currentAccount && currentAccount.pin  --> currentAccount?.pin
    //on successfull login: Do the following:
    //1. Display welcome message
    labelWelcome.textContent = `Welcome ${currentAccount.owner.split(' ')[0]}`;
    //2. Display movements/transactions
    inputLoginPin.value = ' ';
    inputLoginUsername.value = ' ';
    inputLoginPin.blur();
    containerApp.style.opacity = 100;
    //update UI
    updateUI(currentAccount);
    // startLogOutTimer();
  }
});

//=====Implementing Transfer=======
btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  console.log(amount, receiverAcc);
  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);

    //adding transfer date
    currentAccount.movements.push(new Date().toISOString());
    receiverAcc.movements.push(new Date().toISOString());
    //Update UI
    updateUI(currentAccount);
    inputTransferAmount.value = inputTransferTo.value = '';
  }
  //================Implement Loan request=====
  //some method application
  btnLoan.addEventListener('click', function (e) {
    e.preventDefault();
    const amount = Number(inputLoanAmount.value);
    if (
      amount > 0 &&
      currentAccount.movements.some(mov => mov >= amount * 0.1)
    ) {
      setTimeout(() => {
        currentAccount.movements.push(amount);
        //adding transfer date
        currentAccount.movements.push(new Date().toISOString());
        receiverAcc.movements.push(new Date().toDateString());
        //update ui
        updateUI(currentAccount);
      }, 2500);
    }
    inputLoanAmount.value = '';
  });
  //=====IMPLEMENTING CLOSE ACCOUNT
  btnClose.addEventListener('click', function (e) {
    e.preventDefault();
    if (
      currentAccount.username === inputCloseUsername.value &&
      currentAccount.pin === Number(inputClosePin.value)
    ) {
      const index = accounts.findIndex(
        acc => acc.username === currentAccount.username
      );

      //Delete account
      accounts.splice(index, 1);

      //Hide UI
      containerApp.style.opacity = 0;
    }
    inputClosePin.value = inputCloseUsername.value = '';
  });
});

//Sort
let sorted = false;
btnSort.addEventListener('click', function (e) {
  e.preventDefault();
  displayMovements(currentAccount.movements, !sorted);
  sorted = !sorted;
});
// /////////////////////////////////////////////////
// /////////////////////////////////////////////////
// // LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// /////////////////////////////////////////////////
// let arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// console.log(arr.slice(2));
// console.log(arr.slice(2, 4));
// console.log(arr.slice(1, -2));

// //SPLICE
// console.log(arr.splice(2));
// console.log(arr);

// //RESERVE
// arr = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
// const arr2 = ['j', 'i', 'h', 'g', 'f'];
// console.log(arr2.reverse());

// //CONCAT: does not mutate the orignal array
// const letters = arr.concat(arr2);
// console.log(letters);

// //JOIN
// console.log(letters.join(' - '));
//FOR statement in Array
// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];
// for (const [i, movement] of movements.entries()) {
//   if (movement > 0) {
//     console.log(`Transaction ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Transaction ${i + 1}: You withdraw ${Math.abs(movement)}`);
//   }
// }
// //FOREACH Statement in Array
// console.log('-----FOREACH-----');
// movements.forEach(function (movement, i, arr) {
//   if (movement > 0) {
//     console.log(`Transaction ${i + 1}: You deposited ${movement}`);
//   } else {
//     console.log(`Transaction ${i + 1}: You withdraw ${Math.abs(movement)}`);
//   }
// });

// //FOREACH ON Map
// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });

// //CHALLENGE
// // const checkDogs = function (dogsJulia, dogsKate) {
// //   const dogsJuliaCorrected = dogsJulia.slice(1, -2);
// //   const dogsArray = dogsJuliaCorrected.concat(dogsKate);
// //   // console.log(dogsJuliaCorrected);
// //   // console.log(dogsArray);
// //   dogsArray.forEach(function (val, i) {
// //     if (val >= 3)
// //       console.log(`Dog number ${i + 1} is an adult, and is ${val} years old`);
// //     else console.log(`Dog number ${i + 1} is still a puppy 🤡`);
// //   });
// // };

// // checkDogs([3, 5, 2, 12, 7], [4, 1, 15, 8, 3]);

// //MAP Method
// const eurToUsd = 1.1;
// // const movementsUSD = movements.map(function (mov) {
// //   return mov * eurToUsd;
// // });

// //using arrow function
// const movementsUSDArr = movements.map(mov => mov * eurToUsd);

// //using a for statement to achieve same thing as map
// const movementsUSDfor = [];

// for (const mov of movements) movementsUSDfor.push(mov * eurToUsd);
// console.log(movements);
// // console.log(movementsUSD);
// console.log(movementsUSDArr);

//computing username
// const user = 'Steven Thomas Williams';
// const createUsernames = function (accs) {
//   accs.forEach(function (acc) {
//     acc.username = acc.owner
//       .toLowerCase()
//       .split(' ')
//       .map(name => name[0])
//       .join('');
//     console.log(acc.username);
//     return acc.username;
//   });
// };

// createUsernames(accounts);

// //FILTER Method
const movements = [200, -200, 340, -300, -20, 50, 400, -460];
// const filterMeth = movements.filter(function (mov) {
//   return mov > 0;
// });
// console.log(filterMeth);
// const withdrawals = movements.filter(function (mov) {
//   return mov < 0;
// });
// console.log(`Widrawals: ${withdrawals}`);

// //REDUCE method
// console.log(movements);
// const balance = movements.reduce(function (acc, cur, i, arr) {
//   console.log(`Iteration ${i}:${acc}`);
//   return acc + cur;
// }, 0);
// console.log(balance);
// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

//Maximum value of an array
const max = movements.reduce(function (acc, cur) {
  if (acc > cur) {
    return acc;
  } else return cur;
}, movements[0]);
//using arrow function
// const max = movements.reduce(
//   (acc, cur) => (acc > cur ? acc : cur),
//   movements[0]
// );
console.log(max);

//Coding challenge NUM 2

//const ages = [5, 2, 4, 1, 15, 8, 3];
const calcAverageHumanAge = function (ages) {
  const averageHumanAge = ages.map(function (mov) {
    if (mov <= 2) {
      return 2 * mov;
    } else return 16 + mov * 4;
  });

  //filter
  const adults = averageHumanAge.filter(function (mov) {
    return mov >= 18;
  });
  console.log(`filtered dogs above 18 years ${adults}`);
  //3: average human age
  const average = adults.reduce((acc, cur) => acc + cur, 0) / adults.length;
  console.log(`average age of adult is: ${average}`);
  return average;
};
const avg1 = calcAverageHumanAge([5, 2, 4, 1, 15, 8, 3]);
const avg2 = calcAverageHumanAge([16, 6, 10, 5, 6, 1, 4]);
console.log(`Average adult age1:${avg1}`);
console.log(`Average adult age2:${avg2}`);

//Chaining Methods
//PIPELINE
const eurToUsd = 1.1;
const totalDepositsUSD = movements
  .filter(mov => mov > 0)
  .map(mov => mov * eurToUsd)
  .reduce((acc, mov) => acc + mov, 0);
console.log(totalDepositsUSD);

//Challenge No 3
const calcAverageHumanAgeArrw = ages =>
  ages
    .map(mov => (mov <= 2 ? mov * 2 : 16 + mov * 4))
    .filter(mov => mov >= 18)
    .reduce((acc, cur, i, arr) => acc + cur / arr.length, 0);

console.log(calcAverageHumanAgeArrw([5, 2, 4, 1, 15, 8, 3]));

//Find Method
//Find method returns the first element that mets the condition
const firstWithdrawal = movements.find(mov => mov < 0);
console.log(movements);
console.log(firstWithdrawal);
const account = accounts.find(acc => acc.owner === 'Jessica Davis');
console.log(account);

//includes method checks for equality
console.log(movements.includes(-130));
//some method checks if an element in the array satisfy the specified condition
const anyDeposits = movements.some(mov => mov > 0);
console.log(anyDeposits);
//every method returns true if all the element of the array satisfy the specified condition.
console.log(movements.every(mov => mov > 0));
console.log(account4.movements.every(mov => mov > 0));

//flat method
const overalBalance = accounts
  .map(acc => acc.movements)
  .flat()
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance);

//flatmap method: combination of map and flat method
const overalBalance2 = accounts
  .flatMap(acc => acc.movements)
  .reduce((acc, mov) => acc + mov, 0);
console.log(overalBalance2);

//Sort methods
//return <0. A,B(Keep order)
//return >0, B,A(Switch order)

//Ascending order sort
// movements.sort((a, b) => {
//   if (a > b) return 1;
//   if (a < b) return -1;
// });

//using arrow function
movements.sort((a, b) => a - b);
console.log(movements);

//Descending order sort
// movements.sort((a, b) => {
//   if (a > b) return -1;
//   if (a < b) return 1;
// });
// Using arrow function to sort in descending order
movements.sort((a, b) => a - b);
console.log(movements);

//filling an array programatically

//empty array + fill method
const x = new Array(7);
console.log(x);

//using fill method to fill the empty array
const arr = [1, 2, 3, 4, 5, 6, 7];
x.fill(1, 3, 5); // fill array x with 1, starting from position 3-5
console.log(x);

arr.fill(23, 2, 6); //fill array arr with 23, starting from position 2 through 6
console.log(arr);

//array.from method
const y = Array.from({ length: 7 }, () => 1);
console.log(y);

const z = Array.from({ length: 7 }, (_, i) => i + 1);
console.log(z);

//set interval
// setInterval(() => {
//   const now = new Date();
//   const hour = now.getHours();
//   const mins = now.getMinutes();
//   const sec = now.getSeconds();
//   console.log(`The current time is: ${hour}:${mins}:${sec}`);
// }, 1000);
const ingredients = ['olives', 'Qspinach'];
const pizzaTimer = setTimeout(
  (ing1, ing2) =>
    console.log(`Here is your pizza with ${ing1} and ${ing2}🍕🍕`),
  3000,
  ...ingredients
);

console.log('Warning.............');
if (ingredients.includes('spinach')) clearTimeout(pizzaTimer);

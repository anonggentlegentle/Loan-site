"use strict";

const btnCompute = document.querySelector(".btn--compute");
const inputDate = document.querySelector(".main__input-date");
const inputAmount = document.querySelector(".main__input-amount");
const loanTermContainer = document.querySelector(".main__loan-term-box");
const loanTermBtn = document.querySelectorAll(".main__loan-term");
const datesTable = document.querySelector(".main__dates-table");
const headingTotal = document.querySelector(".heading--total");
const headingError = document.querySelector(".heading--error");

let loanTerm = 1;
let loanInterest = 0.015;
let condition = true;

const setCurrentDate = function () {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth() + 1;
  const day = today.getDate();

  inputDate.value = `${year}-0${month}-${day}`;
  inputDate.min = `${year}-0${month}-${day}`;

  //   console.log(
  //     inputDate.value,
  //     today.toLocaleDateString("en-US", { month: "2-digit" }),
  //     new Date(inputDate.value).toLocaleDateString("en-US", { month: "long" }),
  //     new Date(inputDate.value).toLocaleDateString("en-US", { day: "2-digit" }),
  //     new Date(inputDate.value).toLocaleDateString("en-US", { year: "numeric" })
  //   );
};

setCurrentDate();

loanTermContainer.addEventListener("click", function (e) {
  loanTermBtn.forEach(function (btn) {
    btn.classList.remove("border-button-style");
  });

  e.target.closest(".main__loan-term").classList.add("border-button-style");

  loanTerm = e.target.closest(".main__loan-term").dataset.term;
  loanInterest = e.target.closest(".main__loan-term").dataset.interest;

  console.log(loanTerm, loanInterest);
});

const loanTotal = function (num) {
  let amount = num;
  const interest = amount * loanInterest;
  amount += interest;

  return amount;
};

const loanMonthly = function (num) {
  const monthly = Math.round(num / loanTerm);

  console.log(monthly);

  return monthly;
};

const setTable = function () {
  condition = false;

  const months = [];
  const totalAmount = loanTotal(Number(inputAmount.value));
  const monthlyAmount = loanMonthly(totalAmount);

  const paymentHeading = `<h3 class="heading heading--3">Payment Schedule:</h3>`;

  const startDate = inputDate.value;

  for (let i = 1; i <= loanTerm; i++) {
    let newDate = new Date(startDate);
    newDate.setMonth(newDate.getMonth() + i);

    const month = newDate.toLocaleDateString("en-US", { month: "long" });
    const day = newDate.toLocaleDateString("en-US", { day: "2-digit" });
    const year = newDate.toLocaleDateString("en-US", { year: "numeric" });

    const date = `${month} ${day}, ${year}`;
    months.push(date);
  }

  months.forEach(function (month) {
    const html = `
    <div class="main__date-box">
        <h3 class="main__date">${month}</h3>
        <p class="main__amount">Amount to be paid: <br> ${monthlyAmount.toLocaleString(
          "en-US"
        )} Php</p>
    </div>
    `;

    datesTable.insertAdjacentHTML("beforeend", html);
  });

  datesTable.classList.add("unhide-table");

  datesTable.insertAdjacentHTML("afterbegin", paymentHeading);

  headingTotal.innerHTML = `Total borrowed: ${Number(
    inputAmount.value
  ).toLocaleString("en-US")} Php <br>
  Total payment: ${totalAmount.toLocaleString("en-US")} Php`;

  headingTotal.classList.add("unhide");
  headingError.classList.remove("unhide");
};

btnCompute.addEventListener("click", function (e) {
  e.preventDefault();
  if (
    condition === true &&
    Number(inputAmount.value) >= 5000 &&
    Number(inputAmount.value) <= 100000
  ) {
    setTable();
  } else if (
    condition === false &&
    Number(inputAmount.value) >= 5000 &&
    Number(inputAmount.value) <= 100000
  ) {
    datesTable.innerHTML = "";
    setTable();
  } else {
    datesTable.innerHTML = "";
    headingError.classList.add("unhide");
    headingTotal.classList.remove("unhide");
    datesTable.classList.remove("unhide-table");
  }
});

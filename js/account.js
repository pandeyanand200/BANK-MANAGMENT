import { addBankAccount, bankAccounts } from "./data.js";

const addAccountForm = document.getElementById("addAccountForm");
const accountHolder = document.getElementById("accountHolder");
const email = document.getElementById("email");
const phone = document.getElementById("phone");
const accountType = document.getElementById("accountType");
const balance = document.getElementById("balance");
const status = document.getElementById("status");

function generateAccountNumber() {
  const nextNumber = bankAccounts.length + 1;
  return `ACC${1000 + nextNumber}`;
}

if (addAccountForm) {
  addAccountForm.addEventListener("submit", function (event) {
    event.preventDefault();

    const newAccount = {
      id: bankAccounts.length + 101,
      accountNumber: generateAccountNumber(),
      accountHolder: accountHolder.value.trim(),
      email: email.value.trim(),
      phone: phone.value.trim(),
      accountType: accountType.value,
      balance: Number(balance.value),
      status: status.value,
    };

    if (!newAccount.accountHolder || !newAccount.email || !newAccount.phone || !newAccount.accountType || !newAccount.status || Number.isNaN(newAccount.balance)) {
      return;
    }

    addBankAccount(newAccount);
    addAccountForm.reset();
    window.location.href = "./display.html";
  });
}

export default generateAccountNumber;
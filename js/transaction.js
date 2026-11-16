import { bankAccounts, makeTransaction, transactions } from "./data.js";
const transactionTable = document.getElementById("transaction-list");
const transactionForm = document.getElementById("transaction-form");
const accountSelect = document.getElementById("account-number");
const amountInput = document.getElementById("transaction-amount");
const balanceLabel = document.getElementById("current-balance");
const messageLabel = document.getElementById("transaction-message");

function renderTransactions() {
  if (!transactionTable) {
    return;
  }
  transactionTable.innerHTML = "";
  transactions.forEach((transaction) => {
    const row = document.createElement("tr");
    [
      transaction.transactionId,
      transaction.accountNumber,
      transaction.type,
      transaction.amount,
      transaction.date,
      transaction.balanceAfter,
    ].forEach((value) => {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    });
    transactionTable.appendChild(row);
  });
}
function renderAccounts() {
  bankAccounts.forEach((account) => {
    const option = document.createElement("option");
    option.value = account.accountNumber;
    option.textContent = `${account.accountNumber} - ${account.accountHolder}`;
    option.disabled = account.status !== "Active";
    accountSelect.appendChild(option);
  });
}
function showBalance() {
  const account = bankAccounts.find((item) => item.accountNumber === accountSelect.value);
  balanceLabel.textContent = account
    ? `Current balance: ${account.balance}`
    : "Select an account to see its balance.";
}
accountSelect.addEventListener("change", showBalance);
transactionForm.addEventListener("submit", (event) => {
  event.preventDefault();
  messageLabel.textContent = makeTransaction(
    accountSelect.value,
    document.getElementById("transaction-type").value,
    amountInput.value,
  );
  messageLabel.className = messageLabel.textContent ? "text-danger mb-0 mt-2" : "text-success mb-0 mt-2";
  if (messageLabel.textContent) {
    return;
  }
  showBalance();
  amountInput.value = "";
  renderTransactions();
});

renderAccounts();
showBalance();
renderTransactions();
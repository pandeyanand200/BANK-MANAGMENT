import { bankAccounts } from "./data.js";
const tbody = document.getElementById("account-list");
const result = document.getElementById("total");

function displayAccounts() {
  if (!tbody) {
    return;
  }
  tbody.innerHTML = "";
  bankAccounts.forEach((account) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${account.id}</td>
      <td>${account.accountNumber}</td>
      <td>${account.accountHolder}</td>
      <td>${account.email}</td>
      <td>${account.phone}</td>
      <td>${account.accountType}</td>
      <td>${account.balance}</td>
      <td>${account.status}</td>
    `;
    tbody.appendChild(row);
  });
  if (result) {
    result.textContent = `Total Accounts: ${bankAccounts.length}`;
  }
}

displayAccounts();
export default displayAccounts;
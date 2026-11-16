import { searchAccounts } from "./data.js";
const searchInput = document.getElementById("account-search");
const searchResults = document.getElementById("search-results");
const searchCount = document.getElementById("search-count");

function renderResults(term = "") {
  if (!searchResults || !searchCount) {
    return;
  }
  const resultList = searchAccounts(term);
  searchResults.innerHTML = "";
  if (resultList.length === 0) {
    searchResults.innerHTML = `
      <tr>
        <td colspan="6" class="text-center text-muted">No matching account found.</td>
      </tr>
    `;
    searchCount.textContent = "No results found.";
    return;
  }
  resultList.forEach((account) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${account.accountNumber}</td>
      <td>${account.accountHolder}</td>
      <td>${account.email}</td>
      <td>${account.phone}</td>
      <td>${account.balance}</td>
      <td>${account.status}</td>
    `;
    searchResults.appendChild(row);
  });
  searchCount.textContent = `Showing ${resultList.length} matching account(s).`;
}
if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    renderResults(event.target.value);
  });
}
renderResults();
import displayAccounts from "./display.js";
import generateAccountNumber from "./account.js";

if (document.getElementById("addAccountForm")) {
  generateAccountNumber();
}

if (document.getElementById("account-list")) {
  displayAccounts();
}
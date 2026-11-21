import { bankAccounts, deleteBankAccount, updateBankAccount } from "./data.js";
const tbody = document.getElementById("account-list");
const result = document.getElementById("total");

function createCell(value) {
  const cell = document.createElement("td");
  cell.textContent = value;
  return cell;
}

function createInput(type, value, label) {
  const input = document.createElement("input");
  input.type = type;
  input.value = value;
  input.className = "form-control";
  input.setAttribute("aria-label", label);
  input.required = true;
  return input;
}

function createSelect(options, value, label) {
  const select = document.createElement("select");
  select.className = "form-select";
  select.setAttribute("aria-label", label);
  select.required = true;
  options.forEach((optionValue) => {
    const option = document.createElement("option");
    option.value = optionValue;
    option.textContent = optionValue;
    select.appendChild(option);
  });
  select.value = value;
  return select;
}

function createButton(text, className, label, onClick) {
  const button = document.createElement("button");
  button.type = "button";
  button.textContent = text;
  button.className = `btn btn-sm ${className}`;
  button.setAttribute("aria-label", label);
  button.addEventListener("click", onClick);
  return button;
}

function renderEditRow(account) {
  const row = document.createElement("tr");
  row.appendChild(createCell(account.id));
  row.appendChild(createCell(account.accountNumber));

  const holder = createInput("text", account.accountHolder, "Account holder");
  const email = createInput("email", account.email, "Email");
  const phone = createInput("tel", account.phone, "Phone");
  const accountType = createSelect(["Savings", "Current", "Salary"], account.accountType, "Account type");
  const balance = createInput("number", account.balance, "Balance");
  balance.min = "0";
  balance.step = "0.01";
  const status = createSelect(["Active", "Inactive"], account.status, "Status");

  [holder, email, phone, accountType, balance, status].forEach((input) => {
    const cell = document.createElement("td");
    cell.appendChild(input);
    row.appendChild(cell);
  });

  const actions = document.createElement("td");
  actions.className = "text-nowrap";
  actions.appendChild(
    createButton("Save", "btn-success me-1", `Save account ${account.accountNumber}`, () => {
      const invalidField = row.querySelector(":invalid");
      if (invalidField) {
        invalidField.reportValidity();
        return;
      }

      const saved = updateBankAccount(account.id, {
        accountHolder: holder.value.trim(),
        email: email.value.trim(),
        phone: phone.value.trim(),
        accountType: accountType.value,
        balance: Number(balance.value),
        status: status.value,
      });
      if (!saved) {
        window.alert("Unable to save this account. Please try again.");
        return;
      }
      displayAccounts();
    }),
  );
  actions.appendChild(
    createButton("Cancel", "btn-secondary", `Cancel editing ${account.accountNumber}`, displayAccounts),
  );
  row.appendChild(actions);
  return row;
}

function displayAccounts() {
  if (!tbody) {
    return;
  }
  tbody.innerHTML = "";
  bankAccounts.forEach((account) => {
    const row = document.createElement("tr");
    [
      account.id,
      account.accountNumber,
      account.accountHolder,
      account.email,
      account.phone,
      account.accountType,
      account.balance,
      account.status,
    ].forEach((value) => row.appendChild(createCell(value)));

    const actions = document.createElement("td");
    actions.className = "text-nowrap";
    actions.appendChild(
      createButton("Edit", "btn-secondary me-1", `Edit account ${account.accountNumber}`, () => {
        tbody.replaceChild(renderEditRow(account), row);
      }),
    );
    actions.appendChild(
      createButton("Delete", "btn-secondary", `Delete account ${account.accountNumber}`, () => {
        if (!window.confirm(`Delete account ${account.accountNumber}?`)) {
          return;
        }
        if (!deleteBankAccount(account.id)) {
          window.alert("Unable to delete this account. Please try again.");
          return;
        }
        displayAccounts();
      }),
    );
    row.appendChild(actions);
    tbody.appendChild(row);
  });
  if (result) {
    result.textContent = `Total Accounts: ${bankAccounts.length}`;
  }
}

displayAccounts();
export default displayAccounts;
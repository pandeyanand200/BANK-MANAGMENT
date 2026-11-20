const storageKey = "bankAccounts";

const initialAccounts = [
  {
    id: 101,
    accountNumber: "ACC1001",
    accountHolder: "Arun Kumar",
    email: "arun@gmail.com",
    phone: "9876543210",
    accountType: "Savings",
    balance: 25000,
    status: "Active",
  },
  {
    id: 102,
    accountNumber: "ACC1002",
    accountHolder: "Priya Sharma",
    email: "priya@gmail.com",
    phone: "9876543211",
    accountType: "Current",
    balance: 50000,
    status: "Active",
  },
  {
    id: 103,
    accountNumber: "ACC1003",
    accountHolder: "Rahul Raj",
    email: "rahul@gmail.com",
    phone: "9876543212",
    accountType: "Savings",
    balance: 15000,
    status: "Active",
  },
  {
    id: 104,
    accountNumber: "ACC1004",
    accountHolder: "Divya S",
    email: "divya@gmail.com",
    phone: "9876543213",
    accountType: "Salary",
    balance: 35000,
    status: "Inactive",
  },
  {
    id: 105,
    accountNumber: "ACC1005",
    accountHolder: "Karthik M",
    email: "karthik@gmail.com",
    phone: "9876543214",
    accountType: "Savings",
    balance: 12000,
    status: "Active",
  },
  {
    id: 106,
    accountNumber: "ACC1006",
    accountHolder: "Sneha R",
    email: "sneha@gmail.com",
    phone: "9876543215",
    accountType: "Current",
    balance: 75000,
    status: "Active",
  },
  {
    id: 107,
    accountNumber: "ACC1007",
    accountHolder: "Vijay Kumar",
    email: "vijay@gmail.com",
    phone: "9876543216",
    accountType: "Salary",
    balance: 18000,
    status: "Inactive",
  },
  {
    id: 108,
    accountNumber: "ACC1008",
    accountHolder: "Meena P",
    email: "meena@gmail.com",
    phone: "9876543217",
    accountType: "Savings",
    balance: 42000,
    status: "Active",
  },
];

export let transactions = [
  {
    transactionId: 1,
    accountNumber: "ACC1001",
    type: "Deposit",
    amount: 5000,
    date: "2026-11-15",
    balanceAfter: 30000,
  },
  {
    transactionId: 2,
    accountNumber: "ACC1001",
    type: "Withdraw",
    amount: 3000,
    date: "2026-11-15",
    balanceAfter: 27000,
  },
  {
    transactionId: 3,
    accountNumber: "ACC1002",
    type: "Deposit",
    amount: 10000,
    date: "2026-11-16",
    balanceAfter: 60000,
  },
  {
    transactionId: 4,
    accountNumber: "ACC1003",
    type: "Withdraw",
    amount: 2000,
    date: "2026-11-16",
    balanceAfter: 13000,
  },
];

const transactionStorageKey = "bankTransactions";
try {
  const storedTransactions = localStorage.getItem(transactionStorageKey);
  if (storedTransactions) {
    const parsedTransactions = JSON.parse(storedTransactions);
    if (Array.isArray(parsedTransactions)) {
      transactions = parsedTransactions;
    }
  }
} catch (error) {
  console.warn("Unable to load transactions:", error);
}

let storedAccounts = null;
try {
  storedAccounts = localStorage.getItem(storageKey);
} catch (error) {
  storedAccounts = null;
}
export let bankAccounts = storedAccounts ? JSON.parse(storedAccounts) : initialAccounts;
if (!Array.isArray(bankAccounts)) {
  bankAccounts = [...initialAccounts];
}
export function saveAccounts(accounts = bankAccounts) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(accounts));
    return true;
  } catch (error) {
    console.warn("Unable to save accounts:", error);
    return false;
  }
}

export function updateBankAccount(id, updates) {
  const updatedAccounts = bankAccounts.map((account) =>
    account.id === id ? { ...account, ...updates } : account,
  );
  if (updatedAccounts.every((account, index) => account === bankAccounts[index])) {
    return false;
  }
  if (!saveAccounts(updatedAccounts)) {
    return false;
  }
  bankAccounts = updatedAccounts;
  return true;
}

export function deleteBankAccount(id) {
  const updatedAccounts = bankAccounts.filter((account) => account.id !== id);
  if (updatedAccounts.length === bankAccounts.length) {
    return false;
  }
  if (!saveAccounts(updatedAccounts)) {
    return false;
  }
  bankAccounts = updatedAccounts;
  return true;
}

export function saveTransactions() {
  try {
    localStorage.setItem(transactionStorageKey, JSON.stringify(transactions));
  } catch (error) {
    console.warn("Unable to save transactions:", error);
  }
}

export function makeTransaction(accountNumber, type, amount) {
  const account = bankAccounts.find((item) => item.accountNumber === accountNumber);
  const value = Number(amount);

  if (!account || account.status !== "Active") {
    return "Select an active account.";
  }
  if (!Number.isFinite(value) || value <= 0) {
    return "Enter an amount greater than zero.";
  }
  const currentBalance = Number(account.balance);
  if (!Number.isFinite(currentBalance) || currentBalance < 0) {
    return "This account has an invalid balance.";
  }
  if (type === "Withdrawal" && value > currentBalance) {
    return "The withdrawal amount exceeds the available balance.";
  }

  account.balance = type === "Deposit" ? currentBalance + value : currentBalance - value;
  transactions.unshift({
    transactionId: Math.max(0, ...transactions.map((item) => Number(item.transactionId) || 0)) + 1,
    accountNumber,
    type,
    amount: value,
    date: new Date().toISOString().slice(0, 10),
    balanceAfter: account.balance,
  });
  saveAccounts();
  saveTransactions();
  return "";
}

export function addBankAccount(account) {
  const updatedAccounts = [...bankAccounts, account];
  bankAccounts = updatedAccounts;
  saveAccounts();
}

export function searchAccounts(term = "") {
  const query = term.trim().toLowerCase();

  if (!query) {
    return bankAccounts;
  }

  return bankAccounts.filter((account) => {
    const values = [
      account.accountNumber,
      account.accountHolder,
      account.email,
      account.phone,
    ]
      .join(" ")
      .toLowerCase();

    return values.includes(query);
  });
}

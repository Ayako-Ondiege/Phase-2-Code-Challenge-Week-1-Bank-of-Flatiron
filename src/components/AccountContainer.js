import React from "react";
import TransactionsList from "./TransactionsList";
import Search from "./Search";
import AddTransactionForm from "./AddTransactionForm";

function AccountContainer({ transactions, onAddTransaction, onSearch }) {
  return (
    <div>
      <Search onSearch={onSearch} />
      <AddTransactionForm onAddTransaction={onAddTransaction} />
      <TransactionsList transactions={transactions} />
    </div>
  );
}

export default AccountContainer;

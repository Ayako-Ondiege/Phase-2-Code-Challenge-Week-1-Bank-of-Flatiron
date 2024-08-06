import React from "react";
import Transaction from "./Transaction";

function TransactionsList({ transactions }) {
  // Sort transactions by date in descending order (most recent first)
  const sortedTransactions = [...transactions].sort((a, b) => new Date(b.date) - new Date(a.date));

  return (
    <table className="ui celled striped padded table">
      <tbody>
        {/* Table header with column titles */}
        <tr>
          <th><h3 className="ui center aligned header">Date</h3></th>
          <th><h3 className="ui center aligned header">Description</h3></th>
          <th><h3 className="ui center aligned header">Category</h3></th>
          <th><h3 className="ui center aligned header">Amount</h3></th>
        </tr>
        {/* Map through sorted transactions and render a Transaction component for each */}
        {sortedTransactions.map((transaction) => (
          <Transaction
            key={transaction.id} // Unique key for each transaction
            date={transaction.date} // Date of the transaction
            description={transaction.description} // Description of the transaction
            category={transaction.category} // Category of the transaction
            amount={transaction.amount} // Amount of the transaction
          />
        ))}
      </tbody>
    </table>
  );
}

export default TransactionsList;
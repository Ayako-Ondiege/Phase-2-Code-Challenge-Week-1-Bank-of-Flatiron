import React, { useState, useEffect } from "react";
import AccountContainer from "./AccountContainer";

function App() {
  // State to hold the list of transactions
  const [transactions, setTransactions] = useState([]);
  
  // State to hold the current search term
  const [searchTerm, setSearchTerm] = useState("");

  // Fetch transactions from the server when the component mounts
  useEffect(() => {
    fetch("http://localhost:8001/transactions")
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => setTransactions(data)); // Update state with the fetched data
  }, []); // Empty dependency array means this effect runs once on mount

  // Function to add a new transaction
  function addTransaction(newTransaction) {
    fetch("http://localhost:8001/transactions", {
      method: "POST", // Specify the HTTP method
      headers: {
        "Content-Type": "application/json", // Specify content type as JSON
      },
      body: JSON.stringify(newTransaction), // Convert newTransaction object to JSON string
    })
      .then((response) => response.json()) // Parse the JSON from the response
      .then((data) => setTransactions([...transactions, data])); // Add new transaction to the existing list
  }

  // Function to update the search term state
  function handleSearch(searchTerm) {
    setSearchTerm(searchTerm);
  }

  // Filter transactions based on the search term
  function filteredTransactions() {
    if (!searchTerm) return transactions; // Return all transactions if no search term
    return transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  return (
    <div className="ui raised segment">
      <div className="ui segment violet inverted">
        <h2>The Royal Bank of Flatiron</h2>
      </div>
      <AccountContainer
        transactions={filteredTransactions()} // Pass filtered transactions to AccountContainer
        onAddTransaction={addTransaction} // Pass addTransaction function to AccountContainer
        onSearch={handleSearch} // Pass handleSearch function to AccountContainer
      />
    </div>
  );
}

export default App;
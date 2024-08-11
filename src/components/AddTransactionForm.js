import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  // State to hold the form data
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  const [error, setError] = useState ("");

  // Handle changes to form input fields
  function handleChange(e) {
    const { name, value } = e.target;
    // Update formData state with the new value
    setFormData({ ...formData, [name]: value });
  }

  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    if (!formData.date||!formData.description||!formData.category||!formData.amount){
      setError("All fields are required");
    }

    if (isNaN(formData.amount) || parseFloat(formData.amount)<=0){
      setError
       ("Amount must be a positive number");
      return;
    }
    
    setError("");
    onAddTransaction(formData); // Call the parent component's function with formData
    // Reset form fields to empty values
    setFormData({ date: "", description: "", category: "", amount: "" });
  }

  return (
    <div className="ui segment">
      {/* Form for adding a new transaction */}
      <form className="ui form" onSubmit={handleSubmit}>
        <div className="inline fields">
          {/* Input for transaction date */}
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
          />
          {/* Input for transaction description */}
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange} 
          />
          {/* Input for transaction category */}
          <input 
            type="text" 
            name="category" 
            placeholder="Category" 
            value={formData.category} 
            onChange={handleChange} 
          />
          {/* Input for transaction amount */}
          <input 
            type="number" 
            name="amount" 
            placeholder="Amount" 
            step="0.01" // Allows decimal values
            value={formData.amount} 
            onChange={handleChange} 
          />
        </div>
        {error && <div className = "ui red message">{error}</div>}
        {/* Submit button for the form */}
        <button className="ui button" type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
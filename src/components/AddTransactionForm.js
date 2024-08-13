import React, { useState } from "react";

function AddTransactionForm({ onAddTransaction }) {
  // State to hold the form data
  const [formData, setFormData] = useState({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

   // State to hold errors for each field
  const [errors, setErrors] = useState ({
    date: "",
    description: "",
    category: "",
    amount: ""
  });

  //Inline styles for input fields
  const inputStyle = {
    width: "100%",
    padding: "12px",
    frontSize: "16px",
    marginBottom: "18px",
    borderRadius: "4px",
    border: "1px solid #ccc",
    boxSizing: "border-box"//Ensures padding is included in width calculation. 
  };
//Inline styles for error messages
  const errorStyle = {
    color: "red",
    fontSize: "14px",
    marginBottom: "12px"
  };


  //INline styles for the form container
  const formContainerStyle ={
    display: "flex",
    flexWrap: "wrap",
    gap: "13px"//Adjust gap between fields
  }

  //Inline styles for individual fields within the form
  const fieldStyle = {
    flex: "1 1 calc(25% - 10px)", //Allows each field to grow and shrink, witha gap of 10 px
    minWidth: "200px" //Ensures fields have a minimum width
  }
  
  // Handle changes to form input fields
  function handleChange(e) {
    const { name, value } = e.target;
    // Update formData state with the new value
    setFormData({ ...formData, [name]: value });



  //Validate input fields
  if (value.trim() === ""){
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "This field is required."
    }));
  } else {
    setErrors((prevErrors) => ({
      ...prevErrors, [name]: ""
    }));
  }
}
  // Handle form submission
  function handleSubmit(e) {
    e.preventDefault(); // Prevent the default form submission behavior
   
    //Initialize errors object
    const newErrors = {};

    //Check for empty fields 
   for (const key in formData){
    if (!formData[key].trim()){
      newErrors[key] = "This field is required.";
    }
   }
   
   //Check for positive amount
    if (isNaN(formData.amount) || parseFloat(formData.amount)<=0){
      newErrors.amount = "Amount must be a positive number.";
      return;
    }

    //Set errors and prevent submission if there are errors
    if (Object.keys(newErrors).length> 0){
      setErrors(newErrors);
      return;
    }

    //Clear errors if form is valid
    setErrors({});

    onAddTransaction(formData); // Call the parent component's function with formData
    // Reset form fields to empty values
    setFormData({ date: "", description: "", category: "", amount: "" });
  }

  return (
    <div className="ui segment">
      {/* Form for adding a new transaction */}
      <form className="ui form" onSubmit={handleSubmit}>
        <div style={formContainerStyle}>




        </div>
        <div style={fieldStyle}>
          {/* Input for transaction date */}
          <input 
            type="date" 
            name="date" 
            value={formData.date} 
            onChange={handleChange} 
            style = {inputStyle}
          />
          <div style ={fieldStyle}>
          {/* Input for transaction description */}
          <input 
            type="text" 
            name="description" 
            placeholder="Description" 
            value={formData.description} 
            onChange={handleChange}
            style={inputStyle}
          />
          {errors.date && <p style ={errorStyle}>{errors.date}</p>}
          </div>

          <div style={fieldStyle}>
          <input 
            type="text" 
            name="category" 
            placeholder="Category" 
            value={formData.category} 
            onChange={handleChange} 
            style={inputStyle}
          />
          {errors.date && <p style ={errorStyle}>{errors.date}</p>}
          </div>
          {/* Input for transaction category */}

          <div style={fieldStyle}>
          {/* Input for transaction amount */}
          <input 
            type="number" 
            name="amount" 
            placeholder="Amount" 
            step="0.01" // Allows decimal values
            value={formData.amount} 
            onChange={handleChange} 
            style={inputStyle}
          />
          {errors.date && <p style ={errorStyle}>{errors.date}</p>}
          </div>
        </div>
        {/* Submit button for the form */}
        <button className="ui button" type="submit">Add Transaction</button>
      </form>
    </div>
  );
}

export default AddTransactionForm;
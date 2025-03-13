import { useState, useEffect } from "react";  
import { ToastContainer } from 'react-toastify';
 import 'react-toastify/dist/ReactToastify.css';
import { showSuccess, showError } from '../services/toaster.service';

const InputTodos = () => {
  const [description, setDescription] = useState(""); 

  useEffect(() => {
    const message = localStorage.getItem("createToastMessage");
    if (message) {
      setTimeout(() => showSuccess(message), 50); 
      localStorage.removeItem("createToastMessage");
    }
  }, []);
  

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      const response = await fetch("http://localhost:5000/api/todos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {  
        setDescription("");
        localStorage.setItem("createToastMessage", "Created Successfully!");
        window.location.reload();
      } 
      else {
        showError("Creation Failed!");
      }
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
    }
  };

  return (
    <>
      <h1 className="text-center display-3 p-4">Todo List</h1>
      <form className="d-flex mt-2 mb-4" onSubmit={onSubmit}>
        <input
          placeholder="Add a new todo..."
          className="form-control"
          type="text"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button className="btn btn-success text-capitalize ms-4" type="submit">
          <i className="bi bi-database-add"></i> Add
        </button>
      </form> 
      <ToastContainer />  
    </>
  );
};

export default InputTodos;

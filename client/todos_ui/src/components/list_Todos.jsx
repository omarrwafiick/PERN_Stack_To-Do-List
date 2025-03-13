import { useState, useEffect } from "react"; 
import { ToastContainer } from 'react-toastify'; 
import EditTodo from "./edit_Todo"; 
import { handleDismiss, showSuccess, showError } from '../services/toaster.service';

const ListTodos = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const message = localStorage.getItem("deleteToastMessage");
    if (message) {
      handleDismiss();
      setTimeout(() => showSuccess(message), 50); 
      localStorage.removeItem("deleteToastMessage");
    }
  }, []);
 
  const getTodos = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/todos");
      const jsonData = await response.json();
      setData(jsonData);
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
    }
  };

  const deleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/api/todos/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {  
        localStorage.setItem("deleteToastMessage", "Deleted Successfully!"); 
        setData(data.filter((todo) => todo.todo_id !== id));
        window.location.reload();
      } else {
        showError("Deletion Failed!");
      }
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
    }
  };

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <div className="row g-2 p-3 text-center justify-content-center align-items-center">
      {data.map((todo) => (
        <div className="card ms-1 me-1 col-6 col-md-4" style={{ width: "18rem" }} key={todo.todo_id}>
          <div className="card-body">
            <h5 className="card-title">Todo #{todo.todo_id}</h5>
            <p className="card-text">{todo.description}</p>
            <div className="w-100 d-flex justify-content-center">
                <EditTodo todo={todo} />
                <button
                onClick={() => deleteTodo(todo.todo_id)}
                className="btn btn-danger ms-2"
                >
                Delete
                </button>
            </div> 
          </div>
        </div>
      ))} 
      <ToastContainer />  
    </div>
  );
};

export default ListTodos;

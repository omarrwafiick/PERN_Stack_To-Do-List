import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";  
import { ToastContainer } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import { handleDismiss, showSuccess, showError } from '../services/toaster.service';

const EditTodo = ({ todo }) => {
  const [show, setShow] = useState(false);
  const [description, setDescription] = useState(todo.description); 
 
  useEffect(() => {
    const message = localStorage.getItem("updateToastMessage");
    if (message) {
      handleDismiss();
      setTimeout(() => showSuccess(message), 50); 
      localStorage.removeItem("updateToastMessage");
    }
  }, []);

  const handleClose = (confirm) => {
    if (confirm) {
      editTodo();
    } else {
      setDescription(todo.description);
      setShow(false);
    }
  };

  const editTodo = async () => {
    try {
      const body = { description };
      const response = await fetch(`http://localhost:5000/api/todos/${todo.todo_id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (response.ok) {
        localStorage.setItem("updateToastMessage", "Updated Successfully!");
        window.location.reload();
      } 
      else {
        showError("Update Failed!");
      }
    } catch (error) {
      console.error(`Error Message: ${error.message}`);
    }
  };

  return (
    <>
      <Button variant="primary" onClick={() => setShow(true)}>Edit</Button>

      <Modal show={show} onHide={() => handleClose(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <input
            type="text"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>Close</Button>
          <Button variant="primary" onClick={() => handleClose(true)}>Edit</Button>
        </Modal.Footer>
      </Modal>
      <ToastContainer />  
    </>
  );
};

export default EditTodo;

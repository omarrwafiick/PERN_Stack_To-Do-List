import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

function EditTodo({todo}) {
  const [show, setShow] = useState(false);

  const handleClose = (bool) =>{
    if(bool){ 
        editTodo();
    }
    else{ 
        setDescription(todo.description);
        setShow(false);
    }
  } 
  const handleShow = () => setShow(true);

  const [description, setDescription] = useState(todo.description);
 
  const editTodo = async () =>{
      try { 
          const body = {description};
          const response = await fetch(`http://localhost:5000/api/todos/${todo.todo_id}`,{
              method:"PUT",
              headers: {"Content-Type":"application/json"},
              body:JSON.stringify(body)
          });
          window.location = "/";
          } 
          catch (error) {
          console.log(`Error Message : ${error.message}`);
      };
  };

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
       Edit
      </Button>

      <Modal id={`id${todo.todo_id}`} show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title className='text-black'>Edit Todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <input type="text" className="form-control" value={description} onChange={ e => setDescription(e.target.value) }></input>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => handleClose(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={() => handleClose(true)}>
            Edit
          </Button> 
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditTodo;
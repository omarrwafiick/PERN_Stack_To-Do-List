const express = require('express');  
const router = express.Router();
const { getTodo ,getTodos, CreateTodo, UpdateTodo, DeleteTodo} = require("../controllers/todosController");
 
router.get('/', getTodos); 

router.get('/:id', getTodo); 

router.post('/', CreateTodo); 

router.put('/:id', UpdateTodo);  

router.delete('/:id', DeleteTodo); 

module.exports = router;
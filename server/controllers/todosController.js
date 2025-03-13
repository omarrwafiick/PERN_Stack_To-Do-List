const pool = require('../db');

const getTodos = async (req,res) => { 
    try {  
        const todos = await pool.query("SELECT * FROM todo");
        if(todos.length <= 0)
        {
            return res.status(404).json({ ErrorMessage : "Todos Was Not Found" });
        }
        res.status(200).json(todos.rows);
    } catch (error) {
        console.log(`Error Message : ${error.message}`);
    }
}

const getTodo = async (req,res) => { 
    try {  
        const { id } = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1",[id]);
        if(!todo)
        {
            return res.status(404).json({ ErrorMessage : "Todo Was Not Found" });
        } 
        res.status(200).json(todo.rows);
    } catch (error) {
        console.log(`Error Message : ${error.message}`); 
    }
}

const CreateTodo = async (req,res) => { 
    try {
        const { description } = req.body;
        const newTodo = await pool.query("INSERT INTO todo (description) VALUES ($1) RETURNING *",[description]);
        res.status(200).json(newTodo.rows[0]);
    } catch (error) {
        console.log(`Error Message : ${error.message}`);
    }
}

const UpdateTodo= async (req,res) => {  
    try {
        const { id } = req.params;
        const { description } = req.body;
        const updateTodo = await pool.query("UPDATE todo SET description = $1 WHERE todo_id = $2 RETURNING *",[description,id]);
        if(!updateTodo)
        {
            res.status(404).json({ ErrorMessage : "Todo Was Not Found" });
        }
        res.status(200).json(updateTodo.rows[0]);
    } catch (error) {
        console.log(`Error Message : ${error.message}`);
    }
}

const DeleteTodo = async (req,res) => { 
     try {
        const { id } = req.params; 
        const deleteTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1",[id]);
        if(!deleteTodo)
        {
            res.status(404).json({ ErrorMessage : "Todo Was Not Found" });
        }  
        res.status(200).json("Todo is deleted");
    } catch (error) {
        console.log(`Error Message : ${error.message}`);
    }
}

module.exports = {getTodo, getTodos, CreateTodo, UpdateTodo, DeleteTodo};
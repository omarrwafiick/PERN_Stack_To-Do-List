import React, { useState, useEffect } from "react";
import EditTodo from './edit_Todo'

const ListTodos = () => {
    const [data, setData] = useState([]);

    const getTodos = async () => {
        try { 
            const response = await fetch("http://localhost:5000/api/todos");
            const jsonData = await response.json(); 
            setData(jsonData);
            } 
            catch (error) {
            console.log(`Error Message : ${error.message}`);
        };
    };

    useEffect(()=>{
        getTodos();
    },[]);

    const deleteTodo = async (id) =>{
        try { 
            await fetch(`http://localhost:5000/api/todos/${id}`,{
                method:"DELETE"
            }); 
            setData(data.filter( t => t.todo_id !== id ));
            } 
            catch (error) {
            console.log(`Error Message : ${error.message}`);
        };
    };
    
    return (<div className="row text-center">
        {
            data.map( todo => (
                <div className="card m-2 col-6 col-md-4 d-flex justify-content-evenly"  style={{width: '18rem'}} key={todo.todo_id}>
                    <div className="card-body">
                        <h5 className="card-title text-capitalize">todo#{todo.todo_id}</h5> 
                        <p className="card-text">{todo.description}</p>
                        <EditTodo todo={todo} />
                        <button onClick={ () => deleteTodo(todo.todo_id) } className="btn btn-danger text-capitalize ms-2" type="submit">delete</button>
                    </div>
                </div> 
                )
            )
        }                                     
    </div>);
};

export default ListTodos;
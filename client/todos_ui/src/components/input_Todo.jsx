import React, { useState } from "react";

const InputTodos = () => {

  const [description, setDescription] = useState("");

  const onSubmit = async e => {
        e.preventDefault();
        try {
            const body = {description};
            await fetch("http://localhost:5000/api/todos",{
                method:"POST",
                headers: {"Content-Type":"application/json"},
                body:JSON.stringify(body)
            })
            window.location = "/";
        } catch (error) {
            console.log(`Error Message : ${error.message}`);
        };
  };

  return <>
    <div className="w-100 d-flex justify-content-center"><h1 className="text-capitalize display-1 p-4 ">todos list</h1></div>
    <form className="d-flex mt-2 mb-4" onSubmit={onSubmit}>
        <input placeholder="Add a new todo..." className="form-control" type="text" value={description} onChange={ e => {
            setDescription(e.target.value)
        }}></input>
        <button className="btn btn-success text-capitalize ms-4" type="submit" ><i class="bi bi-database-add"></i>add</button>
    </form>
  </> 
};

export default InputTodos;
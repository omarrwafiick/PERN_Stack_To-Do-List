const express = require('express');
const app = express();
const cors = require('cors');
const Route = require("./routes/routes");
//middleware
app.use(cors());
app.use(express.json());
 
//routes
app.use("/api/todos", Route); 
     
app.listen(5000,()=>{
    console.log("Server has started on port 5000");
}); 
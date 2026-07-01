const express = require("express");
const app = express();

app.use(express.json());

// Post

const students = [];

app.post("/students", (req, res)=>{

    const name = req.body.name;
    const course = req.body.course;
    const age = req.body.age;

    if(!name){
       return res.status(400).json({
            success: false,
            message: "Name is required"
        }); 
    }
    if(!course){
        return res.status(400).json({
            success: false,
            message: "Course is required"
        });
    }
    if(!age){
        return res.status(400).json({
            success: false,
            message: "Age is required"
        });
    }

    students.push({
        name,
        course,
        age
    });

    return res.status(201).json({
        success: true,
        message: "Student added succesfully",
        students     
    })

});

app.get("/students", (req, res)=>{
    console.log(typeof req.params.id);
    
    return res.json({
        success: true,
        students    
    });
});



app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
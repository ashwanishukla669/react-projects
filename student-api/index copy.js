const express = require("express");
const app = express();

app.use(express.json());

// Get
app.get("/students", (req, res)=>{    

    return res.status(200).json({
        success: true,
        students
    });
    
});


// Post
const students = [
    {
        name: "Mohini",
        course: "UI Designer",
        age: 45
    },
    {
        name: "Ashwani",
        course: "AI Full Stack",
        age: 32
    },
    {
        name: "Aman",
        course: "React",
        age: 25
    }
];

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

app.get("/students/:id", (req, res)=>{

   const id = req.params.id;
   const student = students[id];

   console.log(id);
    
    if(!student){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    return res.status(200).json({
        success: true,
        student
    });
});

// Put

app.put("/students/:id", (req, res)=> {

    const id = req.params.id;

    const name = req.body.name;
    const course = req.body.course;
    const age = req.body.age;

    if(!students[id]){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    students[id] = {
        name,
        course,
        age
    }

    return res.status(200).json({
        success: true,
        message: "Student updated successfully",
        student: students[id]
    });
});

// Delete

app.delete("/students/:id", (req, res)=> {

    const id = req.params.id;

    if(!students[id]){
        return res.status(404).json({
            success: false,
            message: "Student not found"
        });
    }

    // Delete the student
    students.splice(id, 1);

    return res.status(200).json({
        success: true,
        message: "Student deleted successfully",
        students
    });

});


app.listen(3000, ()=>{
    console.log("Server is running on port 3000");
});
const Student = require("../models/Student");

const getStudents = async (req, res) => {
  
  try{
    const students = await Student.find();
    return res.status(200).json({
      success: true,
      students
    });
  } catch(error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const getStudentById = async (req, res) => {

  try {
    const id = req.params.id;
    const student = await Student.findById(id);    

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
     
  } catch (error) {   

    return res.status(500).json({
      success: false,
      message: error.message
    });
  }

};

const createStudent = async (req, res) => {
  try {
    const name = req.body.name;
    const course = req.body.course;
    const age = req.body.age;

    if (!name) {
      return res.status(400).json({
        success: false,
        message: "Name is required",
      });
    }

    if (!course) {
      return res.status(400).json({
        success: false,
        message: "Course is required",
      });
    }

    if (!age) {
      return res.status(400).json({
        success: false,
        message: "Age is required",
      });
    }

    const student = await Student.create({
      name,
      course,
      age
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      student,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateStudent = async (req, res) => {  
  try {

    // URL se id lena
    const id = req.params.id;

    // Body se updated values lena
    const { name, course, age } = req.body; 
    
    // Student ko update karna
    const student = await Student.findByIdAndUpdate(
      id, // 1. Kis student ko update karna hai 
    {
      name,
      course,
      age,
    },  // 2. Kya update karna hai
    {
      new: true,
    } // 3. Updated document return karo  
  );

  if(!student){
    return res.status(404).json({
      success: false,
      message: "Student not found"
    });
  }

  return res.status(200).json({
      success: true,
      message: "Student updated succesfully",
      student
    });

  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const deleteStudent = async (req, res) => {
  try {

    const id = req.params.id;

    const student = await Student.findByIdAndDelete(id);

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }    

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      student,
    });
  } catch (error) {

    return res.status(500).json({
      success: false,
      message: error.message,
    });
    
  }
};

module.exports = {
  getStudents,
  getStudentById,
  createStudent,
  updateStudent,
  deleteStudent,
};
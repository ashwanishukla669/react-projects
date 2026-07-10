const students = [];

const getStudents = (req, res) => {
  return res.status(200).json({
    success: true,
    students,
  });
};

const getStudentById = (req, res) => {
  try {
    const id = req.params.id;
    const student = students[id];

    if (!student) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    return res.status(200).json({
      success: true,
      student,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const createStudent = (req, res) => {
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

    students.push({
      name,
      course,
      age,
    });

    return res.status(201).json({
      success: true,
      message: "Student created successfully",
      students,
    });

  } catch (err) {
    return res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

const updateStudent = (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const course = req.body.course;
    const age = req.body.age;

    if (!students[id]) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    students[id] = {
      name,
      course,
      age,
    };

    return res.status(200).json({
      success: true,
      message: "Student updated succesfully",
      students,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const deleteStudent = (req, res) => {
  try {
    const id = req.params.id;

    if (!students[id]) {
      return res.status(404).json({
        success: false,
        message: "Student not found",
      });
    }

    students.splice(id, 1);

    return res.status(200).json({
      success: true,
      message: "Student deleted successfully",
      students,
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

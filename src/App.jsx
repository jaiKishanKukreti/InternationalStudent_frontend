import { useState } from "react";

function App() {

  const [name, setName] = useState("");
  const [age, setAge] = useState("");

  const [studentId, setStudentId] = useState("");
  const [student, setStudent] = useState(null);
  const [students, setStudents] = useState([]);


  // CREATE STUDENT
  const createStudent = async (e) => {
    e.preventDefault();

    const newStudent = {
      name: name,
      age: Number(age)
    };

    try {
      const response = await fetch(
        "http://localhost:8080/student/create",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(newStudent)
        }
      );

      const result = await response.text();

      alert(result);

      setName("");
      setAge("");

    } catch (error) {
      console.error(error);
      alert("Error creating student");
    }
  };


  // GET ONE STUDENT
  const getStudent = async () => {

    try {
      const response = await fetch(
        `http://localhost:8080/student/${studentId}`
      );

      const data = await response.json();

      setStudent(data);

    } catch (error) {
      console.error(error);
      alert("Student not found");
    }
  };


  // GET ALL STUDENTS
  const getAllStudents = async () => {

    try {
      const response = await fetch(
        "http://localhost:8080/student/"
      );

      const data = await response.json();

      setStudents(data);

    } catch (error) {
      console.error(error);
      alert("Error getting students");
    }
  };


  return (
    <div>

      <h1>Student Management</h1>


      {/* CREATE */}

      <h2>Create Student</h2>

      <form onSubmit={createStudent}>

        <input
          type="text"
          placeholder="Enter name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <br />
        <br />

        <input
          type="number"
          placeholder="Enter age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
        />

        <br />
        <br />

        <button type="submit">
          Create Student
        </button>

      </form>


      <hr />


      {/* GET ONE */}

      <h2>Get Student</h2>

      <input
        type="number"
        placeholder="Enter student ID"
        value={studentId}
        onChange={(e) => setStudentId(e.target.value)}
      />

      <button onClick={getStudent}>
        Get Student
      </button>


      {student && (
        <div>

          <h3>Student Details</h3>

          <p>ID: {student.id}</p>
          <p>Name: {student.name}</p>
          <p>Age: {student.age}</p>

        </div>
      )}


      <hr />


      {/* GET ALL */}

      <h2>Get All Students</h2>

      <button onClick={getAllStudents}>
        Get All Students
      </button>


      {students.map((student) => (

        <div key={student.id}>

          <p>
            ID: {student.id} | Name: {student.name} | Age: {student.age}
          </p>

        </div>

      ))}

    </div>
  );
}

export default App;
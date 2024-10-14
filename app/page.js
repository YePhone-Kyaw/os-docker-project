'use client';

import { useState, useEffect } from 'react';

export default function Home() {
  const [student, setStudent] = useState('');
  const [students, setStudents] = useState([]);
  const [formData, setFormData] = useState({
    student_id: '',
    student_name: '',
    course: '',
  });



// Fetching students
useEffect(() => {
  async function fetchStudents() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/student/`)
    const json = await res.json();
    console.log(json);
    setStudents(json);
  }
  fetchStudents();
}, [])
// useEffect(() => {
//   const fetchStudents = async () => {
//     const response = await fetch('http://localhost:3000/api/students');
//     if (response.ok) {
//       const data = await response.json();
//       setStudents(data);
//     } else {
//       console.error('Failed to fetch students');
//     }
//   };
//   fetchStudents();
// }, []);


// Adding a student
const addStudent = async (event) => {
  event.preventDefault();
  const formData = new FormData(event.target);
  const studentData = {
    student_id: formData.get('student_id'),
    student_name: formData.get('student_name'),
    course: formData.get('course')
  };

  const response = await fetch('http://localhost:3000/api/students', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(studentData)
  });

  if (response.ok) {
    const newStudent = await response.json();
    console.log('Student added:', newStudent);
    // Refresh the student list or update state as needed
  } else {
    console.error('Failed to add student');
  }
};

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const response = await fetch('/server/api', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     });
  //     if (response.ok) {
  //       fetchStudents();
  //       setFormData({ student_id: '', student_name: '', course: '' });
  //     } else {
  //       console.error('Failed to add student');
  //     }
  //   } catch (error) {
  //     console.error('Error adding student:', error);
  //   }
  // };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/students/${id}`, {
        method: 'DELETE',
      });
      if (response.ok) {
        // Refresh the student list
        const updatedStudents = students.filter(student => student.student_id !== id);
        setStudents(updatedStudents);
      } else {
        console.error('Failed to delete student');
      }
    } catch (error) {
      console.error('Error deleting student:', error);
    }
  };

  return (
    <div>
      <div className="bg-gray-300/10 text-black shadow-md rounded pl-30 pr-30 px-8 pt-6 pb-8 mb-4 w-full">
        <form onSubmit={addStudent}>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="studentid"
            >
              Student ID
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="studentid"
              type="number"
              name="studentid"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="studentname"
            >
              Student Name
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="student_name"
              type="text"
              name="student_name"
              required
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-white text-sm font-bold mb-2"
              htmlFor="course"
            >
              Course
            </label>
            <input
              className="shadow appearance-none border rounded w-full py-2 px-3 text-black leading-tight focus:outline-none focus:shadow-outline"
              id="course"
              type="text"
              name="course"
              required
            />
          </div>
          <button type="submit" className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Add Student
          </button>
        </form>
      </div>
      <h2 className="text-2xl font-semibold mb-4 text-white">Added Students</h2>
      <ul className="bg-gray-300/10 shadow-md rounded-lg divide-y">
        {students.map((student) => (
          <li key={student.student_id} className="p-4 flex justify-between items-center">
            <div>
              <p className="text-white"><strong>ID:</strong> {student.student_id}</p>
              <p className="text-white"><strong>Name:</strong> {student.student_name}</p>
              <p className="text-white"><strong>Course:</strong> {student.course}</p>
            </div>
            <button onClick={() => handleDelete(student.student_id)} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded">
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

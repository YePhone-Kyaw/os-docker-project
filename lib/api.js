// "use server";

// import { pool } from "./db";

// export default async function handler(req, res) {
//     try {
//         const result = await pool.query('SELECT * FROM student');
//         res.status(200).json(result.rows);
//     } catch (error) {
//         console.error('Error executing query', error);
//         res.status(500).json({error: "Internal Server Error"})
//     }
// }

// // //Add new student
// export async function addStudent(data) {
//     let id = data.get("student_id")?.valueOf();
//     let name = data.get("student_name")?.valueOf();
//     let course = data.get("course")?.valueOf();
//     try {
//         const newStudent = await pool.query('INSERT INTO student (student_id, student_name, course) VALUES ($1, $2, $3) RETURNING *', [id, name, course])
//         console.log(newStudent.rows[0]);
//         return newStudent.rows[0];
//     } catch (error) {
//         console.log(error);
//     }
// }

import { NextResponse } from "next/server";
import prisma from "./db/prisma";

export const POST = async (req) => {
    const body = await req.json();

    if (!body.student_id || !body.student_name || !body.course) {
        return NextResponse.json("Please provide student ID, name, and course", { status: 400 });
    }

    try {
        const student = await prisma.student.create({ 
            data: {
                student_id: parseInt(body.student_id),
                student_name: body.student_name,
                course: body.course,
            }
        });
        return NextResponse.json({ student });
    } catch (error) {
        console.error(error);
        return NextResponse.json("Something went wrong creating the student", { status: 500 });
    }
}



// //Delete student
// export async function deleteStudent(data) {
//     let id = data.get("student_id").valueOf();

//     try{
//         await pool.query('DELETE FROM student WHERE student_id = $1', [id])
//         console.log('The student is successfully deleted.');
//     } catch (error) {
//         console.log(error.message);
//     }
// }


// export default async function handler(req, res) {
//   if (req.method === 'GET') {
//     try {
//       const { rows } = await pool.query("SELECT * FROM student");
//       res.status(200).json(rows);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to fetch students' });
//     }
//   } else if (req.method === 'POST') {
//     try {
//       const { student_id, student_name, course } = req.body;
//       const { rows } = await pool.query(
//         'INSERT INTO student (student_id, student_name, course) VALUES ($1, $2, $3) RETURNING *',
//         [student_id, student_name, course]
//       );
//       res.status(201).json(rows[0]);
//     } catch (error) {
//       res.status(500).json({ error: 'Failed to add student' });
//     }
//   } else {
//     res.setHeader('Allow', ['GET', 'POST']);
//     res.status(405).end(`Method ${req.method} Not Allowed`);
//   }
// }

const port = process.env.port || 5432;
app.listen(port, () => console.log(`App is listening on http://localhost:${port}`));
// db/queries/students.js

import { db } from '@/lib/db'
import { notFound } from 'next/navigation'

export async function fetchStudents() {
  return await db.student.findMany({
    orderBy: [
      {
        updatedAt: 'desc',
      }
    ],
  })
}

export async function fetchStudentById(id) {
  const student = await db.student.findFirst({
    where: {
      student_id: id
    }
  })

  if (!student) {
    notFound()
  }

  return student
}

export async function createStudent(data) {
  return await db.student.create({
    data: {
      student_id: data.student_id,
      student_name: data.student_name,
      course: data.course,
    },
  })
}

export async function updateStudent(id, data) {
  return await db.student.update({
    where: {
      student_id: id,
    },
    data: {
      student_name: data.student_name,
      course: data.course,
    },
  })
}

export async function deleteStudent(id) {
  return await db.student.delete({
    where: {
      student_id: id,
    },
  })
}
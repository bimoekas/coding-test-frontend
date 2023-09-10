import { Students } from '@/models/students/students'
import axios from 'axios'

export function updateStudent(id: number | undefined, data: Students) {
    axios
        .patch(`http://localhost:8000/api/student/${id}`, data)
        .then(response => console.log('success', response))
}

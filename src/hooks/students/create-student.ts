import axios from 'axios'

export function createStudent(data: any) {
    axios
        .post('http://localhost:8000/api/student', data)
        .then(response => console.log('success', response))
}

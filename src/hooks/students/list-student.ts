import { Data } from '@/models/students/data'
import axios from 'axios'
import { useQuery } from 'react-query'

export function useListStudents() {
    return useQuery('students', () =>
        axios
            .get('http://localhost:8000/api/student')
            .then(response => response.data as Data),
    )
}

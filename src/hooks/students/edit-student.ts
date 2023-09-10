import { Data } from '@/models/students/data'
import axios from 'axios'
import { useQuery } from 'react-query'

export function useEditStudent(id: number) {
    return useQuery('students', () =>
        axios
            .get(`http://localhost:8000/api/student/${id}`)
            .then(response => response.data as Data),
    )
}

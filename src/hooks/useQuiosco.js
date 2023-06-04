import { useContext } from 'react'
import QuioscoContext from '../context/QuioscoProvider'

const useQuisco = () => {
    return useContext(QuioscoContext)
}

export default useQuisco
import { ReactNode } from 'react'
import { useSelector } from 'react-redux'
import { Navigate } from 'react-router-dom'
import { rootState } from '../../main'

const PrivateRoute = ({children}:{children:ReactNode}) => {
    const {user}=useSelector((state:rootState)=>state.user)
    if(user.email!==""){
       return children
    }else{
        return <Navigate to="/"/>
    }
}

export default PrivateRoute
import useSWR from "swr";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import clienteAxios from "../config/axios";

export const useAuth = ({middleware, url}) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const { data: user, error, mutate } = useSWR('/api/user', () =>
        clienteAxios('/api/user', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        .then(response => response.data)
        .catch(error => {
            throw Error(error?.response?.data?.errors)
        })
    )

    const login = (datos, setErrores) => {
        clienteAxios
          .post('/api/login', datos)
          .then((response) => {
            const { data } = response;
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            return mutate();
          })
          .catch((error) => {
            setErrores(Object.values(error.response.data.errors));
          });
      };
      
     const registro = (datos, setErrores) => {
        clienteAxios
          .post('/api/registro', datos)
          .then((response) => {
            const { data } = response;
            localStorage.setItem('AUTH_TOKEN', data.token);
            setErrores([]);
            return mutate();
          })
          .catch((error) => {
            setErrores(Object.values(error.response.data.errors));
          });
      };
      
     const logout = () => {
        try {
            clienteAxios.post('/api/logout', null, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            return mutate(undefined)
        } catch (error) {
            throw Error(error?.response?.data?.errors)
        }
     }

     useEffect(() => {
          if(middleware === 'guest' && url && user) {
            navigate(url)
          }
          
          if(middleware === 'guest' && user && user.admin) {
            navigate('/admin')
          }

          if(middleware === 'admin' && user && !user.admin) {
            navigate('/')
          }

          if(middleware === 'auth' && error) {
            navigate('/auth/login')
        }
     }, [user, error])

     return {
        login,
        registro, 
        logout,
        user,
        error
     }
    
}
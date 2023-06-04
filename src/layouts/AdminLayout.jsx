import { Outlet } from 'react-router-dom'
import AdminSidebar from '../components/AdminSidebar'
import { useAuth } from '../hooks/useAuth'

export default function AdminLayout() {

    useAuth({middleware: 'admin'})
    return (
      <div className='md:flex'>
          <AdminSidebar />

          <div className='flex-1 h-screen overflow-scroll bg-gray-100 p-3'>
              <Outlet />
          </div>
          
      </div>
    )
}

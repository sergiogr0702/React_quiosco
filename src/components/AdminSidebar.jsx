import { Link } from "react-router-dom";
import { useAuth } from "../hooks/useAuth"

export default function AdminSidebar() {

  const { logout } = useAuth({middleware: 'auth'})

  return (
    <aside className="md:w-72 h-screen">
      <div className="p-4">
        <img className="w-40" src="../img/logo.svg" alt="Imagen Logo" />
      </div>
      <nav className="mt-10">
        <Link
          to="/admin"
          className="flex items-center gap-4 border 
                            w-full p-3 hover:bg-amber-400 
                            cursor-pointer font-bold"
        >
          Pedidos
        </Link>

        <Link
          to="/admin/productos"
          className="flex items-center gap-4 border
                            w-full p-3 hover:bg-amber-400 
                            cursor-pointer font-bold"
        >
          Productos
        </Link>
      </nav>

      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
          onClick={logout}
        >
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
}

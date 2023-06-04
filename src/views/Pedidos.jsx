import useSWR from 'swr'
import clienteAxios from '../config/axios'
import {formatearDinero} from '../helpers/index'
import useQuisco from '../hooks/useQuiosco'

export default function Pedidos() {

    const { handleClickCompletarPedido } = useQuisco()

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', 
    { 
      headers: { 
        'Authorization': `Bearer ${token}` 
      } 
    })

    const {data, error, isLoading} = useSWR('/api/pedidos', fetcher, {refreshInterval: 5000})

    if(isLoading) return 'Cargando...'

    return (
      <div>
        <h1 className="text-4xl font-black">
          Pedidos
        </h1>
        <p className="text-2xl my-10">
          Administra los pedidos desde aquí
        </p>

        <div className='lg:grid lg:grid-cols-2 lg:gap-5'>
            {data.data.data.map(pedido => (
                <div key={pedido.id} className="border-b border-b-slate-900 space-y-2 p-5 bg-white shadow">
                    <p className='text-xl font-bold text-slate-600'>
                        Contenido del pedido:
                    </p>
                    {pedido.productos.map(producto => (
                        <div key={producto.id} className="border-b border-b-slate-400 last-of-type:border-none py-4">
                            <p className="text-sm">
                              ID: {producto.id}
                            </p>
                            <p>
                              {producto.nombre}
                            </p>
                            <p>
                              Cantidad: {''}
                              <span className='font-bold'>{producto.pivot.cantidad}</span>
                            </p>
                        </div>
                    ))}
                    <p className='text-lg font-bold text-slate-600'>
                        Cliente: {''}
                        <span className="font-normal">{pedido.user.name}</span>
                    </p>
                    <p className='text-lg font-bold text-slate-600'>
                        Total a pagar: {''}
                        <span className="font-normal text-slate-600">{formatearDinero(pedido.total)}</span>
                    </p>

                    <button
                        type="button"
                        className='bg-indigo-600 hover:bg-indigo-800 
                                    px-5 py-2 uppercase 
                                    font-bold text-white text-center w-full cursor-pointer'
                        onClick={() => handleClickCompletarPedido(pedido.id)}
                    >Completar Pedido</button>
                </div>
            ))}          
        </div>
      </div>
    )
}

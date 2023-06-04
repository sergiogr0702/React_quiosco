import useQuisco from "../hooks/useQuiosco"

export default function Categoria({categoria}) {

    const {handleClickCategoria, categoriaActual} = useQuisco();
    const {icono, id, nombre} = categoria

    return (
        <button 
                className={`${categoriaActual.id === id ? "bg-amber-400" : 'bg-white'} 
                            flex items-center gap-4 border w-full p-3 hover:bg-amber-400 cursor-pointer`}
                type="button"
                onClick={() => handleClickCategoria(id)}      
        >
            <img 
                alt="Imagen Icono"
                src={`/img/icono_${icono}.svg`}
                className="w-12"
            />
            <p className="text-lg font-bold cursor-pointer truncate">
                {nombre}
            </p>
        </button>
    )
}


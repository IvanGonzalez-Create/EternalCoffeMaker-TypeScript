import type { CoffeeItem, Coffee } from "../types/types"

type HeaderProps = {
    Carrito : CoffeeItem[]
    EliminarElemento : (id : Coffee['id']) => void
    IncrementarCantidad : (id : Coffee['id']) => void
    DecrementarCantidad : (id : Coffee['id']) => void
    VaciarCarrito : () => void
    TotalCarrito : number
    CarritoVacio : Boolean
}


export default function Header({
    Carrito, 
    EliminarElemento, 
    IncrementarCantidad,
    DecrementarCantidad,
    VaciarCarrito, 
    TotalCarrito,
    CarritoVacio} 
    : HeaderProps) {

    
    return(

            <header className="py-5 header">
        <div className="container-xl">
            <div className="row justify-content-center justify-content-md-between">
                <div className="col-8 col-md-3">
                    <a href="index.html">
                        <img className="img-fluid" src="/img/LogoCoffe.png" alt="imagen logo" />
                    </a>
                </div>
                <nav className="col-md-6 a mt-5 d-flex align-items-start justify-content-end">
                    <div 
                        className="carrito"
                    >
                        <img className="img-fluid" src="/img/carrito.png" alt="imagen carrito" />

                        <div id="carrito" className="bg-white p-3">
                            {CarritoVacio ? 
                            <p className="text-center">El carrito esta vacio </p> 
                            :  (
                        <>
                            <table className="w-100 table">
                                <thead>
                                    <tr>
                                        <th>Imagen</th>
                                        <th>Nombre</th>
                                        <th>Precio</th>
                                        <th>Cantidad</th>
                                        <th></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {Carrito.map(Cafeteras => (     
                                        <tr key={Cafeteras.id}>
                                        <td>
                                            <img className="img-fluid" src={Cafeteras.imagen} alt="imagen cafetera" />
                                        </td>
                                        <td>{Cafeteras.nombre}</td>
                                        <td className="fw-bold">
                                            {Cafeteras.precio}
                                        </td>
                                        <td className="flex align-items-start gap-4">
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => DecrementarCantidad(Cafeteras.id)}
                                            >
                                                -
                                            </button>
                                                {Cafeteras.quantity}
                                            <button
                                                type="button"
                                                className="btn btn-dark"
                                                onClick={() => IncrementarCantidad(Cafeteras.id)}
                                            >
                                                +
                                            </button>
                                        </td>
                                        <td>
                                            <button
                                                className="btn btn-danger"
                                                type="button"
                                                onClick={() => EliminarElemento(Cafeteras.id)}
                                            >
                                                X
                                            </button>
                                        </td>
                                    </tr>
                                    ))}
                                </tbody>
                            </table>

                            <p className="text-end">Total pagar: <span className="fw-bold"> {TotalCarrito} </span></p>
                        </>
                    )}
                            <button 
                            className="btn btn-dark w-100 mt-3 p-2"
                            onClick={VaciarCarrito}
                            >Vaciar Carrito
                            </button>

                        </div>
                    </div>
                </nav>
            </div>
        </div>
    </header>
 
    )
}
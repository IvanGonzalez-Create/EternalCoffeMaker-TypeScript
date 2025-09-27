import { useEffect, useState, useMemo } from "react"
import { DataBase } from "../Data/DB_CoffeMaker"
import type { CoffeeItem, Coffee } from "../types/types"

export const useCarrito = () => {


    const CarritoInicial = () : CoffeeItem[] => {
        const LocalStorageCarrito = localStorage.getItem('Carrito')
        return LocalStorageCarrito ? JSON.parse(LocalStorageCarrito) : []
      }
    

      const [Data] = useState(DataBase)
      const [Carrito, setCarrito] = useState(CarritoInicial)
    

      useEffect (() => {
        localStorage.setItem('Carrito',JSON.stringify(Carrito))
      },[Carrito])
     
    
    function AgregarCarrito(Element : Coffee) {
    
        const ElementExist = Carrito.findIndex(cafetera => cafetera.id === Element.id  )    
        if (ElementExist >=0) {
          
          if(Carrito[ElementExist].quantity >= 10) return 
          const UpdatedCarrito = [...Carrito]
          UpdatedCarrito[ElementExist].quantity++
          setCarrito(UpdatedCarrito)
        
        } else {

          const NewElement : CoffeeItem = {...Element, quantity : 1}
          setCarrito([...Carrito, NewElement])
        }      
      }
    
    function EliminarElemento(id : Coffee['id']) {
        setCarrito(prevCarrito => prevCarrito.filter(Cafetera => Cafetera.id !== id))
      }
    
    
    
    function IncrementarCantidad(id : Coffee['id']) {
        const ActualizarCarrito = Carrito.map(Item => {
    
          if(Item.id === id && Item.quantity < 10) {
    
          return{
               ...Item,
            quantity: Item.quantity + 1
          }
           
          } else {
            return Item  
          }
    
      })
    
      setCarrito(ActualizarCarrito) 
    }
    
    
    function DecrementarCantidad(id : Coffee['id']) {
      const ActualizarCarrito = Carrito.map(Item => {
        if (Item.id === id && Item.quantity > 1) {
          return {
            ...Item,
            quantity: Item.quantity - 1
          }
        } else {
          return Item
        }
    
      })
      setCarrito(ActualizarCarrito)
     }
    
    function VaciarCarrito() {
      setCarrito([])
    }


// State Derivado y uso de useMemo
  const TotalCarrito = useMemo( () => Carrito.reduce( (acumulador,item) => acumulador + (item.precio * item.quantity), 0)
  ,[Carrito])
  const CarritoVacio = useMemo(() => Carrito.length ===  0,[Carrito])
    


    return {

        Data,
        Carrito,
        AgregarCarrito,
        EliminarElemento,
        IncrementarCantidad,
        DecrementarCantidad,
        VaciarCarrito,
        TotalCarrito,
        CarritoVacio

    }

}
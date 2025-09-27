export type Coffee = {

  id : number
  nombre : string
  imagen : string
  descripcion : string
  precio : number
  
}

export type CoffeeItem = Coffee & {
   quantity: number
}
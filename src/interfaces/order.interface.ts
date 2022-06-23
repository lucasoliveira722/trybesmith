export interface Order {
  id: number,
  userId: number,
}

export interface OrderWithProduct extends Order {
  productsIds: number[]
}

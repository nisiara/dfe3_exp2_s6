export interface TravelInput {
  rut: string
  fullName: string
  email: string
  origen: string
  fechaSalida: string
  horaSalida: string
  destino: string
  fechaRegreso: string
  horaRegreso: string
  tipoViaje: string
}

export interface Travel {
  id: string
  rut: string
  fullName: string
  email: string
  origen: string
  fechaSalida: Date
  horaSalida: string
  destino: string
  fechaRegreso: Date
  horaRegreso: string
  tipoViaje: string
  estado: 'en proceso' | 'confirmado' | 'finalizado'
}
import { parse } from 'date-fns'

const API_URL = 'http://localhost:3001/api/travels'

export interface Travel {
	id: string
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
	estado: 'en proceso' | 'confirmado' | 'finalizado'
}

export async function fetchTravels(): Promise<Travel[]> {
	const response = await fetch(API_URL)
	if (!response.ok) {
		throw new Error('Error al obtener el registro de viajes')
	}
	const json = await response.json()
	// El backend responde { status, message, data }
	const data = json.data || []
	return data.map((travel: Travel) => ({
		...travel,
		fechaSalida: travel.fechaSalida
			? parse(travel.fechaSalida, 'dd-MM-yyyy', new Date())
			: new Date(),
		fechaRegreso: travel.fechaRegreso
			? parse(travel.fechaRegreso, 'dd-MM-yyyy', new Date())
			: new Date()
	}))
}

export async function createTravel(travel: Omit<Travel, 'id' | 'estado'>): Promise<Travel> {
	const response = await fetch(API_URL, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(travel)
	})
	const result = await response.json()
	if (!response.ok) {
		throw result
	}
	return result
}

export async function filterTravelsByStatus(status: Travel['estado']): Promise<Travel[]> {
	const response = await fetch(`${API_URL}?estado=${status}`)
	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || 'Error al filtrar los viajes por estado')
	}
	const data = await response.json()
	return data.map((travel: any) => ({
		...travel,
		fechaSalida: travel.fechaSalida
			? parse(travel.fechaSalida, 'dd-MM-yyyy', new Date())
			: new Date(),
		fechaRegreso: travel.fechaRegreso
			? parse(travel.fechaRegreso, 'dd-MM-yyyy', new Date())
			: new Date()
	}))
}

export async function updateTravelStatus(id: string, status: Travel['estado']): Promise<Travel> {
	const response = await fetch(`${API_URL}/${id}/status`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify({ status })
	})
	if (!response.ok) {
		throw new Error('Error al actualizar el estado del viaje')
	}
	const result = await response.json()
	return result.data
}

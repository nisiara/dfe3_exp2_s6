import { parse } from 'date-fns'

const API_URL = 'http://localhost:3001/api/travels'

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

export async function fetchAllTravels(): Promise<Travel[]> {
	const response = await fetch(API_URL)
	if (!response.ok) {
		throw new Error('Error al obtener los viajes')
	}
	const json = await response.json()
	const data = json.data || []
	return data.map((travel: TravelInput & { id: string; estado: Travel['estado'] }) => ({
		...travel,
		fechaSalida: travel.fechaSalida
			? parse(travel.fechaSalida, 'dd-MM-yyyy', new Date())
			: new Date(),
		fechaRegreso: travel.fechaRegreso
			? parse(travel.fechaRegreso, 'dd-MM-yyyy', new Date())
			: new Date()
	}))
}

export async function fetchFilteredTravels(status: Travel['estado']): Promise<Travel[]> {
	const response = await fetch(`${API_URL}/status/${status}`)
	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || 'Error al filtrar los viajes por estado')
	}
	const json = await response.json()
	const data = json.data || []
	return data.map((travel: TravelInput & { id: string; estado: Travel['estado'] }) => ({
		...travel,
		fechaSalida: travel.fechaSalida
			? parse(travel.fechaSalida, 'dd-MM-yyyy', new Date())
			: new Date(),
		fechaRegreso: travel.fechaRegreso
			? parse(travel.fechaRegreso, 'dd-MM-yyyy', new Date())
			: new Date()
	}))
}

export async function createTravel(travel: TravelInput): Promise<Travel> {
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
	const response = await fetch(`${API_URL}/status/${status}`)
	if (!response.ok) {
		const error = await response.json()
		throw new Error(error.message || 'Error al filtrar los viajes por estado')
	}
	const json = await response.json()
	const data = json.data || []
	console.log('Viajes filtrados por estado:', data)
	return data.map((travel: TravelInput & { id: string; estado: Travel['estado'] }) => ({
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

import { parse } from 'date-fns'
import type { Travel, TravelInput } from './types'

const API_URL = 'http://localhost:3001/api/travels'

export async function fetchAllTravels(estado?: string): Promise<Travel[]> {
	// Construimos la URL con el parámetro de búsqueda si existe
	const url = new URL(API_URL)
	if (estado && estado !== 'todos') {
		url.searchParams.append('estado', estado)
	}

	const response = await fetch(url.toString(), {
		cache: 'no-store' // Evita cachear respuestas en Next.js
	})

	let json: any
	try {
		json = await response.json()
	} catch (_e) {
		throw new Error('Respuesta del servidor no es JSON válido')
	}

	if (!response.ok) {
		throw new Error(json?.message || 'Error al obtener los viajes')
	}

	// Aceptamos tanto array directo como objeto con .data
	const data = Array.isArray(json) ? json : json.data || []

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

export async function deleteTravel(id: string): Promise<void> {
	const response = await fetch(`${API_URL}/${id}`, {
		method: 'DELETE'
	})

	if (!response.ok) {
		let message = 'Error al eliminar el viaje'
		try {
			const error = await response.json()
			message = error?.message || message
		} catch (_err) {}
		throw new Error(message)
	}
}

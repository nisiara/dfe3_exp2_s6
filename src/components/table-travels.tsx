'use client'

import { IconPlaneArrival, IconPlaneDeparture } from '@tabler/icons-react'
import { format } from 'date-fns'
import { useCallback, useEffect, useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'

import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'

import type { Travel } from '@/lib/api'
import { fetchAllTravels, fetchFilteredTravels, updateTravelStatus } from '@/lib/api'

import FilterTravels from './filter-travels'
import ChangeStatusTravel from './change-status-travel'

export default function TableTravels({ initialTravels }: { initialTravels: Travel[] }) {
	const [travels, setTravels] = useState<Travel[]>(initialTravels)
	const [error, setError] = useState<string | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<string>('')

	const refreshTravels = useCallback(async () => {
		setError(null)
		try {
			const statusMap: Record<string, Travel['estado']> = {
				'En Proceso': 'en proceso',
				Confirmado: 'confirmado',
				Finalizado: 'finalizado'
			}
			const status =
				selectedStatus && selectedStatus !== 'Todos' ? statusMap[selectedStatus] || null : null
			const data = status ? await fetchFilteredTravels(status) : await fetchAllTravels()
			setTravels(data)
		} catch (err: unknown) {
			const message = err instanceof Error ? err.message : 'Error desconocido al obtener los viajes'
			setError(message)
		}
	}, [selectedStatus])

	useEffect(() => {
		if (!selectedStatus) return
		void refreshTravels()
	}, [refreshTravels, selectedStatus])

	const handleStatusChange = async (travelId: string, newStatus: Travel['estado']) => {
		try {
			await updateTravelStatus(travelId, newStatus)
			toast.success('Estado actualizado correctamente')
			await refreshTravels()
		} catch (err: unknown) {
			const message =
				err instanceof Error ? err.message : 'Error desconocido al actualizar el estado'
			setError(message)
			toast.error('Error al actualizar el estado')
		}
	}

	return (
		<main>
			<FilterTravels setSelectedStatus={setSelectedStatus} />
			{error ? (
				<div className="mb-4 text-red-500">
					<p>{error}</p>
				</div>
			) : travels.length === 0 ? (
				<div className="bg-yellow-100 p-4 rounded text-yellow-600">
					<p className="text-center text-xs font-semibold">No hay registros</p>
				</div>
			) : (
				<Table>
					<TableHeader className="bg-slate-100">
						<TableRow>
							<TableHead className="font-semibold">Cliente</TableHead>

							<TableHead className="font-semibold">Origen</TableHead>
							<TableHead className="font-semibold">Destino</TableHead>
							<TableHead className="font-semibold">Tipo de Viaje</TableHead>

							<TableHead className="font-semibold">Estado</TableHead>
						</TableRow>
					</TableHeader>
					<TableBody>
						{travels.map(travel => (
							<TableRow key={travel.id}>
								<TableCell className="flex flex-col">
									<b className="text-md">{travel.fullName}</b>
									<small>{travel.rut}</small>
									<small>{travel.email}</small>
								</TableCell>

								<TableCell>
									<div className="flex gap-2 items-center">
										<IconPlaneDeparture className="size-5" />
										<div className="flex flex-col">
											<b className="text-md capitalize">{travel.origen}</b>
											<small>
												{travel.fechaSalida
													? format(travel.fechaSalida, 'PPP')
													: 'Fecha no disponible'}{' '}
											</small>
											<small>
												{travel?.horaSalida ? `${travel.horaSalida} hrs.` : 'Hora no disponible'}
											</small>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex gap-2 items-center">
										<IconPlaneArrival className="size-5" />
										<div className="flex flex-col">
											<b className="text-md capitalize">{travel.destino}</b>
											<small>
												{travel.fechaRegreso
													? format(travel.fechaRegreso, 'PPP')
													: 'Fecha no disponible'}{' '}
											</small>
											<small>
												{travel?.horaRegreso ? `${travel.horaRegreso} hrs.` : 'Hora no disponible'}
											</small>
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Badge
										className="capitalize"
										variant="secondary"
									>
										{travel.tipoViaje}
									</Badge>
								</TableCell>
								<TableCell>
									<ChangeStatusTravel
										travel={travel}
										handleStatusChange={handleStatusChange}
									/>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			)}
		</main>
	)
}

'use client'

import { IconPlaneArrival, IconPlaneDeparture } from '@tabler/icons-react'
import { format } from 'date-fns'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { useRouter } from 'next/navigation'
import { toast } from 'sonner'

import type { Travel } from '@/lib/api'
import { fetchTravels, updateTravelStatus } from '@/lib/api'

import { useEffect, useState } from 'react'

export default function TableTravels() {
	const [travels, setTravels] = useState<Travel[]>([])
	const [error, setError] = useState<string | null>(null)
	const router = useRouter()

	useEffect(() => {
		const loadTravels = async () => {
			try {
				const data = await fetchTravels()
				// Remove duplicates by id
				const uniqueData = data.filter(
					(travel, index, arr) => arr.findIndex(t => t.id === travel.id) === index
				)
				setTravels(uniqueData)
			} catch (err: any) {
				setError(err.message || 'Error al obtener los registros')
			}
		}
		loadTravels()
	}, [])

	const handleStatusChange = async (travelId: string, newStatus: Travel['estado']) => {
		try {
			await updateTravelStatus(travelId, newStatus)
			toast.success('Estado actualizado correctamente')
			// Refetch travels
			const data = await fetchTravels()
			// Remove duplicates by id
			const uniqueData = data.filter(
				(travel, index, arr) => arr.findIndex(t => t.id === travel.id) === index
			)
			setTravels(uniqueData)
		} catch (err: any) {
			toast.error('Error al actualizar el estado')
		}
	}

	return (
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
				{error ? (
					<TableRow>
						<TableCell colSpan={11}>Error: {error}</TableCell>
					</TableRow>
				) : travels.length === 0 ? (
					<TableRow>
						<TableCell colSpan={11}>No hay registros</TableCell>
					</TableRow>
				) : (
					travels.map(travel => (
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
								<ToggleGroup
									type="single"
									size="sm"
									value={travel.estado || 'en proceso'}
									onValueChange={value => handleStatusChange(travel.id, value as Travel['estado'])}
									variant="outline"
								>
									<ToggleGroupItem
										className="text-xs p-1"
										value="en proceso"
										aria-label="Toggle en proceso"
									>
										En Proceso
									</ToggleGroupItem>
									<ToggleGroupItem
										className="text-xs py-1"
										value="confirmado"
										aria-label="Toggle confirmado"
									>
										Confirmado
									</ToggleGroupItem>
									<ToggleGroupItem
										className="text-xs p-1"
										value="finalizado"
										aria-label="Toggle finalizado"
									>
										Finalizado
									</ToggleGroupItem>
								</ToggleGroup>
							</TableCell>
						</TableRow>
					))
				)}
			</TableBody>
		</Table>
	)
}

'use client'

import { IconPlaneArrival, IconPlaneDeparture } from '@tabler/icons-react'
import { format } from 'date-fns'
import { useState } from 'react'
import { toast } from 'sonner'
import { Badge } from '@/components/ui/badge'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow
} from '@/components/ui/table'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Travel } from '@/lib/api'
import { fetchTravels, updateTravelStatus } from '@/lib/api'

export default function TableTravels({ initialTravels }: { initialTravels: Travel[] }) {
	const [travels, setTravels] = useState<Travel[]>(initialTravels)
	const [error, setError] = useState<string | null>(null)
	const [selectedStatus, setSelectedStatus] = useState<string>('')

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
		} catch (_err: any) {
			toast.error('Error al actualizar el estado')
		}
	}

	const frameworks = ['Todos', 'En Proceso', 'Confirmado', 'Finalizado'] as const

	const filteredTravels =
		selectedStatus === 'Todos' || !selectedStatus
			? travels
			: travels.filter(
					travel =>
						travel.estado === selectedStatus.toLowerCase().replace('en proceso', 'en proceso')
				)

	return (
		<main>
			<div className="mb-4 w-64">
				<Combobox
					items={frameworks}
					onValueChange={value => setSelectedStatus((value as string) || '')}
				>
					<ComboboxInput placeholder="Filtrar por estado" />
					<ComboboxContent>
						<ComboboxEmpty>No hay items.</ComboboxEmpty>
						<ComboboxList>
							{item => (
								<ComboboxItem
									key={item}
									value={item}
								>
									{item}
								</ComboboxItem>
							)}
						</ComboboxList>
					</ComboboxContent>
				</Combobox>
			</div>
			{error ? (
				<div className="mb-4 text-red-500">
					<p>{error}</p>
				</div>
			) : filteredTravels.length === 0 ? (
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
						{filteredTravels.map(travel => (
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
										onValueChange={value =>
											handleStatusChange(travel.id, value as Travel['estado'])
										}
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
						))}
					</TableBody>
				</Table>
			)}
		</main>
	)
}

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
import type { Travel } from '@/lib/types'
import TravelChangeStatus from './TravelChangeStatus'

type TravelListProps = {
	travels: Travel[]
}

const TravelList = async ({ travels }: TravelListProps) => {
	return travels.length === 0 ? (
		<div className="bg-yellow-100 p-4 rounded text-yellow-600">
			<p className="text-center text-xs font-semibold">No hay registros</p>
		</div>
		) 
		: 
		(
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
							<TravelChangeStatus travel={travel} />
						</TableCell>
					</TableRow>
				))}
			</TableBody>
		</Table>	
		
	)
}

export default TravelList

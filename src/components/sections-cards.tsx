import { IconTrendingDown, IconTrendingUp } from '@tabler/icons-react'

import { Badge } from '@/components/ui/badge'
import {
	Card,
	CardAction,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle
} from '@/components/ui/card'

export function SectionCards({
	viajesFinalizados,
	viajesConfirmados,
	viajesEnProceso
}: {
	viajesFinalizados: any[]
	viajesConfirmados: any[]
	viajesEnProceso: any[]
}) {
	return (
		<div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Total Viajes</CardDescription>
					<CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
						{viajesFinalizados.length + viajesConfirmados.length + viajesEnProceso.length}
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Viajes Confirmados</CardDescription>
					<CardTitle className="text-2xl font-bold tabular-nums @[250px]/card:text-3xl">
						{viajesConfirmados.length}
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Viajes en Proceso</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{viajesEnProceso.length}
					</CardTitle>
				</CardHeader>
			</Card>
			<Card className="@container/card">
				<CardHeader>
					<CardDescription>Viajes Finalizados</CardDescription>
					<CardTitle className="text-2xl font-semibold tabular-nums @[250px]/card:text-3xl">
						{viajesFinalizados.length}
					</CardTitle>
				</CardHeader>
			</Card>
		</div>
	)
}

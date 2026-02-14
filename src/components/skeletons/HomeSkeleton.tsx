import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'

const summaryCards = [
	'Total Viajes',
	'Viajes Confirmados',
	'Viajes en Proceso',
	'Viajes Finalizados'
]

const tableColumns = ['Cliente', 'Origen', 'Destino', 'Tipo de Viaje', 'Estado', '']

const HomeSkeleton = () => {
	return (
		<div className="space-y-8">
			<div className="grid grid-cols-1 gap-4 *:data-[slot=card]:bg-linear-to-t *:data-[slot=card]:shadow-xs @xl/main:grid-cols-2 @5xl/main:grid-cols-4">
				{summaryCards.map(label => (
					<Card
						className="@container/card"
						key={label}
					>
						<CardHeader>
							<CardDescription>
								<Skeleton className="h-6 w-48" />
							</CardDescription>
							<CardTitle className="@[250px]/card:text-3xl text-2xl font-bold">
								<Skeleton className="h-8 w-24 @[250px]/card:w-32" />
							</CardTitle>
						</CardHeader>
					</Card>
				))}
			</div>

			<div className="rounded-md border bg-white shadow-sm">
				<Table>
					<TableHeader className="bg-slate-100">
						<TableRow>
							{tableColumns.map(column => (
								<TableHead
									className="font-semibold"
									key={column || 'acciones'}
								>
									<Skeleton className="h-6 w-48" />
								</TableHead>
							))}
						</TableRow>
					</TableHeader>
					<TableBody>
						{Array.from({ length: 5 }).map((_, index) => (
							<TableRow key={index}>
								<TableCell className="flex flex-col gap-2">
									<Skeleton className="h-4 w-36" />
									<Skeleton className="h-3 w-24" />
									<Skeleton className="h-3 w-40" />
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-3">
										<Skeleton className="h-6 w-6 rounded-full" />
										<div className="flex flex-col gap-1">
											<Skeleton className="h-4 w-28" />
											<Skeleton className="h-3 w-24" />
											<Skeleton className="h-3 w-20" />
										</div>
									</div>
								</TableCell>
								<TableCell>
									<div className="flex items-center gap-3">
										<Skeleton className="h-6 w-6 rounded-full" />
										<div className="flex flex-col gap-1">
											<Skeleton className="h-4 w-28" />
											<Skeleton className="h-3 w-24" />
											<Skeleton className="h-3 w-20" />
										</div>
									</div>
								</TableCell>
								<TableCell>
									<Skeleton className="h-6 w-24 rounded-full" />
								</TableCell>
								<TableCell>
									<Skeleton className="h-10 w-32 rounded-md" />
								</TableCell>
								<TableCell>
									<div className="flex justify-end">
										<Skeleton className="h-8 w-8 rounded-md" />
									</div>
								</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</div>
		</div>
	)
}

export default HomeSkeleton
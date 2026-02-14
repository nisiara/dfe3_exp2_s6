import { IconChartLine, IconListDetails } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { fetchAllTravels } from '@/lib/api'
import TravelFilter from './TravelFilter'
import TravelList from './TravelList'
import { Card, CardContent, CardHeader } from './ui/card'
import { Spinner } from './ui/spinner'

const TravelSummary = dynamic(() => import('./TravelSummary'), {
	loading: () => <Spinner />,
	ssr: true
})

type Props = {
	searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}

const TravelManager = async ({ searchParams }: Props) => {
	const params = await searchParams

	const rawState = Array.isArray(params.estado) ? params.estado[0] : params.estado
	const state = rawState ?? ''

	const travels = await fetchAllTravels('todos')
	const filteredTravels = await fetchAllTravels(state)

	return (
		<div>
			<Card>
				<CardHeader className="flex items-center gap-2">
					<IconChartLine className="size-5" />
					<h2 className="text-md font-bold uppercase">Resumen Viajes</h2>
				</CardHeader>
				<CardContent>
					<TravelSummary travels={travels} />
				</CardContent>
			</Card>
			<Card className="mt-4">
				<CardHeader className="flex items-center gap-2">
					<IconListDetails className="size-5" />
					<h2 className="text-md font-bold uppercase">Lista de Viajes</h2>
				</CardHeader>
				<CardContent>
					<TravelFilter state={state} />
					<TravelList travels={filteredTravels} />
				</CardContent>
			</Card>
		</div>
	)
}

export default TravelManager

import TableTravels from '@/components/table-travels'
import { fetchTravels } from '@/lib/api'

export default async function ListTravels() {
	const travels = await fetchTravels()
	const filteredTravels = travels.filter(
		(travel, index, arr) => arr.findIndex(t => t.id === travel.id) === index
	)
	return <TableTravels initialTravels={filteredTravels} />
}

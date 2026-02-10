import TableTravels from '@/components/table-travels'
import { fetchAllTravels } from '@/lib/api'

export default async function ListTravels() {
	const travels = await fetchAllTravels()
	const travelList = travels.filter(
		(travel, index, arr) => arr.findIndex(t => t.id === travel.id) === index
	)
	return <TableTravels initialTravels={travelList} />
}

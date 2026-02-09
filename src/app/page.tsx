import { SectionCards } from '@/components/sections-cards'
import { fetchTravels } from '@/lib/api'

export default async function Page() {
	const travels = await fetchTravels()
	const viajesEnProceso = travels.filter(travel => travel.estado === 'en proceso')
	const viajesFinalizados = travels.filter(travel => travel.estado === 'finalizado')
	const viajesConfirmados = travels.filter(travel => travel.estado === 'confirmado')

	return (
		<SectionCards
			viajesFinalizados={viajesFinalizados}
			viajesConfirmados={viajesConfirmados}
			viajesEnProceso={viajesEnProceso}
		/>
	)
}

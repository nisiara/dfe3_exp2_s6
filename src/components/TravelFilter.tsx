'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'

const estados = {
	todos: 'todos',
	enProceso: 'en proceso',
	confirmado: 'confirmado',
	finalizado: 'finalizado'
} as const


interface TravelFilterProps {
	state?: string // Permitimos string para evitar conflictos con la URL
}

const TravelFilter = ({ state }: TravelFilterProps) => {
	const router = useRouter()
	const searchParams = useSearchParams()

	const opcionesDeEstado = Object.values(estados)

	function handleFilterChange(term: string) {
		const params = new URLSearchParams(searchParams.toString())
		if (term && term !== 'todos') {
			params.set('estado', term)
		} else {
			params.delete('estado')
		}
		// Esto "navega" a la misma página pero con nuevos parámetros
		// Next.js NO recarga la página completa, solo refresca los Server Components
		router.push(`?${params.toString()}`)
	}
	return (
		<div className="mb-4 w-64">
			<Combobox
				items={opcionesDeEstado}
				value={state || 'todos'}
				onValueChange={value => handleFilterChange((value as string) || '')}
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
		// <input
		//   onChange={(e) => handleFilterChange(e.target.value)}
		//   placeholder="Filtrar por destino..."
		//   defaultValue={searchParams.get('destination') || ''}
		// />
	)
}

export default TravelFilter

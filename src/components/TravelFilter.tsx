'use client'
import { useRouter, useSearchParams } from 'next/navigation'
import { useEffect, useState, useTransition } from 'react'
import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'
import { Spinner } from '@/components/ui/spinner'

const states = {
	todos: 'todos',
	enProceso: 'en proceso',
	confirmado: 'confirmado',
	finalizado: 'finalizado'
} as const

interface Props {
	state?: string
}

const TravelFilter = ({ state }: Props) => {
	const router = useRouter()
	const searchParams = useSearchParams()
	const [selectedState, setSelectedState] = useState(state || 'todos')
	const [isPending, startTransition] = useTransition()

	const stateList = Object.values(states)

	useEffect(() => {
		setSelectedState(state || 'todos')
	}, [state])

	function handleFilterChange(term: string) {
		const nextState = term && term !== 'todos' ? term : 'todos'
		setSelectedState(nextState)

		startTransition(() => {
			const params = new URLSearchParams(searchParams.toString())
			if (term && term !== 'todos') {
				params.set('estado', term)
			} else {
				params.delete('estado')
			}
			router.push(`?${params.toString()}`)
		})
	}
	return (
		<div className="relative mb-4 flex items-center gap-2">
			<div className="w-64">
				<Combobox
					items={stateList}
					value={selectedState}
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
			{isPending && (
				<div className="fixed inset-0 z-50 flex items-center justify-center bg-background/60 backdrop-blur-sm">
					<Spinner className="size-5 text-slate-500" />
				</div>
			)}
		</div>
	)
}

export default TravelFilter

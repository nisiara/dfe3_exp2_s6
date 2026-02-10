import {
	Combobox,
	ComboboxContent,
	ComboboxEmpty,
	ComboboxInput,
	ComboboxItem,
	ComboboxList
} from '@/components/ui/combobox'

const estados = ['Todos', 'En Proceso', 'Confirmado', 'Finalizado'] as const

interface FilterTravelsProps {
	setSelectedStatus: (status: string) => void
}

export default function FilterTravels({ setSelectedStatus }: FilterTravelsProps) {
	return (
		<div className="mb-4 w-64">
			<Combobox
				items={estados}
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
	)
}

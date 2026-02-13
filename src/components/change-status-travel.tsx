import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import type { Travel } from '@/lib/api'

interface ChangeStatusTravelProps {
	travel: Travel
	handleStatusChange: (travelId: string, newStatus: Travel['estado']) => void
}

export default function ChangeStatusTravel({
	travel,
	handleStatusChange
}: ChangeStatusTravelProps) {
	return (
		<ToggleGroup
			type="single"
			size="sm"
			value={travel.estado || 'en proceso'}
			onValueChange={value => handleStatusChange(travel.id, value as Travel['estado'])}
			variant="outline"
		>
			<ToggleGroupItem
				className="text-xs p-1"
				value="en proceso"
				aria-label="Toggle en proceso"
			>
				En Proceso
			</ToggleGroupItem>
			<ToggleGroupItem
				className="text-xs py-1"
				value="confirmado"
				aria-label="Toggle confirmado"
			>
				Confirmado
			</ToggleGroupItem>
			<ToggleGroupItem
				className="text-xs p-1"
				value="finalizado"
				aria-label="Toggle finalizado"
			>
				Finalizado
			</ToggleGroupItem>
		</ToggleGroup>
	)
}

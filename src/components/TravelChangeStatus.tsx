'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { updateTravelStatus } from '@/lib/api'
import type { Travel } from '@/lib/types'

interface Props {
	travel: Travel
}

const TravelChangeStatus = ({ travel }: Props) => {
	const router = useRouter()
	const [currentStatus, setCurrentStatus] = useState<Travel['estado']>(
		travel.estado || 'en proceso'
	)
	const [isUpdating, setIsUpdating] = useState(false)

	async function handleChangeStatus(value: string) {
		const nextStatus = value as Travel['estado']

		if (!nextStatus || nextStatus === currentStatus || isUpdating) {
			return
		}

		try {
			setIsUpdating(true)
			await updateTravelStatus(travel.id, nextStatus)
			setCurrentStatus(nextStatus)
			router.refresh()
		} catch (error) {
			console.error('No se pudo actualizar el estado del viaje', error)
		} finally {
			setIsUpdating(false)
		}
	}

	return (
		<ToggleGroup
			type="single"
			size="sm"
			value={currentStatus}
			onValueChange={handleChangeStatus}
			variant="outline"
			disabled={isUpdating}
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

export default TravelChangeStatus

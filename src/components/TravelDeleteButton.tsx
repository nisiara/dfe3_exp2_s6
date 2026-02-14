'use client'

import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { IconTrashX } from '@tabler/icons-react'
import { Button } from '@/components/ui/button'
import { deleteTravel } from '@/lib/api'
import TravelDeleteConfirmation from './TravelDeleteConfirmation'

interface TravelDeleteButtonProps {
	travelId: string
}

const TravelDeleteButton = ({ travelId }: TravelDeleteButtonProps) => {
	const router = useRouter()
	const [isDeleting, setIsDeleting] = useState(false)

	async function handleDelete() {
		if (isDeleting) return
		try {
			setIsDeleting(true)
			await deleteTravel(travelId)
			router.refresh()
		} catch (error) {
			console.error('No se pudo eliminar el viaje', error)
			throw error
		} finally {
			setIsDeleting(false)
		}
	}

	return (
		<TravelDeleteConfirmation
			onConfirm={handleDelete}
			isProcessing={isDeleting}
			trigger={
				<Button
					variant="outline"
					size="icon"
					disabled={isDeleting}
				>
					<IconTrashX className="size-5" />
				</Button>
			}
		/>
	)
}

export default TravelDeleteButton

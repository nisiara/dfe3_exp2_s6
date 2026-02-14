'use client'

import { IconTrashX } from '@tabler/icons-react'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Spinner } from '@/components/ui/spinner'
import { deleteTravel } from '@/lib/api'

const TravelDeleteConfirmation = dynamic(() => import('./TravelDeleteConfirmation'), {
	loading: () => <Spinner />,
	ssr: false
})

interface Props {
	travelId: string
}

const TravelDeleteButton = ({ travelId }: Props) => {
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

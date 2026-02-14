'use client'

import { type ReactNode, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogClose,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger
} from '@/components/ui/dialog'

type Props = {
	trigger: ReactNode
	onConfirm: () => Promise<void> | void
	isProcessing?: boolean
	title?: string
	description?: string
	confirmLabel?: string
	cancelLabel?: string
}

const TravelDeleteConfirmation = ({
	trigger,
	onConfirm,
	isProcessing = false,
	title = 'Eliminar viaje',
	description = 'Esta acción no se puede deshacer y eliminará permanentemente este viaje.',
	confirmLabel = 'Eliminar',
	cancelLabel = 'Cancelar'
}: Props) => {
	const [open, setOpen] = useState(false)

	async function handleConfirm() {
		try {
			await onConfirm()
			setOpen(false)
		} catch (error) {
			console.error('Error al confirmar la eliminación', error)
		}
	}

	return (
		<Dialog
			open={open}
			onOpenChange={setOpen}
		>
			<DialogTrigger asChild>{trigger}</DialogTrigger>
			<DialogContent className="sm:max-w-sm">
				<DialogHeader>
					<DialogTitle>{title}</DialogTitle>
					<DialogDescription>{description}</DialogDescription>
				</DialogHeader>
				<DialogFooter>
					<DialogClose asChild>
						<Button
							type="button"
							variant="outline"
							disabled={isProcessing}
						>
							{cancelLabel}
						</Button>
					</DialogClose>
					<Button
						type="button"
						variant="destructive"
						onClick={handleConfirm}
						disabled={isProcessing}
					>
						{isProcessing ? 'Eliminando...' : confirmLabel}
					</Button>
				</DialogFooter>
			</DialogContent>
		</Dialog>
	)
}

export default TravelDeleteConfirmation

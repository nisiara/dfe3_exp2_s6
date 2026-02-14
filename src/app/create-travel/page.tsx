import { Suspense } from 'react'
import CreateTravelSkeleton from '@/components/skeletons/CreateTravelSkeleton'
import TravelCreateForm from '@/components/TravelCreateForm'

async function TravelCreateNewWithDelay() {
	await new Promise(resolve => setTimeout(resolve, 5000))
	return <TravelCreateForm />
}

export default function CreateTravel() {
	return (
		<Suspense fallback={<CreateTravelSkeleton />}>
			<TravelCreateNewWithDelay />
		</Suspense>
	)
}

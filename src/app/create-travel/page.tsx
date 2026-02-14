import { Suspense } from 'react'
import CreateTravelSkeleton from '@/components/skeletons/CreateTravelSkeleton'
import TravelCreateNew from '@/components/TravelCreateNew'

async function TravelCreateNewWithDelay() {
	await new Promise(resolve => setTimeout(resolve, 5000))
	return <TravelCreateNew />
}

export default function CreateTravel() {
	return (
		<Suspense fallback={<CreateTravelSkeleton />}>
			<TravelCreateNewWithDelay />
		</Suspense>
	)
}

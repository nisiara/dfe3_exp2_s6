import { Suspense } from 'react'
import HomeSkeleton from '@/components/skeletons/HomeSkeleton'
import TravelManager from '@/components/TravelManager'

type RouteSearchParams = Record<string, string | string[] | undefined>

async function DelayTravelManager({ searchParams }: { searchParams: RouteSearchParams }) {
	await new Promise(resolve => setTimeout(resolve, 3000))
	return <TravelManager searchParams={Promise.resolve(searchParams)} />
}

export default function Page({ searchParams }: { searchParams: RouteSearchParams }) {
	return (
		<Suspense fallback={<HomeSkeleton />}>
			<DelayTravelManager searchParams={searchParams} />
		</Suspense>
	)
}

import TravelManager from '@/components/TravelManager'

export default function Page({
	searchParams
}: {
	searchParams: Record<string, string | string[] | undefined>
}) {
	return <TravelManager searchParams={searchParams} />
}

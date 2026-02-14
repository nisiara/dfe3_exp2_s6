import TravelManager from '@/components/TravelManager'

export default async function Page({
	searchParams
}: {
	searchParams: Promise<Record<string, string | string[] | undefined>>
}) {
	return <TravelManager searchParams={searchParams} />
}

import { Card, CardContent, CardHeader } from '@/components/ui/card'
import { Field, FieldGroup, FieldSeparator, FieldSet } from '@/components/ui/field'
import { Skeleton } from '@/components/ui/skeleton'

const clientFields = ['RUT', 'Full Name', 'Email Address']

const travelRadioOptions = ['Turismo', 'Negocio', 'Otro']

const CreateTravelSkeleton = () => {
	return (
		<div className="w-full max-w-md">
			<Card>
				<CardHeader className="flex items-center gap-2">
					<Skeleton className="h-6 w-6 rounded-md" />
					<Skeleton className="h-4 w-40" />
				</CardHeader>
				<CardContent>
					<FieldGroup className="gap-6">
						<FieldSet>
							<Skeleton className="h-6 w-48" />

							<FieldGroup className="gap-4 rounded-md border border-slate-200 p-5">
								{clientFields.map(label => (
									<Field
										className="gap-1"
										key={label}
									>
										<Skeleton className="h-4 w-24" />
										<Skeleton className="h-10 w-full rounded-md" />
									</Field>
								))}
							</FieldGroup>
						</FieldSet>

						<FieldSet>
							<Skeleton className="h-6 w-48" />
							<FieldGroup className="gap-5 rounded-md border border-slate-200 p-5">
								<Skeleton className="h-6 w-48" />
								<div className="max-w-sm space-y-3">
									{travelRadioOptions.map(option => (
										<div
											className="flex items-center justify-between rounded-md border border-dashed border-slate-200 px-3 py-2"
											key={option}
										>
											<div className="text-xs text-slate-500">
												<Skeleton className="h-4 w-24" />
											</div>
											<Skeleton className="h-4 w-4 rounded-full" />
										</div>
									))}
								</div>
							</FieldGroup>

							<FieldGroup className="mt-4 gap-4 rounded-md border border-slate-200 p-5">
								<Skeleton className="h-6 w-48" />
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-full rounded-md" />
								</Field>
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-32 rounded-md" />
								</Field>
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-32 rounded-md" />
								</Field>
							</FieldGroup>

							<FieldGroup className="mt-4 gap-4 rounded-md border border-slate-200 p-5">
								<Skeleton className="h-6 w-48" />
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-full rounded-md" />
								</Field>
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-32 rounded-md" />
								</Field>
								<Field className="gap-1">
									<Skeleton className="h-4 w-16" />
									<Skeleton className="h-10 w-32 rounded-md" />
								</Field>
							</FieldGroup>
						</FieldSet>

						<FieldSeparator />

						<Field orientation="horizontal">
							<Skeleton className="h-10 w-40 rounded-md" />
						</Field>
					</FieldGroup>
				</CardContent>
			</Card>
		</div>
	)
}

export default CreateTravelSkeleton

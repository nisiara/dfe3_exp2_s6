'use client'

import { IconPencilPlus } from '@tabler/icons-react'
import { format } from 'date-fns'
import { ChevronDownIcon } from 'lucide-react'
import React, { useState } from 'react'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
	Field,
	FieldContent,
	FieldDescription,
	FieldGroup,
	FieldLabel,
	FieldLegend,
	FieldSeparator,
	FieldSet,
	FieldTitle
} from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue
} from '@/components/ui/select'
import { Toaster } from '@/components/ui/sonner'
import { createTravel } from '@/lib/api'
import { Card, CardContent, CardHeader } from './ui/card'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'

const TravelCreateForm = () => {
	const [dataForm, setDataForm] = useState({
		rut: '',
		fullName: '',
		email: '',
		tipoViaje: '',
		origen: '',
		horaSalida: '',
		destino: '',
		horaRegreso: ''
	})

	const validationPatterns = {
		rut: /^\d{1,2}\.\d{3}\.\d{3}-[\dkK]$/,
		fullName: /^[a-zA-ZÀ-ÿ\s]{5,}$/,
		email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
		origen: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
		destino: /^[a-zA-ZÀ-ÿ\s]{3,}$/,
		tipoViaje: /^(turismo|negocio|otro)$/,
		fechaSalida: /^\d{2}-\d{2}-\d{4}$/,
		horaSalida: /^([01]\d|2[0-3]):([0-5]\d)$/,
		fechaRegreso: /^\d{2}-\d{2}-\d{4}$/,
		horaRegreso: /^([01]\d|2[0-3]):([0-5]\d)$/
	}

	const [validationInput, setValidationInput] = useState({
		rut: false,
		fullName: false,
		email: false,
		tipoViaje: false,
		origen: false,
		horaSalida: false,
		destino: false,
		horaRegreso: false
	})

	const isFormValid = Object.values(validationInput).every(isValid => isValid === true)

	//type BackendError = { errors?: Array<{ field: string; message: string }> }
	const [errorData, setErrorData] = useState<Array<{ field: string; message: string }>>([])

	const [openSalida, setOpenSalida] = React.useState(false)
	const [openRegreso, setOpenRegreso] = React.useState(false)
	const [dateSalida, setDateSalida] = React.useState<Date | undefined>(undefined)
	const [dateRegreso, setDateRegreso] = React.useState<Date | undefined>(undefined)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
		const { name, value } = e.target
		setDataForm(prev => ({ ...prev, [name]: value }))
		// Validación
		let isValid = true
		if (validationPatterns[name as keyof typeof validationPatterns]) {
			isValid = validationPatterns[name as keyof typeof validationPatterns].test(value)
		}
		setValidationInput(prev => ({ ...prev, [name]: isValid }))
	}

	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()

		try {
			const formatDate = (date: Date | undefined) => {
				if (!date) return ''
				const day = String(date.getDate()).padStart(2, '0')
				const month = String(date.getMonth() + 1).padStart(2, '0')
				const year = String(date.getFullYear())
				return `${day}-${month}-${year}`
			}
			await createTravel({
				rut: dataForm.rut,
				fullName: dataForm.fullName,
				email: dataForm.email,
				origen: dataForm.origen,
				fechaSalida: formatDate(dateSalida),
				horaSalida: dataForm.horaSalida,
				destino: dataForm.destino,
				fechaRegreso: formatDate(dateRegreso),
				horaRegreso: dataForm.horaRegreso,
				tipoViaje: dataForm.tipoViaje
			})
			setDataForm({
				rut: '',
				fullName: '',
				email: '',
				tipoViaje: '',
				origen: '',
				horaSalida: '',
				destino: '',
				horaRegreso: ''
			})
			setDateSalida(undefined)
			setDateRegreso(undefined)
			setValidationInput({
				rut: false,
				fullName: false,
				email: false,
				tipoViaje: false,
				origen: false,
				horaSalida: false,
				destino: false,
				horaRegreso: false
			})
			const hora = new Date().toLocaleTimeString()
			toast.success(`El registro se ha creado de manera exitosa. Hora: ${hora}`)
		} catch (error) {
			// Procesa errores del backend
			console.log('Error recibido del backend:', error)
			console.log(
				'Errores extraídos:',
				(error as { errors?: Array<{ field: string; message: string }> }).errors
			)
			setErrorData((error as { errors?: Array<{ field: string; message: string }> }).errors || [])
			toast.error('Errores de validación en el registro')
		} finally {
			// setLoading(false)
		}
	}

	return (
		<>
			<Toaster
				position="top-center"
				richColors
				closeButton
			/>
			<div className="w-full max-w-md">
				<Card>
					<CardHeader className="flex items-center gap-2">
						<IconPencilPlus className="size-5" />
						<h2 className="text-md font-bold uppercase">Crear Registro</h2>
					</CardHeader>
					<CardContent>
						<form
							onSubmit={handleSubmit}
							noValidate
						>
							<FieldGroup>
								<FieldSet>
									<FieldLegend className="text-lg font-bold">Información del cliente</FieldLegend>
									<FieldGroup className="border-solid border border-slate-200 p-5 rounded-md gap-4">
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="rut"
											>
												RUT
											</FieldLabel>
											<Input
												id="rut"
												name="rut"
												placeholder="12.345.678-9"
												required
												value={dataForm.rut}
												onChange={handleChange}
												aria-invalid={!validationInput.rut && dataForm.rut !== ''}
											/>
											{errorData.find(e => e.field === 'rut') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'rut')?.message}
												</small>
											)}
										</Field>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="fullName"
											>
												Full Name
											</FieldLabel>
											<Input
												id="fullName"
												name="fullName"
												required
												value={dataForm.fullName}
												onChange={handleChange}
												aria-invalid={!validationInput.fullName && dataForm.fullName !== ''}
											/>
											{errorData.find(e => e.field === 'fullName') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'fullName')?.message}
												</small>
											)}
										</Field>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="email"
											>
												Email Address
											</FieldLabel>
											<Input
												id="email"
												name="email"
												type="email"
												placeholder="usuario@ejemplo.com"
												required
												value={dataForm.email}
												onChange={handleChange}
												aria-invalid={!validationInput.email && dataForm.email !== ''}
											/>
											{errorData.find(e => e.field === 'email') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'email')?.message}
												</small>
											)}
										</Field>
									</FieldGroup>
								</FieldSet>

								<FieldSet>
									<FieldLegend className="text-lg font-bold">Información del Viaje</FieldLegend>
									<FieldGroup className="border-solid border border-slate-200 p-5 rounded-md">
										<FieldDescription>Tipo de viaje</FieldDescription>
										<RadioGroup
											value={dataForm.tipoViaje}
											onValueChange={value =>
												handleChange({
													target: { name: 'tipoViaje', value }
												} as React.ChangeEvent<HTMLInputElement>)
											}
											className="max-w-sm"
										>
											<FieldLabel htmlFor="turismo-plan">
												<Field orientation="horizontal">
													<FieldContent>
														<FieldTitle className="text-xs">Turismo</FieldTitle>
													</FieldContent>
													<RadioGroupItem
														value="turismo"
														id="turismo-plan"
													/>
												</Field>
											</FieldLabel>
											<FieldLabel htmlFor="negocio-plan">
												<Field orientation="horizontal">
													<FieldContent>
														<FieldTitle className="text-xs">Negocio</FieldTitle>
													</FieldContent>
													<RadioGroupItem
														value="negocio"
														id="negocio-plan"
													/>
												</Field>
											</FieldLabel>
											<FieldLabel htmlFor="otro-plan">
												<Field orientation="horizontal">
													<FieldContent>
														<FieldTitle className="text-xs">Otro</FieldTitle>
													</FieldContent>
													<RadioGroupItem
														value="otro"
														id="otro-plan"
													/>
												</Field>
											</FieldLabel>
										</RadioGroup>
										{errorData.find(e => e.field === 'tipoViaje') && (
											<small className="text-red-700 text-xs">
												{errorData.find(e => e.field === 'tipoViaje')?.message}
											</small>
										)}
									</FieldGroup>

									<FieldGroup className="border-solid border border-slate-200 p-5 rounded-md">
										<FieldDescription>Origen</FieldDescription>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="origen"
											>
												Ciudad de Origen
											</FieldLabel>
											<Select
												value={dataForm.origen}
												onValueChange={value =>
													handleChange({
														target: { name: 'origen', value }
													} as React.ChangeEvent<HTMLInputElement>)
												}
												aria-invalid={!validationInput.origen && dataForm.origen !== ''}
											>
												<SelectTrigger>
													<SelectValue placeholder="Elige el origen" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Origen</SelectLabel>
														<SelectItem value="madrid">Madrid</SelectItem>
														<SelectItem value="viena">Viena</SelectItem>
														<SelectItem value="budapest">Budapest</SelectItem>
														<SelectItem value="republica checa">Republica Checa</SelectItem>
														<SelectItem value="berlin">Berlin</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											{errorData.find(e => e.field === 'origen') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'origen')?.message}
												</small>
											)}
										</Field>

										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="fecha-salida"
											>
												Fecha Viaje
											</FieldLabel>
											<Popover
												open={openSalida}
												onOpenChange={setOpenSalida}
											>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														id="fecha"
														className="w-32 justify-between font-normal"
													>
														{dateSalida ? format(dateSalida, 'PPP') : 'Elige la fecha'}
														<ChevronDownIcon />
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto overflow-hidden p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={dateSalida}
														captionLayout="dropdown"
														defaultMonth={dateSalida}
														onSelect={date => {
															setDateSalida(date)
															setOpenSalida(false)
														}}
													/>
												</PopoverContent>
											</Popover>
											{errorData.find(e => e.field === 'fechaSalida') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'fechaSalida')?.message}
												</small>
											)}
										</Field>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="horaSalida"
											>
												Hora
											</FieldLabel>
											<Input
												type="time"
												id="horaSalida"
												name="horaSalida"
												step="60"
												value={dataForm.horaSalida}
												onChange={handleChange}
												aria-invalid={!validationInput.horaSalida && dataForm.horaSalida !== ''}
												className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
											/>
											{errorData.find(e => e.field === 'horaSalida') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'horaSalida')?.message}
												</small>
											)}
										</Field>
									</FieldGroup>

									<FieldGroup className="border-solid border border-slate-200 p-5 rounded-md">
										<FieldDescription>Destino</FieldDescription>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="destino"
											>
												Ciudad de Destino
											</FieldLabel>
											<Select
												value={dataForm.destino}
												onValueChange={value =>
													handleChange({
														target: { name: 'destino', value }
													} as React.ChangeEvent<HTMLInputElement>)
												}
												aria-invalid={!validationInput.destino && dataForm.destino !== ''}
											>
												<SelectTrigger>
													<SelectValue placeholder="Elige el destino" />
												</SelectTrigger>
												<SelectContent>
													<SelectGroup>
														<SelectLabel>Destino</SelectLabel>
														<SelectItem value="madrid">Madrid</SelectItem>
														<SelectItem value="viena">Viena</SelectItem>
														<SelectItem value="budapest">Budapest</SelectItem>
														<SelectItem value="republica checa">Republica Checa</SelectItem>
														<SelectItem value="berlin">Berlin</SelectItem>
													</SelectGroup>
												</SelectContent>
											</Select>
											{errorData.find(e => e.field === 'destino') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'destino')?.message}
												</small>
											)}
										</Field>

										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="fecha-regreso"
											>
												Fecha Regreso
											</FieldLabel>
											<Popover
												open={openRegreso}
												onOpenChange={setOpenRegreso}
											>
												<PopoverTrigger asChild>
													<Button
														variant="outline"
														id="fecha"
														className="w-32 justify-between font-normal"
													>
														{dateRegreso ? format(dateRegreso, 'PPP') : 'Elige la fecha'}
														<ChevronDownIcon />
													</Button>
												</PopoverTrigger>
												<PopoverContent
													className="w-auto overflow-hidden p-0"
													align="start"
												>
													<Calendar
														mode="single"
														selected={dateRegreso}
														captionLayout="dropdown"
														defaultMonth={dateRegreso}
														onSelect={date => {
															setDateRegreso(date)
															setOpenRegreso(false)
														}}
													/>
												</PopoverContent>
											</Popover>
											{errorData.find(e => e.field === 'fechaRegreso') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'fechaRegreso')?.message}
												</small>
											)}
										</Field>
										<Field className="gap-1">
											<FieldLabel
												className="text-xs"
												htmlFor="horaRegreso"
											>
												Hora
											</FieldLabel>
											<Input
												type="time"
												id="horaRegreso"
												name="horaRegreso"
												step="60"
												value={dataForm.horaRegreso}
												onChange={handleChange}
												aria-invalid={!validationInput.horaRegreso && dataForm.horaRegreso !== ''}
												className="bg-background appearance-none [&::-webkit-calendar-picker-indicator]:hidden [&::-webkit-calendar-picker-indicator]:appearance-none"
											/>
											{errorData.find(e => e.field === 'horaRegreso') && (
												<small className="text-red-700 text-xs">
													{errorData.find(e => e.field === 'horaRegreso')?.message}
												</small>
											)}
										</Field>
									</FieldGroup>
								</FieldSet>

								<FieldSeparator />

								<Field orientation="horizontal">
									<Button
										type="submit"
										disabled={!isFormValid}
									>
										Registrar Viaje
									</Button>
								</Field>
							</FieldGroup>
						</form>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

export default TravelCreateForm

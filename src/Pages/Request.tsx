import { useEffect, useState } from 'react'
import React from 'react'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { axiosAuth as axios, notification } from '../Utils'
import { API } from '../../config/config'
import styled from 'styled-components'
import RequestInstitutionCard from '../Components/Cards/RequestInstitution.card'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import Autocomplete from "@mui/material/Autocomplete"
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import MainLayout from '../Layouts/Main.layout'
import LoadingButton from '@mui/lab/LoadingButton'
import { themeColor } from '../Utils/colors'
import ImageOutlinedIcon from '@mui/icons-material/ImageOutlined'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  margin-bottom: 30px;
`

const Spacer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
`

const cities = [{ label: "Алматы" }, { label: "Астана" }, { label: "Шымкент" }]

export default function Request() {
	// Setups
	const isAuthenticated = useIsAuthenticated()
	const authStateUser = useAuthUser()
	const navigate = useNavigate()
	const user = authStateUser() || {}

	// States
	const [file, setFile] = useState(undefined)
	const [title, setTitle] = useState('')
	const [description, setDescription] = useState('')
	const [link, setLink] = useState('')
	const [address, setAddress] = useState('')
	const [city, setCity] = useState('')
	const [uploadingState, setUploadingState] = useState(false)
	const [open, setOpen] = useState(false)
	const [requests, setRequests] = useState([])

	// Handlers
	const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setTitle(event.target.value)
	}
	const handleDescriptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setDescription(event.target.value)
	}
	const handleLinkChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setLink(event.target.value)
	}
	const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setAddress(event.target.value)
	}

	// Functions
	const closeAlert = () => {
		setOpen(false)
		window.location.reload()
	}

	async function fetchRequests() {
		notification.custom.promise(axios.post(`${API.baseURL}/institutions/request/find`, { query: {} })
			.then((response) => {
				if (!response.data.err) {
					setRequests(response.data)
				} else {
					notification.custom.error(response.data.err)
				}
			}))

	}

	const sendRequest = async () => {
		if (isFormValid()) {
			setUploadingState(true)
			const formData = new FormData
			formData.append("title", title)
			formData.append("description", description)
			formData.append("link", link)
			formData.append("address", address)
			formData.append("userRequestID", user._id)
			formData.append("image", file!)
			formData.append("city", city)

			axios.post(`${API.baseURL}/institutions/request/new`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
				.then((response) => {
					if (!response.data.err) {
						setOpen(true)
						setUploadingState(false)
					} else {
						setOpen(false)
						setUploadingState(false)
						notification.custom.error(response.data.err)
					}
				})
		}
	}

	function checkImage() {
		if (file == undefined) {
			return ''
		} else {
			return URL.createObjectURL(file)
		}
	}

	function isFormValid() {
		if (title == '' || description == '' || city == '' || address == '' || link == '') {
			notification.custom.error('Заполните все поля!')
			return false
		}
		if (link.includes('https') || link.includes('http')) {
			return true
		} else {
			notification.custom.error('Неверная ссылка')
			return false
		}
	}


	useEffect(() => {
		if (isAuthenticated()) {
			fetchRequests()
		} else {
			navigate('/login')
		}
	}, [])
	return (
		<MainLayout>
			<Dialog open={open} onClose={closeAlert}>
				<DialogContent>
					<DialogContentText>
						{'Вы отправили свой запрос на добавление нового заведения в список. В течении некоторого времени, модераторы рассмотрят ваш запрос'}
					</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button onClick={closeAlert} autoFocus>
						ОК
					</Button>
				</DialogActions>
			</Dialog>
			<div style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
				<div className='mb-1 mt-2 mx-2 rounded-2xl' style={{ backgroundColor: themeColor[2], maxWidth: '500px' }}>
					<div>
						<p className='ml-1 pt-4 px-4'>Запрос на добавление заведения</p>
						{checkImage() &&
							<div className='pt-2 mt-2 mb-2' style={{ height: 360, objectFit: 'cover', overflow: 'hidden' }}>
								<img src={checkImage()} />
							</div>}
						<Box sx={{ display: 'flex', flexDirection: 'column' }} className='mt-2 px-4'>
							<TextField
								InputLabelProps={{ shrink: true }}
								margin="normal"
								required
								id="input-title"
								label="Название"
								placeholder='Ресторан "Открытый"'
								onChange={handleTitleChange} />
							<TextField
								InputLabelProps={{ shrink: true }}
								margin="normal"
								required
								id="input-description"
								label="Описание"
								multiline
								placeholder='Очень крутое заведение...'
								onChange={handleDescriptionChange} />
							<Autocomplete
								disablePortal
								options={cities}
								onInputChange={(event, newInputValue) => { setCity(newInputValue) }}
								fullWidth
								className='mt-3 w-full'
								renderInput={(params) => <> <TextField
									InputLabelProps={{ shrink: true }}
									required
									{...params}
									label="Город" /> </>} />
							<TextField
								InputLabelProps={{ shrink: true }}
								margin="normal"
								required
								id="input-address"
								label="Адрес"
								placeholder='Мкр. Алтын 77'
								onChange={handleAddressChange} />
							<TextField
								InputLabelProps={{ shrink: true }}
								margin="normal"
								required
								id="input-link"
								placeholder='https://...'
								label="Ссылка на метку в карте"
								onChange={handleLinkChange} />
						</Box>
					</div>
					<div className='flex justify-between mt-3 flex-row px-4 pb-4'>
						<div className='flex flex-row'>
							<LoadingButton
								loading={uploadingState}
								onClick={sendRequest}
								variant='outlined'
								sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center' }}
								loadingIndicator="Загрузка...">
								Запросить
							</LoadingButton>
							<Button
								variant='outlined'
								sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px', marginLeft: 1, border: 1 }}
								className='flex justify-center items-center'
								component='label'>
								<ImageOutlinedIcon sx={{ marginRight: 0.3 }} /> {' Добавить изображение'}
								<input
									type="file"
									accept='image/png, image/jpeg, image/jpg'
									data-filename={file}
									onChange={(event) => { setFile(event.target.files[0]) }}
									hidden />
							</Button>
						</div>
					</div>
				</div>
			</div>
			<Wrapper style={{ display: 'flex', justifyContent: 'center', flexDirection: 'column', marginBottom: 100 }}>
				{requests.map(({ title, address, description, link, imagePath, city }, index) => (
					<Spacer key={index}>
						<RequestInstitutionCard name={title} address={address} description={description} link={link} imagePath={imagePath} city={city} />
					</Spacer>
				))}
			</Wrapper>
		</MainLayout>
	)
}
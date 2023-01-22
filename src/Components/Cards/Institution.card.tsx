import React, { useState, useEffect } from 'react'

import { red, yellow, green, grey } from '@mui/material/colors'
import Avatar from '@mui/material/Avatar'
import LoadingButton from '@mui/lab/LoadingButton'
import Typography from '@mui/material/Typography'
import Dialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogContentText from '@mui/material/DialogContentText'
import DialogTitle from '@mui/material/DialogTitle'
import Slider from '@mui/material/Slider'
import TextField from '@mui/material/TextField'
import Divider from '@mui/material/Divider'
import ListItemText from '@mui/material/ListItemText'
import IconButton from '@mui/material/IconButton'
import CommentOutlinedIcon from '@mui/icons-material/CommentOutlined'
import DangerousIcon from '@mui/icons-material/Dangerous'
import WarningAmberIcon from '@mui/icons-material/WarningAmber'
import Diversity1Icon from '@mui/icons-material/Diversity1'
import StarOutlinedIcon from '@mui/icons-material/StarOutlined'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'
import { motion as m } from "framer-motion"

import { themeColor } from '@colors'
import { UserComments_Props, Comments_Props, Comment_Props, InstitutionCard_Props } from '@declarations'
import { API } from '@config'
import { axiosAuth as axios, notification } from '@utils'

function UserComments({ userID, rate, comment }: UserComments_Props) {

	// States
	const [user, setUser] = useState<string>('')

	// Functions
	function getUser() {
		let query = { query: { _id: userID } }
		axios.post(`${API.baseURL}/users/find`, query).then((response) => {
			if (!response.data.err) {
				setUser(response.data.login)
			} else {
				notification.custom.error(response.data.err)
			}
		})
	}
	useEffect(() => {
		getUser()
	}, [])
	return (
		<>
			<div className='flex'>
				<ListItemText
					primary={user + ` - ${rate}`}
					secondary={comment}
				/>
			</div>
			<Divider />
		</>
	)
}

function Comments({ comments, id }: Comments_Props) {
	return (
		<div style={{ width: '100%', maxWidth: '500px', overflowY: 'scroll' }} className='h-full'>
			{comments.map(({ rate, userID, institutionID, content }, index: number) => (
				institutionID == id && <UserComments key={index} userID={userID} rate={rate} comment={content} />
			))}
			<div className='mt-3' style={{ height: 1, width: 1 }}></div>
		</div>
	)
}

export default function InstitutionCard({ userID, id, name, address, status, description, link, imagePath, city }: InstitutionCard_Props) {
	// States
	const [openRateDialog, setRateDialogOpen] = useState<boolean>(false)
	const [showRate, setShowRate] = useState<string>('')
	const [showRateColor, setShowRateColor] = useState<string>('')
	const [comments, setComments] = useState<Array<Comment_Props>>([])
	const [loadingRate, setLoadingRate] = useState<boolean>(false)
	const [rate, setRate] = useState<number>(5)
	const [commentContent, setCommentContent] = useState<string>('')
	const [error, setError] = useState<boolean>(false)
	const [rerender, setRerender] = useState<number>(1)
	const [showComments, setShowComments] = useState<boolean>(false)

	const [classes_showComments, classes_setShowComments] = useState<string>('fixed top-0 bottom-0 left-0 right-0 border-none animate__animated animate__fadeIn')
	const [classes_bottomSheet, classes_setBottomSheet] = useState<string>('relative flex flex-col items-center h-full w-full animate__animated animate__slideInUp')

	// Handlers
	const handleRateChange = (event: Event) => {
		let element = event.target as HTMLInputElement
		setRate(parseInt(element.value))
	}
	const handleCommentChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setCommentContent(event.target.value)
	}

	// Checking if userID exist 
	if (userID == null) {
		localStorage.removeItem('token')
		location.reload()
	}
	function ReRender() {
		setRerender(rerender + 1)
	}

	function addRate() {
		setLoadingRate(true)
		if (commentContent != '') {
			axios.post(`${API.baseURL}/comments/add`, {
				userID: userID,
				institutionID: id,
				content: commentContent,
				rate: rate
			}).then((response) => {
				if (!response.data.err) {
					setRateDialogOpen(false)
					setLoadingRate(false)
					notification.custom.success('Вы успешно оставили свою оценку! Спасибо Вам!')
					ReRender()
				} else {
					notification.custom.error(response.data.err)
				}
			})
		} else {
			setError(true)
			setLoadingRate(false)
		}
	}

	function getComments() {
		axios.post(`${API.baseURL}/comments/get`, {
			query: {
				institutionID: id
			}
		}).then((response) => {
			if (!response.data.err) {
				let comments = response.data
				setComments(comments)
				let sumRate = 0
				let n = 0
				for (let i = 0; i < comments.length; i++) {
					let rate1 = comments[i].rate
					sumRate = sumRate + parseInt(rate1)
					n++
				}
				let average = (Math.ceil(sumRate / n * 10)) / 10
				if (average > 0) {
				} else {
					average = 5
				}
				if (average >= 8) {
					setShowRate(average.toString())
					setShowRateColor(green[800])
				} else if (average >= 6) {
					setShowRate(average.toString())
					setShowRateColor(green[400])
				} else if (average >= 4) {
					setShowRate(average.toString())
					setShowRateColor(yellow[800])
				} else if (average >= 2) {
					setShowRate(average.toString())
					setShowRateColor(red[300])
				} else if (average >= 0) {
					setShowRate(average.toString())
					setShowRateColor(red[800])
				} else {
					setShowRate('X')
					setShowRateColor(grey[50])
				}
			} else {
				notification.custom.error(response.data.err)
			}
		})
	}

	function handleCommentsClose() {
		setTimeout(() => {
			setShowComments(false)
			classes_setShowComments('fixed top-0 bottom-0 left-0 right-0 border-none animate__animated animate__fadeIn')
			classes_setBottomSheet('relative flex flex-col items-center h-full w-full animate__animated animate__slideInUp')
		}, 1000)
		classes_setShowComments('fixed top-0 bottom-0 left-0 right-0 border-none animate__animated animate__fadeOut')
		classes_setBottomSheet('relative flex flex-col items-center h-full w-full animate__animated animate__slideOutDown')
	}

	// Marks for slider
	const marks: Array<{ value: number, label: JSX.Element }> = [
		{
			value: 0,
			label: <DangerousIcon sx={{ color: red[500] }} />,
		},
		{
			value: 5,
			label: <WarningAmberIcon sx={{ color: yellow[400] }} />,
		},
		{
			value: 10,
			label: <Diversity1Icon sx={{ color: green[300] }} />,
		}
	]

	useEffect(() => {
		getComments()
	}, [rerender])

	let style = { display: 'none', zIndex: 500, backgroundColor: 'rgb(0,0,0,0.5)' }
	if (showComments) {
		style.display = 'block'
	} else {
		style.display = 'none'
	}

	return (
		<>
			<m.div key={`${id}`} className='my-1 mx-2 rounded-2xl w-full' style={{ backgroundColor: themeColor[2], maxWidth: '500px' }} initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
				<div className='flex flex-start flex-row items-center p-4 pb-0'>
					<div className='flex rounded-full'>
						<Avatar sx={{ bgcolor: showRateColor }}>{showRate}</Avatar>
					</div>
					<div className='flex flex-col ml-4'>
						<h4 className='' style={{ color: themeColor[11] }}>{name}</h4>
						<p style={{ color: themeColor[11] }}>{status[1]}</p>
					</div>
				</div>
				{imagePath != undefined && imagePath != '' &&
					<div className='pt-2 mt-2 mb-2'>
						<div className='flex justify-center '>
							<img src={imagePath} className='min-w-full' style={{ aspectRatio: '1/1', objectFit: 'cover', overflow: 'hidden' }} />
						</div>
					</div>
				}
				<div className='mt-4 px-4 '>
					<Typography variant='body2' color='text.secondary'>
						Адрес: {city}, {address}
					</Typography>
					<Typography variant='body2' color='text.secondary'>
						{description}
					</Typography>
				</div>
				<div className='flex justify-between mt-7 flex-row px-4 pb-4'>
					<div className='flex flex-row'>
						<IconButton
							sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px', marginRight: 1, border: 1 }}
							onClick={() => { setRateDialogOpen(true) }}>
							<StarOutlinedIcon /> <p className='text-sm ml-2 mr-2'>Оценить</p>
						</IconButton>
						<IconButton
							sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px', border: 1 }}
							onClick={() => { window.open(link, '_blank') }}>
							<InsertLinkOutlinedIcon /> <p className='text-sm ml-2 mr-2'>Ссылка</p>
						</IconButton>
					</div>
					<div>
						<IconButton onClick={() => { setShowComments(true) }}>
							<CommentOutlinedIcon />
						</IconButton>
					</div>
				</div>
			</m.div>
			{showComments &&
				<div className={classes_showComments} style={style} >
					<div className={classes_bottomSheet}>
						<div onClick={handleCommentsClose} className='h-1/3 w-full' />
						<div style={{ backgroundColor: themeColor[2], zIndex: 1000 }} className='h-2/3 absolute bottom-0 w-11/12 p-4 rounded-t-2xl'>
							<h1 className='text-xl'>Комментарии</h1>
							<Comments comments={comments} id={id} />
						</div>
					</div>
				</div>
			}
			<Dialog open={openRateDialog} onClose={() => { setRateDialogOpen(false) }} className='animate__animated animate__fadeIn'>
				<DialogTitle>Оценка</DialogTitle>
				<DialogContent>
					<DialogContentText>
						Пожалуйста, оцените отношение к представителям LGBTQIA в данном заведении
					</DialogContentText>
					<Slider aria-label="Always visible" defaultValue={5} onChange={handleRateChange} step={1} marks={marks} valueLabelDisplay="on" min={0} max={10} />
					<DialogContentText sx={{ marginBottom: 1 }}>
						Оставьте комментарий:
					</DialogContentText>
					<TextField error={error} variant='outlined' multiline fullWidth minRows={3} onChange={handleCommentChange} onClick={() => { setError(false) }} required />
				</DialogContent>
				<DialogActions sx={{ marginRight: 2, marginBottom: 2, bgColor: themeColor[2] }}>
					<LoadingButton
						variant='outlined'
						loading={loadingRate}
						onClick={() => { setLoadingRate(true); addRate() }}
						sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px' }}>
						Оценить
					</LoadingButton>
				</DialogActions>
			</Dialog>
		</>
	)
}
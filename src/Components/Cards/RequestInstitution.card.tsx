import React from 'react'
import PropTypes from 'prop-types'
import { API } from '../../../config/config'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { themeColor } from '../../Utils/colors'
import Avatar from '@mui/material/Avatar'
import InsertLinkOutlinedIcon from '@mui/icons-material/InsertLinkOutlined'

type Props = {
	name: string,
	address: string,
	description: string,
	link: string,
	imagePath: string,
	city: string
}

export default function RequestInstitutionCard({ name, address, description, link, imagePath, city }: Props) {
	// Setups
	const unformattedURL = `${API.baseURL}\\` + `${imagePath}`
	let formattedImageURL = unformattedURL.replace(/\\/g, "/")
	return (
		<>
			<div className='my-1 rounded-2xl w-full' style={{ backgroundColor: themeColor[2], width: '95vw' }}>
				<div className='flex flex-start flex-row items-center p-4 pb-0'>
					<div className='flex rounded-full'>
						<Avatar>{name[0]}</Avatar>
					</div>
					<div className='flex flex-col ml-4'>
						<h4 className='' style={{ color: themeColor[11] }}>{name}</h4>
					</div>
				</div>
				{imagePath != undefined && imagePath != '' && imagePath != 'http://localhost:3000/' && imagePath != 'https://hammerhead-app-q63fx.ondigitalocean.app/' &&
					<div className='pt-2' style={{ height: 360, objectFit: 'cover', overflow: 'hidden' }}>
						<img src={formattedImageURL} />
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
				<div className='flex flex-start mt-7 flex-row px-4 pb-4'>
					<div className='flex flex-row'>
						<IconButton
							sx={{ borderColor: themeColor[12], color: themeColor[7], borderRadius: 9999, fontWeight: 500, paddingLeft: '12px', paddingRight: '12px', display: 'flex', justifyContent: 'center', alignItems: 'center', border: 1 }}
							onClick={() => { window.open(link, '_blank') }}>
							<InsertLinkOutlinedIcon /> <p className='text-sm ml-2 mr-2'>Ссылка</p>
						</IconButton>
					</div>
				</div>
			</div>
		</>
	)
}
RequestInstitutionCard.propTypes = {
	name: PropTypes.string.isRequired,
	address: PropTypes.any,
	description: PropTypes.string.isRequired,
	link: PropTypes.string.isRequired,
	imagePath: PropTypes.string,
	city: PropTypes.string.isRequired
}
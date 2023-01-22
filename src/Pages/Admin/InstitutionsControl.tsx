import React, { useState, useEffect } from 'react'

import styled from 'styled-components'
import { useNavigate } from 'react-router-dom'
import { useAuthUser, useIsAuthenticated } from 'react-auth-kit'
import SearchIcon from '@mui/icons-material/Search'
import InputBase from '@mui/material/InputBase'
import { styled as styledMUI, alpha } from '@mui/material/styles'

import InstitutionCard from '@/Components/Cards/admin.Institution.card'
import { axiosAuth as axios, notification } from '@utils'
import { API } from '@config'
import { Institution_Data } from '@declarations'



const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
`
const Spacer = styled.div`
  display:flex;
  justify-content: center;
  align-items: center;
  margin: 10px;
  width: fit-content;
`

const Search = styledMUI('div')(({ theme }) => ({
	marginTop: 10,
	width: '95vw',
	maxWidth: 500,
	position: 'relative',
	borderRadius: theme.shape.borderRadius,
	backgroundColor: alpha(theme.palette.common.white, 0.15),
	'&:hover': {
		backgroundColor: alpha(theme.palette.common.white, 0.25),
	},
	[theme.breakpoints.up('sm')]: {
		marginLeft: theme.spacing(3),
		width: 'auto',
	},
}))

const SearchIconWrapper = styledMUI('div')(({ theme }) => ({
	padding: theme.spacing(0, 2),
	height: '100%',
	position: 'absolute',
	pointerEvents: 'none',
	display: 'flex',
	alignItems: 'center',
	justifyContent: 'center',
}))

const StyledInputBase = styledMUI(InputBase)(({ theme }) => ({
	color: 'inherit',
	'& .MuiInputBase-input': {
		padding: theme.spacing(1, 1, 1, 1),
		// vertical padding + font size from searchIcon
		paddingLeft: `calc(1em + ${theme.spacing(4)})`,
		transition: theme.transitions.create('width'),
		width: '100%'
	},
}))

export default function InstitutionsControl() {

	// Setups
	const isAuthenticated = useIsAuthenticated()
	const navigate = useNavigate()
	const authStateUser = useAuthUser()
	const user = authStateUser()

	// States
	const [institutions, setInstitutions] = useState<Array<Institution_Data>>([])
	const [filter, setFilter] = useState<string>('')

	// Handlers
	function handleFilterChange(e: React.ChangeEvent<HTMLInputElement>) {
		setFilter(e.target.value)
	}

	// Functions
	async function fetchInstitutions() {
		axios.post(`${API.baseURL}/institutions/find`, {}).then((res) => {
			if (!res.data.err) {
				setInstitutions(res.data)
			} else {
				notification.custom.error(res.data.err)
			}

		})
	}

	useEffect(() => {
		if (isAuthenticated()) {
			fetchInstitutions()
		} else {
			navigate('/login')
		}
	}, [])

	return (
		<>
			<div className='flex flex-col absolute top-20'>
				<div style={{ display: 'flex', justifyContent: 'center' }}>
					<Search>
						<SearchIconWrapper>
							<SearchIcon />
						</SearchIconWrapper>
						<StyledInputBase
							placeholder="Поиск..."
							inputProps={{ 'aria-label': 'поиск' }}
							onChange={handleFilterChange}
						/>
					</Search>
				</div>

				<Wrapper>
					{institutions.map((institution, index: number) => (
						institution.title.includes(filter) &&
						<Spacer key={index}>
							<InstitutionCard
								imagePath={institution.imagePath}
								name={institution.title}
								status={institution.status}
								description={institution.description}
								address={institution.address}
								id={institution._id}
								link={institution.link}
								userID={user._id}
							/>
						</Spacer>
					))}
				</Wrapper>
			</div>
		</>
	)
}

import { useEffect, useState } from 'react'
import React from 'react'
import { useIsAuthenticated } from 'react-auth-kit'
import { useNavigate } from 'react-router-dom'
import { axiosAuth as axios, notification } from '../../Utils'
import { API } from '../../../config/config'
import styled from 'styled-components'
import RequestInstitutionCard from '../../Components/Cards/admin.RequestInstitution.card'
import AdminControlPanelLayout from '../../Layouts/AdminControlPanel.layout'

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

export default function RequestInstitutionControl() {
    // Setups
    const isAuthenticated = useIsAuthenticated()
    const navigate = useNavigate()

    // States
    const [requests, setRequests] = useState([])

    async function fetchRequests() {
        axios.post(`${API.baseURL}/institutions/request/find`, { query: {} })
            .then((response) => {
                if (!response.data.err) {
                    setRequests(response.data)
                } else {
                    notification.custom.error(response.data.err)
                }
            })
    }

    useEffect(() => {
        if (isAuthenticated()) {
            fetchRequests()
        } else {
            navigate('/login')
        }
    }, [])
    
    return (
        <AdminControlPanelLayout>
            <Wrapper>
                {requests.map(({ _id, title, address, description, link, imagePath, userRequestID }, index) => (
                    <Spacer key={index}>
                        <RequestInstitutionCard id={_id} name={title} address={address} description={description} link={link} imagePath={imagePath} userID={userRequestID} />
                    </Spacer>
                ))}
            </Wrapper>
        </AdminControlPanelLayout>
    )
}
import { useEffect, useState } from 'react'
import React from 'react'
import { axiosAuth as axios, notification } from '../../Utils'
import { API, MAIN_ADMIN_ID } from '../../../config/config'
import styled from 'styled-components'
import UserCard from '../../Components/Cards/admin.User.card'
import AdminControlPanelLayout from '../../Layouts/AdminControlPanel.layout'

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
  width: 100%;
`

const Spacer = styled.div`
display:flex;
justify-content: center;
align-items: center;
margin: 10px;
width: fit-content;
`

export default function UsersControl() {
    // States
    const [users, setUsers] = useState<Array<UserProp>>([])

    async function fetchRequests() {
        axios.post(`${API.baseURL}/users/find/all`)
            .then((response) => {
                if (!response.data.err) {
                    setUsers(response.data)
                } else {
                    notification.custom.error(response.data.err)
                }
            })
    }

    useEffect(() => {
        fetchRequests()
    }, [])

    return (
        <AdminControlPanelLayout>
            <Wrapper>
                {users.map(({ _id, login, inviteCode, acceptCode }: UserProp, index: number) => (
                    _id != MAIN_ADMIN_ID &&
                    <Spacer key={index}>
                        <UserCard id={_id} login={login} inviteCode={inviteCode} acceptCode={acceptCode} />
                    </Spacer>
                ))}
            </Wrapper>
        </AdminControlPanelLayout>
    )
}

type UserProp = {
    _id: string,
    login: string,
    inviteCode: string,
    acceptCode: string
}
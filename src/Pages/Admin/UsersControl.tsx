import React, { useEffect, useState } from 'react';

import styled from 'styled-components';

import { API, MAIN_ADMIN_ID } from '@config';
import { axiosAuth as axios, notification } from '@utils';
import UserCard from '@/Components/Cards/admin.User.card';

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    width: 100%;
`;

const Spacer = styled.div`
    display:flex;
    justify-content: center;
    align-items: center;
    margin: 10px;
    width: fit-content;
`;

export default function UsersControl() {
  // States
  const [users, setUsers] = useState<UserProp[]>([]);

  async function fetchRequests() {
    axios.post(`${API.baseURL}/users/find/all`)
      .then((response) => {
        if (!response.data.err) {
          setUsers(response.data);
        } else {
          notification.custom.error(response.data.err);
        }
      });
  }

  useEffect(() => {
    fetchRequests();
  }, []);

  return (
    <Wrapper>
      {users.map(({
        _id, login, inviteCode, acceptCode,
      }: UserProp, index: number) => (
        _id != MAIN_ADMIN_ID
                    && (
                    <Spacer key={index}>
                      <UserCard id={_id} login={login} inviteCode={inviteCode} acceptCode={acceptCode} />
                    </Spacer>
                    )
      ))}
    </Wrapper>
  );
}

interface UserProp {
  _id: string
  login: string
  inviteCode: string
  acceptCode: string
}

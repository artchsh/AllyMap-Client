import React from "react"

import Typography from '@mui/material/Typography'
import Avatar from '@mui/material/Avatar'
import styled from "@emotion/styled"

import AuthorIcon from '@/Images/author_picture.png'

const Link = styled.a`
    text-decoration: none;
    color: white;
`

export default function AuthorItem() {

    return (
        <div style={{ display: 'flex', flexDirection: 'row', margin: 10 }}>
            <Avatar src={AuthorIcon} />
            <div style={{ display: 'flex', flexDirection: 'column', marginLeft: 10 }}>
                <Link href='https://github.com/bogdanshelest' target="_blank">Charlz</Link>
                <Typography variant='body2' color='text.secondary'>
                    Разработчик и автор проекта
                </Typography>
            </div>
        </div>
    )
}

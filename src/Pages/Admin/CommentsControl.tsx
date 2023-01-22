import React, { useState, useEffect } from 'react'

import AdminCommentCard from '@/Components/Cards/admin.Comment.card'
import { API } from '@config'
import { Comment_Data } from '@declarations'
import { axiosAuth as axios, notification } from '@utils'

export default function CommentsControl() {

    // States
    const [comments, setComments] = useState<Array<Comment_Data>>([])

    // Functions
    function getComments() {
        axios.post(`${API.baseURL}/comments/get`, { query: {} })
            .then((response) => {
                if (!response.data.err) {
                    setComments(response.data)
                } else {
                    notification.custom.error(response.data.err)
                }
            })
    }

    useEffect(() => {
        getComments()
    }, [])

    return (
        <>
            {comments.map((comment, index) => (
                <AdminCommentCard key={index} _id={comment._id} userID={comment.userID} institutionID={comment.institutionID} content={comment.content} rate={comment.rate} />
            ))}
        </>
    )
}
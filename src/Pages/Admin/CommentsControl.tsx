import React from 'react'
import AdminControlPanelLayout from '../../Layouts/AdminControlPanel.layout'
import { axiosAuth as axios, notification } from '../../Utils'
import { API } from '../../../config/config'
import { useState, useEffect } from 'react'
import AdminCommentCard from '../../Components/Cards/admin.Comment.card'

type Comment = {
    _id: string,
    userID: string,
    institutionID: string,
    date: string,
    dateStamp: string,
    content: string,
    rate: string,
}

export default function CommentsControl() {
    // States
    const [comments, setComments] = useState<Array<Comment>>([])

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
        <AdminControlPanelLayout>
            {comments.map((comment: Comment, index) => (
                <AdminCommentCard key={index} commentID={comment._id} userID={comment.userID} institutionID={comment.institutionID} text={comment.content} rate={comment.rate} />
            ))}
        </AdminControlPanelLayout>
    )
}
/* eslint-disable no-underscore-dangle */
/* eslint-disable max-len */
import React, { useState, useEffect } from 'react';

import { API } from '@config';
import { type Comment_Data } from '@declarations';
import { axiosAuth as axios, notification } from '@utils';
import AdminCommentCard from '@/Components/Cards/admin.Comment.card';

export default function CommentsControl() {

  // States
  const [comments, setComments] = useState<Comment_Data[]>([]);

  // Functions
  function getComments() {
    axios.post(`${API.baseURL}/comments/get`, { query: {} })
      .then((response) => {
        if (!response.data.err) {
          setComments(response.data);
        } else {
          notification.custom.error(response.data.err);
        }
      });
  }

  useEffect(() => {
    getComments();
  }, []);

  return (
    <>
      {comments.map((comment) => (
        <AdminCommentCard date="" dateStamp="" key={comment._id} _id={comment._id} userID={comment.userID} institutionID={comment.institutionID} content={comment.content} rate={comment.rate} />
      ))}
    </>
  );
}

import React, { FC } from 'react';
import ICommentResponse from '../../interfaces/ICommentResponse';
import styles from './Comment.module.css';

interface IProps {
  comment: ICommentResponse;
}

const Comment: FC<IProps> = ({ comment }) => {
  return <div className={styles.comment}>
    <span>{comment.comment}</span>
    <span>{comment.author_name}</span>
    <span>{comment.author_surname}</span>
    <span>{(new Date(comment.created_at)).toLocaleDateString('en-GB')}</span>
  </div>;
};

export default Comment;
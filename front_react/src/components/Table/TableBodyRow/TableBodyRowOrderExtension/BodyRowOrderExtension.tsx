import React, { FC, memo } from 'react';

import CommentForm from '../../../../forms/CommentForm/CommentForm';
import { useAppSelector } from '../../../../redux/store';
import BtnOrderEdit from '../../../BtnOrderEdit/BtnOrderEdit';
import Comment from '../../../Comment/Comment';

import styles from './BodyRowOrderExtension.module.css';

interface IProps {
  visibility: boolean;
  order_id: number;
}

const BodyRowOrderExtension: FC<IProps> = memo(({ visibility, order_id }) => {
  const { orders } = useAppSelector((state) => state.orders);
  const order = orders?.filter((order) => order.id === order_id)[0];
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={15}>
        <div className={styles.order_edit}>
          <div className={styles.message_container}>
            <div className={styles.message}>
              <p>Message:</p>
              <div>
                <span>{order.msg}</span>
              </div>
            </div>
            <div className={styles.utm}>
              <p>UTM: </p>
              <div>
                <span>{order.utm}</span>
              </div>
            </div>


          </div>
          <div className={styles.edit_container}>
            <div className={styles.comments_part}>
              <div className={styles.comments}>
                {!!order.comments.length &&
                  order
                    .comments
                    .slice()
                    .reverse()
                    .map((comment, i) =>
                      <Comment key={i} comment={{ ...comment }} />)}
              </div>
              <CommentForm order={order} />
            </div>
            <div className={styles.btn_part}>
              <BtnOrderEdit order={order} />
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
});

export default BodyRowOrderExtension;
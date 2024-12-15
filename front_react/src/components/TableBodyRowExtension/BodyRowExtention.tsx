import React, { FC } from 'react';
import styles from './BodyRowExtension.module.css';
import IOrder from '../../interfaces/IOrder';

interface IProps {
  visibility: boolean;
  order: IOrder;
}

const BodyRowExtension: FC<IProps> = ({ visibility, order }) => {
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={15}>
        <div className={styles.order_edit}>
          <div className={styles.message_container}>
            <p>Message: <span>{order.msg}</span></p>
            <p>UTM: <span>{order.utm}</span></p>
          </div>
          <div className={styles.edit_container}>
            <div className={styles.comments_part}>
              <div className={styles.comments}></div>
              <div className={styles.comments_add}>
                <input type="text" />
              </div>
            </div>
            <div className={styles.btn_part}>

            </div>
          </div>
        </div>

        <div></div>
      </td>
    </tr>
  );
};

export default BodyRowExtension;
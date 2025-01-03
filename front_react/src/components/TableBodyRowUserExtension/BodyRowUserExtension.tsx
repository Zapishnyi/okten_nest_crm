import React, { FC } from 'react';
import styles from './BodyRowUserExtension.module.css';
import BanBtn from '../BanBtn/BanBtn';
import ActivateBtn from '../ActivateBtn/ActivateBtn';

interface IProps {
  visibility: boolean;
  user_id: number;
}

const BodyRowUserExtension: FC<IProps> = ({ visibility, user_id }) => {
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={10}>
        <div>
          <ActivateBtn user_id={user_id} />
          <BanBtn user_id={user_id} />
        </div>
      </td>
    </tr>
  );
};

export default BodyRowUserExtension;
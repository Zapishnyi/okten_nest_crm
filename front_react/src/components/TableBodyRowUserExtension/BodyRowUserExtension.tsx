import React, { FC, useState } from 'react';
import styles from './BodyRowUserExtension.module.css';
import BanBtn from '../BanBtn/BanBtn';
import ActivateBtn from '../ActivateBtn/ActivateBtn';

interface IProps {
  visibility: boolean;
  user_id: number;
}

const BodyRowUserExtension: FC<IProps> = ({ visibility, user_id }) => {
  const [activateLink, setActivateLink] = useState<string | null>(null);
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={10}>
        <div>
          {!!activateLink && <p className={styles.response_fulfilled}>{`Activate link is in clipboard.`}</p>}
          {!!errorMessage?.length &&
            <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}
          <ActivateBtn user_id={user_id} setActivateLink={setActivateLink} setErrorMassage={setErrorMassage} />
          <BanBtn user_id={user_id} setErrorMassage={setErrorMassage} />
        </div>
      </td>
    </tr>
  );
};

export default BodyRowUserExtension;
import { FC, memo, useState } from 'react';

import { useAppSelector } from '../../../../redux/store';
import BtnActivate from '../../../BtnActivate/BtnActivate';
import BtnBan from '../../../BtnBan/BtnBan';
import OrdersStatistic from '../../../OrdersStatictic/OrdersStatistic';

import styles from './BodyRowUserExtension.module.css';

interface IProps {
  visibility: boolean;
  user_id: number;
}

const BodyRowUserExtension: FC<IProps> = memo(({ visibility, user_id }) => {
  const { users } = useAppSelector(state => state.users);
  const statistic = users.filter(user => user.id === user_id)[0].statistic;
  const [activateLink, setActivateLink] = useState<string | null>(null);
  const [errorMessage, setErrorMassage] = useState<string[] | null>(null);
  return (
    <tr className={[visibility ? styles.visible : styles.not_visible, styles.row_extension].join(' ')}>
      <td colSpan={9}>
        <div className={styles.cell_wrapper}>
          <div className={styles.statistic_container}>
            <OrdersStatistic statistic={statistic} />
          </div>
          <div className={styles.action_container}>
            <BtnBan user_id={user_id} />
            <BtnActivate user_id={user_id} setActivateLink={setActivateLink} setErrorMassage={setErrorMassage} />
            {!!activateLink && <p className={styles.response_fulfilled}>{`Activate link is in clipboard.`}</p>}
            {!!errorMessage?.length &&
              <div className={styles.response_error}>{errorMessage.map((e, i) => <p key={i}>{e}</p>)}</div>}


          </div>

        </div>

      </td>
    </tr>
  );
});

export default BodyRowUserExtension;
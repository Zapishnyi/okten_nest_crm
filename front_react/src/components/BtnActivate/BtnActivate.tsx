import React, { Dispatch, FC, useState } from 'react';

import { SyncLoader } from 'react-spinners';

import { errorHandle } from '../../helpers/error-handle';
import { useAppSelector } from '../../redux/store';
import { CRMApi } from '../../services/crm.api.servise';

import styles from './BtnActivate.module.css';

interface IProps {
  user_id: number;
  setActivateLink: Dispatch<string | null>;
  setErrorMassage: Dispatch<string[] | null>;
}

const BtnActivate: FC<IProps> = ({ user_id, setActivateLink, setErrorMassage }) => {
  const [isPending, setIsPending] = useState(false);
  const { users } = useAppSelector((state) => state.users);
  const user = users?.filter((user) => user.id === user_id)[0];
  const activate = async () => {
    setIsPending(true);
    setActivateLink(null);
    setErrorMassage(null);
    try {
      const { activateToken } = await CRMApi.admin.activate_user(user_id.toString());
      const activateLink = `${document.location.origin}/#/auth/activate/${activateToken}`;
      setActivateLink(activateLink);
      setErrorMassage(null);
      await navigator.clipboard.writeText(activateLink);
    } catch (e) {
      setActivateLink(null);
      setErrorMassage(errorHandle(e).message);
    } finally {
      setIsPending(false);
    }

  };
  return <div title="Activate link will be available in the clipboard" className="button"
              onClick={activate}>
    <p>{!user.active ? 'Activate' : 'Re-new Password'}</p>
    {isPending && <div className={styles.loader_container}>
      <SyncLoader
        color={'#000303'}
        loading={isPending}
        size={8}
      />
    </div>}
  </div>;
};

export default BtnActivate;
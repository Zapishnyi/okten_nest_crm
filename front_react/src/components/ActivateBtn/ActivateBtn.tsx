import React, { FC } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { useSearchParams } from 'react-router-dom';
import { CRMApi } from '../../services/crm.api.servise';
import { errorHandle } from '../../helpers/error-handle';

interface IProps {
  user_id: number;
}

const ActivateBtn: FC<IProps> = ({ user_id }) => {

  const { users } = useAppSelector((state) => state.users);
  const user = users?.filter((user) => user.id === user_id)[0];
  const query = useSearchParams();
  const dispatch = useAppDispatch();
  const activate = async () => {
    try {
      const { activateToken } = await CRMApi.admin.activate_user(user_id.toString());
      const activationLink = `${location.hostname}/#/auth/activate/${activateToken}`;
    } catch (e) {
      errorHandle(e);
    }

  };
  return <div title="Activate link will be available in the clipboard" className="button"
              onClick={activate}>{!user.active ? 'Activate' : 'Renew Password'}</div>;
};

export default ActivateBtn;
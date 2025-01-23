import { FC } from 'react';

import { UsersActions } from '../../redux/Slices/usersSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';

interface IProps {
  user_id: number;
}

const BtnBan: FC<IProps> = ({ user_id }) => {
  const { users } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();
  const user = users?.filter((user) => user.id === user_id)[0];
  const banClickHandler = async () => {
    await dispatch(UsersActions.banReinstate(user_id));
  };
  return <div className="button" onClick={banClickHandler}>
    <p>{!user.ban ? 'Ban' : 'Reinstate'}</p>
  </div>;

};

export default BtnBan;
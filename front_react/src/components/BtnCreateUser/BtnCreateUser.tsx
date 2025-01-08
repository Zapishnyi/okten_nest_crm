import React, { Dispatch, FC } from 'react';

interface IProps {
  setCreateUserFormVisible: Dispatch<boolean>;
}

const BtnCreateUser: FC<IProps> = ({ setCreateUserFormVisible }) => {
  const clickHandle = () => {
    setCreateUserFormVisible(true);
  };
  return <div className="button" onClick={clickHandle}><p>Create Manager</p></div>;
};
export default BtnCreateUser;
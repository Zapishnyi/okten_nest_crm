import React, { Dispatch, FC } from 'react';

interface IProps {
  setCreateUserFormVisible: Dispatch<boolean>;
}

const CreateUserBtn: FC<IProps> = ({ setCreateUserFormVisible }) => {
  const clickHandle = () => {
    setCreateUserFormVisible(true);
  };
  return <p className="button" onClick={clickHandle}>Create User</p>;
};
export default CreateUserBtn;
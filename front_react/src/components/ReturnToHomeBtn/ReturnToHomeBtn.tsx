import React, { FC } from 'react';
import { useNavigate } from 'react-router-dom';
import { withButtonWrapper } from '../../hoc/ButtonWrapper/withButtonWrapper';

const ReturnToHomeBtn: FC = () => {
  const navigate = useNavigate();
  const clickHandle = () => {
    navigate('/orders');
  };
  return <div onClick={clickHandle}><p>Return to main page</p></div>;

};

export default withButtonWrapper(ReturnToHomeBtn);
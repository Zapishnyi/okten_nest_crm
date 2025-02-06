import { FC, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { setNavigate } from "../../helpers/navigate-to";

const AuthLayout: FC = () => {
  const navigate = useNavigate();
  useEffect(() => {
    setNavigate(navigate);
  });
  return (
    <>
      <Outlet />
    </>
  );
};

AuthLayout.whyDidYouRender = true;

export default AuthLayout;

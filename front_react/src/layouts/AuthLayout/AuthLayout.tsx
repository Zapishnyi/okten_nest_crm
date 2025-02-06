import { FC, memo } from "react";

import { Outlet, useNavigate } from "react-router-dom";

import { setNavigate } from "../../helpers/navigate-to";

const AuthLayout: FC = memo(() => {
  const navigate = useNavigate();
  setNavigate(navigate);
  return (
    <>
      <Outlet />
    </>
  );
});

AuthLayout.whyDidYouRender = true;

export default AuthLayout;

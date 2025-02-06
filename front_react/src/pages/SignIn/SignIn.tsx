import { FC, useEffect } from "react";

import { useNavigate } from "react-router-dom";

import SignInForm from "../../forms/SignInForm/SignIn.form";
import { cookie } from "../../services/cookies.service";

import styles from "./SignIn.module.css";

const SignIn: FC = () => {
  // console.log(".");
  // const { ordersLoadingState } = useAppSelector((state) => state.orders);
  // const { usersLoadingState } = useAppSelector((state) => state.users);
  const navigate = useNavigate();

  useEffect(() => {
    const accessExist = !!cookie.getAccessToken();
    const refreshExist = !!cookie.getRefreshToken();
    if (accessExist || refreshExist) {
      navigate("/orders");
      // query[1](queryToSearchParams(initialOrdersQuery));
    }
  }, []);

  return (
    <div className={styles.wrapper}>
      <SignInForm />
    </div>
  );
};

export default SignIn;

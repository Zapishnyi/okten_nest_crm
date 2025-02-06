import React, { FC } from "react";

import { useLocation, useNavigate, useSearchParams } from "react-router-dom";

import ErrorsContainer from "../../components/ErrorsContainer/ErrorsContainer";
import { initialUsersQuery } from "../../constants/initialUsersQuery";
import { queryToSearchParams } from "../../helpers/query-to-search-params-obj";

import styles from "./ErrorPage.module.css";

const ErrorPage: FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const query = useSearchParams();
  const errors = location.state;
  const clickHandle = () => {
    navigate("/orders");
    query[1](queryToSearchParams(initialUsersQuery));
  };
  return (
    <div className={styles.error}>
      <div className={styles.content}>
        <h1>Ups, something went wrong!</h1>
        <div onClick={clickHandle} className="button">
          <p>Return to main page</p>
        </div>
        {!!errors?.length && <ErrorsContainer errors={errors} />}
      </div>
    </div>
  );
};

export default ErrorPage;

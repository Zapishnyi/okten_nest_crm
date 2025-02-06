import { FC, memo, useEffect } from "react";

import { Outlet, useNavigate } from "react-router-dom";
import { FadeLoader } from "react-spinners";

import Header from "../../components/Header/Header";
import OrderEditForm from "../../forms/OrderEditForm/OrderEditForm";
import UserCreateForm from "../../forms/UserCreateForm/UserCreateForm";
import { setNavigate } from "../../helpers/navigate-to";
import { UsersActions } from "../../redux/Slices/usersSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";

import styles from "./MainLayout.module.css";

const MainLayout: FC = memo(() => {
  // console.log(".");
  const { userLogged } = useAppSelector((state) => state.users);
  const { ordersLoadingState } = useAppSelector((state) => state.orders);
  const { usersLoadingState } = useAppSelector((state) => state.users);
  const { createUserFormVisible, editOrderFormVisible } = useAppSelector(
    (state) => state.visibility
  );

  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    if (!userLogged) {
      dispatch(UsersActions.getMe());
    }
  }, []);

  setNavigate(navigate);

  return (
    <div className={styles.wrapper}>
      {!!userLogged && (
        <>
          <Header />
          <Outlet />
        </>
      )}
      {(ordersLoadingState || usersLoadingState) && (
        <div className={styles.loader}>
          <FadeLoader
            color={"#5dade2 "}
            loading={ordersLoadingState || usersLoadingState}
            aria-label="Loading Spinner"
            data-testid="loader"
          />
        </div>
      )}
      {createUserFormVisible && (
        <div className={styles.modal_window_base}>
          <UserCreateForm />
        </div>
      )}
      {editOrderFormVisible && (
        <div className={styles.modal_window_base}>
          <OrderEditForm />
        </div>
      )}
    </div>
  );
});
MainLayout.whyDidYouRender = true;
export default MainLayout;

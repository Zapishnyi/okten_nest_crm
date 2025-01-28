import { FC } from "react";

import { VisibilityActions } from "../../redux/Slices/visibilitySlice";
import { useAppDispatch } from "../../redux/store";

const BtnCreateUser: FC = () => {
  const dispatch = useAppDispatch();
  const clickHandle = () => {
    dispatch(VisibilityActions.createUserFormVisible(true));
  };
  return (
    <div className="button" onClick={clickHandle}>
      <p>Create Manager</p>
    </div>
  );
};
export default BtnCreateUser;

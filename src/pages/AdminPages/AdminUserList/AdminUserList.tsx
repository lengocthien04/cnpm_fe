import { Fragment, useContext } from "react";
import { AdminContext } from "../../../contexts/admin.context";
import userQuery from "../../../hooks/queries/useUserQuery";
import { useNavigate } from "react-router-dom";
import { adminPath } from "../../../constants/path";
import { generateNameId } from "../../../utils/utils";
import { UserModel } from "../../../types/user.type";
import LoadingSection from "../../../components/loading/LoadingSection";
import AdminUserCard from "./components/AdminUserCard";

export default function AdminUserList() {
  const { setCurrentUser } = useContext(AdminContext);

  //! GET USER LIST

  const { data: userListData } = userQuery.useListUsers();

  //! Handle click
  const navigate = useNavigate();
  const handleClick = (user: UserModel) => () => {
    setCurrentUser(user);
    navigate({
      pathname: `${adminPath.userList}/${generateNameId({ name: user.name, id: user.id })}`,
    });
  };

  return (
    <div className="p-4">
      <p className="w-full text-center font-semibold desktop:text-xl uppercase text-primaryText">
        Danh sách sinh viên
      </p>

      <div className="py-4 px-20 w-full">
        <div className="border-t border-white"></div>
      </div>

      {!userListData && <LoadingSection />}

      {userListData && (
        <Fragment>
          <div className="grid grid-cols-4 gap-4">
            {userListData.data.map((user) => (
              <div key={user.id} className="col-span-1">
                <AdminUserCard user={user} handleClick={handleClick(user)} />
              </div>
            ))}
          </div>
        </Fragment>
      )}
    </div>
  );
}

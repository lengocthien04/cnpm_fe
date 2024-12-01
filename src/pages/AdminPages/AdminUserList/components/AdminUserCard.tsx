import { faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { UserModel } from "../../../../types/user.type";
import { useContext } from "react";
import { AdminContext } from "../../../../contexts/admin.context";
import { classNames } from "primereact/utils";

interface Props {
  user: UserModel;
  handleClick?: () => void;
}

export default function AdminUserCard({
  user,
  handleClick = () => {
    return;
  },
}: Props) {
  const { currentUser } = useContext(AdminContext);
  const infos = [
    {
      name: "Tên",
      info: user.name,
    },
    {
      name: user.authority_group == "user" ? "MSSV" : "Username",
      info: user.username,
    },
  ];
  const isSelected = currentUser?.id == user.id;

  return (
    <button
      type="button"
      onClick={handleClick}
      className={classNames(
        "rounded-md w-full outline items-center justify-center p-4 space-y-4 bg-webColor100 hover:bg-webColor300",
        {
          "outline-black/20 outline-1": !isSelected,
          "outline-2 outline-webColor800": isSelected,
        }
      )}
    >
      <div className="w-full flex justify-center">
        <div className="flex bg-slate-300 rounded-full items-center justify-center p-4">
          <FontAwesomeIcon icon={faUser} className="text-white h-10 w-10" />
        </div>
      </div>

      <div className=""></div>

      <div className="space-y-2">
        {infos.map((info, index) => (
          <div
            key={index}
            className="grid grid-cols-4 gap-2 text-left items-center truncate"
          >
            <span className="col-span-1 opacity-70 text-sm truncate">
              {info.name}
            </span>
            <span className="col-span-3 ">{info.info}</span>
          </div>
        ))}
      </div>
    </button>
  );
}

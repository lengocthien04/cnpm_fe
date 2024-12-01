import { useContext, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { AdminContext } from "../../../contexts/admin.context";
import { adminPath } from "../../../constants/path";
import { InfomationField } from "../../../types/utils.type";
import { getIdFromUrl } from "../../../utils/utils";
import BackButton from "../../../components/BackButton";
import LoadingSection from "../../../components/loading/LoadingSection";
import printjobQuery from "../../../hooks/queries/usePrintjobQuery";
import AdminUserPrintjobCard from "./AdminUserPrintjobCard";

export default function AdminUserDetail() {
  const { currentUser } = useContext(AdminContext);

  const navigate = useNavigate();
  useEffect(() => {
    if (!currentUser) {
      navigate(adminPath.userList);
    }
  });

  //! get information
  let infos: InfomationField[] = [];

  if (currentUser) {
    infos = [
      {
        title: "Họ tên",
        info: currentUser.name,
      },
      {
        title: "MSSV / Tên đăng nhập",
        info: currentUser.username,
      },
    ];
  }

  //! Get joined classroom
  const userId = getIdFromUrl(useLocation().pathname);
  const config = { user_id: userId };
  const { data: printjobData, isFetched } =
    printjobQuery.useListPrintjob(config);
  const printjobList = printjobData?.data || [];

  return (
    <div className="space-y-8 p-6">
      <BackButton />
      <div className="space-y-4 px-4 tablet:px-10 desktop:px-20">
        <p className="text-center font-semibold uppercase text-xl desktop:text-3xl tracking-widest text-text-primary">
          Thông tin tài khoản
        </p>

        {infos.map((info, index) => (
          <div key={index} className="grid desktop:text-lg grid-cols-4 gap-4">
            <p className="col-span-1 opacity-60">{info.title}</p>
            <p className="col-span-3">{info.info}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4">
        <p className="text-center font-semibold uppercase text-lg desktop:text-2xl tracking-wide text-text-primary">
          Lịch sử in
        </p>

        {!isFetched && <LoadingSection />}
        {isFetched && (
          <div className="flex flex-col gap-4">
            {printjobList.map((printjob) => (
              <div key={printjob.id} className="col-span-1">
                <AdminUserPrintjobCard printjob={printjob} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

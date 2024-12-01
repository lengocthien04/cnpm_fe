import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../../contexts/app.context";
import CreatingNotifyForm from "./children/CrreatingNotifyForm";
import userApi from "../../../../api/user.api";
import { useQuery } from "@tanstack/react-query";

export default function AfterLogin() {
  const { profile } = useContext(AppContext);
  const [isCreatingNotify, setIsCreatingNotify] = useState<boolean>(false);

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => userApi.getGeneralNotifications(),
  });
  const notifyList = data?.data || [];
  const onclose = () => {
    setIsCreatingNotify(false);
  };

  return (
    <div className="pb-[4rem]">
      <div className="relative">
        <img className="w-full" src="public/after_login_img.jpg" />
        <div className="absolute top-12 left-24 bg-[#6E6C6C] bg-opacity-70 w-1/2">
          <p className="text-white text-[36px] font-semibold font-inter pt-6 pl-12 leading-[43.57px]">
            User Announcement <br />
            (Important Reminder)
          </p>
          <button className="bg-[#9CCAF5] text-[32px] font-bold font-inter leading-[38.73px] ml-12 mt-12 mb-12 pt-5 pb-5 pl-10 pr-10">
            View
          </button>
        </div>
      </div>
      <div>
        <p className="font-inter font-extrabold text-[44px] leading-[53.25px] text-[#002D57] mt-[16px] ml-[16px] mb-[16px]">
          Thông báo chung
        </p>
        {profile?.authority_group == "admin" && (
          <div className="relative flex justify-end">
            <button
              className="bg-[#a563c4] hover:bg-[#C18BDB] rounded-[40px] font-inter font-extrabold text-[30px] leading-[36.31px] text-[#D9D9D9] px-[32px] py-[12px] mr-5"
              onClick={() => setIsCreatingNotify(true)}
            >
              Tạo thông báo (SPSO)
            </button>
          </div>
        )}
        {isCreatingNotify && (
          <CreatingNotifyForm isOpen={isCreatingNotify} onClose={onclose} />
        )}
        {notifyList.map((nofitication) => (
          <div
            key={nofitication.id}
            className="relative bg-[#D9D9D9] rounded-[47px] mt-12 mr-10 ml-24"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="absolute w-[50px] h-[50px] top-16 left-32 text-black text-[1.5rem] rounded-full bg-white flex items-center justify-center p-5"
            />
            <div className="pl-80 pt-16 pb-20">
              <p className="font-inter font-semibold text-[22px] leading-[26.63px] text-[#6E6C6C] pr-[200px]">
                {nofitication.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

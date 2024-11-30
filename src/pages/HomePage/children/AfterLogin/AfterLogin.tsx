import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useState } from "react";
import { AppContext } from "../../../../contexts/app.context";
import CreatingNotifyForm from "./children/CrreatingNotifyForm";

export default function AfterLogin() {
  const { profile } = useContext(AppContext);
  const [isCreatingNotify, setIsCreatingNotify] = useState<boolean>(false);
  const onclose = () => {
    setIsCreatingNotify(false);
  };
  const notifications = [
    {
      id: 1,
      title: "Notice about the 003-CS2 Printer Malfunction",
      number: "SPSO No.212 - Monday,30/09/2024",
      description:
        "From September 30, 2024, H6-CS2 Printer Stopped All Operations due to Budget Limitations. Students please use the printers in the neighboring buildings.",
    },
    {
      id: 2,
      title: "Notice about the 001-CS1 Printer Malfunction",
      number: "SPSO No.211 - Monday,27/09/2024",
      description:
        "From September 27, 2024, H6-CS2 Printer Stopped All Operations due to Budget Limitations. Students please use the printers in the neighboring buildings.",
    },
  ];
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
          User Announcement
        </p>
        {profile?.authority_group == "admin" && (
          <div className="relative flex justify-end">
            <button
              className="bg-[#a563c4] hover:bg-[#C18BDB] rounded-[40px] font-inter font-extrabold text-[30px] leading-[36.31px] text-[#D9D9D9] px-[32px] py-[12px] mr-5"
              onClick={() => setIsCreatingNotify(true)}
            >
              Add notification (SPSO)
            </button>
          </div>
        )}
        <CreatingNotifyForm isOpen={isCreatingNotify} onClose={onclose} />
        {notifications.map((nofitication) => (
          <div
            key={nofitication.id}
            className="relative bg-[#D9D9D9] rounded-[47px] mt-12 mr-10 ml-24"
          >
            <FontAwesomeIcon
              icon={faUser}
              className="absolute w-[50px] h-[50px] top-16 left-32 text-black text-[1.5rem] rounded-full bg-white flex items-center justify-center p-5"
            />
            <div className="pl-80 pt-16 pb-20">
              <p className="font-inter font-bold text-[36px] leading-[43.57px] text-[#0F4578]">
                {nofitication.title}
              </p>
              <p className="font-inter font-extrabold text-[27px] leading-[32.68px] text-[#000000] mt-[20px] mb-[12px]">
                {nofitication.number}
              </p>
              <p className="font-inter font-semibold text-[22px] leading-[26.63px] text-[#6E6C6C] pr-[200px]">
                {nofitication.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

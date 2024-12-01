import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function MainFooter() {
  return (
    <div className="flex flex-row bg-primary-blue md:flex-row justify-between items-stretch gap-4 py-[2rem]">
      <div className="basis-1/2 flex flex-col items-center justify-center text-center h-full">
        <img
          src="public/01_logobachkhoa.png"
          className="w-[15rem] h-full pr-10"
          alt="Logo"
        />
        <p className="text-white text-[1.5rem]">
          Studen Smart Printing Service
        </p>
      </div>

      <div className="basis-1/2 flex flex-col items-start justify-center text-left h-full gap-[3rem] pl-[10rem]">
        <p className="text-white font-bold mb-2 text-[1.8rem] pt-5">
          Thông tin liên hệ và hỗ trợ
        </p>
        <div className="flex items-center text-white text-[1.5rem] gap-2">
          <FontAwesomeIcon icon={faPhone} />
          <span>(028) 38 651 670</span>
        </div>
        <div className="flex items-center text-white text-[1.5rem] gap-2">
          <FontAwesomeIcon icon={faEnvelope} />
          <span>hcmut.spso@hcmut.edu.vn</span>
        </div>
      </div>
    </div>
  );
}

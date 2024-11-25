import mainPath from "../../constants/path";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";

export default function MainHeader() {
  const HeaderName = [
    {
      name: "Trang chủ",
      path: mainPath.home,
    },
    {
      name: "In ấn",
      path: mainPath.printing,
    },
    {
      name: "Lịch sử in ấn",
      path: mainPath.pringtinghistory,
    },
    {
      name: "Thanh toán",
      path: mainPath.payment,
    },
  ];
  return (
    <div className="flex justify-between items-center px-[4rem] py-[2rem] bg-primary-blue">
      <img
        className=" w-[7rem] h-full"
        src="public/01_logobachkhoasang 1.png"
      ></img>
      {HeaderName.map((item) => (
        <a
          key={item.name}
          href={item.path}
          className="text-white font-[550] text-[2.4rem] hover:bg-blue-100 hover:text-blue-300 transition-all duration-300 group relative border-0 rounded-[0.6rem]"
        >
          <span className="inline-block group-hover:block w-full px-4 py-2  rounded-md">
            {item.name}
          </span>
        </a>
      ))}
      <div className="flex space-x-6">
        <FontAwesomeIcon
          icon={faBell}
          className="text-primary-purple p-2 w-[1.8rem] h-full hover:bg-blue-100 hover:text-blue-300 transition-all duration-300 border-0 rounded-full"
        />
        <FontAwesomeIcon
          icon={faUser}
          className="text-primary-blue bg-primary-purple w-[1.8rem] h-full border-0 rounded-full p-2 hover:bg-blue-100 hover:text-blue-300 transition-all duration-300 "
        />
      </div>
    </div>
  );
}
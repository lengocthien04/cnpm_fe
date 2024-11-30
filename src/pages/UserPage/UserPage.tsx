import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext } from "react";
import { AppContext } from "../../contexts/app.context";

const infos = {
  MSSV: 123456,
  name: "abcdef",
  sex: "Nam",
  faculty: "CSE",
  phoneNumber: "0123456789",
  pagesAvailable: 10,
  email: "abc@gmaill.com",
};

export default function UserPage() {
  const { profile } = useContext(AppContext);
  console.log(profile);
  return (
    <div className="mt-[14px] px-[40px]">
      <p className="font-bold text-[40px] mb-[24px]">Thông tin</p>

      <div className="mb-[24px]">
        <div className="bg-primary-blue px-4 py-2">
          <p className="text-white font-bold text-[24px]">Thông tin cá nhân</p>
        </div>
        <div className="flex">
          <div className="w-1/4 p-[8px]">
            <FontAwesomeIcon
              icon={faUser}
              className="bg-[#ccc] w-4/5 h-full rounded-[16px]"
            />
          </div>

          <div className="px-[32px] pt-[16px]">
            <div key={infos.MSSV}>
              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Tên người dùng: </p>
                <p>{infos.name}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Mã số sinh viên: </p>
                <p>{infos.MSSV}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Giới tính: </p>
                <p>{infos.sex}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Khoa: </p>
                <p>{infos.faculty}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Số trang còn lại: </p>
                <p>{infos.pagesAvailable}</p>
              </div>

              <button className="bg-primary-blue px-[12px] py-[6px] text-white hover:cursor-pointer hover:text-black hover:opacity-85 rounded-[10px]">
                {" "}
                Mua thêm trang
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-[24px]">
        <div className="bg-primary-blue px-4 py-2 flex justify-between">
          <p className="text-white font-bold text-[24px]">Thông tin liên hệ</p>
          <button className="text-white hover:cursor-pointer">Cập nhật</button>
        </div>
        <div key={infos.MSSV} className="flex p-[8px]">
          <div className="text-[16px] mb-8 w-1/2">
            <p className="font-bold">Số điện thoại: </p>
            <p>{infos.phoneNumber}</p>
          </div>

          <div className="text-[16px] mb-8  w-1/2">
            <p className="font-bold">Email: </p>
            <p>{infos.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

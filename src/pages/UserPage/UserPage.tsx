import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import mainPath from "../../constants/path";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../api/user.api";

export default function UserPage() {
  const { data } = useQuery({
    queryKey: ["user-profile"],
    queryFn: () => userApi.getMe(),
  });
  const profile = data?.data;
  return (
    <div className="mt-[14px] px-[40px] min-h-[70vh] py-[1rem]">
      <p className="font-bold text-[40px] py-[3rem] ">Thông tin</p>

      <div className="mb-[24px]">
        <div className="bg-primary-blue px-4 py-2">
          <p className="text-white font-bold text-[24px]">Thông tin cá nhân</p>
        </div>
        <div className="flex py-[3rem]">
          <div className="w-1/4 p-[8px]">
            <FontAwesomeIcon
              icon={faUser}
              className="bg-[#ccc] w-4/5 h-full rounded-[16px] p-[2rem]"
            />
          </div>

          <div className="px-[32px] pt-[16px]">
            <div key={profile?.name}>
              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Tên người dùng: </p>
                <p>{profile?.name}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Mã số sinh viên: </p>
                <p>{profile?.username}</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Khoa: </p>
                <p>Khoa học máy tính</p>
              </div>

              <div className="flex text-[16px] mb-8">
                <p className="font-bold mr-4 w-[200px]">Số trang còn lại: </p>
                <p>{profile?.available_pages}</p>
              </div>

              <a
                className="bg-primary-blue px-[12px] py-[6px] text-white hover:cursor-pointer hover:text-black hover:opacity-85 rounded-[10px] "
                href={mainPath.payment}
              >
                Mua thêm trang
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

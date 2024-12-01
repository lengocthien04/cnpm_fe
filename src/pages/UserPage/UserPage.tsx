import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { useContext, useEffect } from "react";
import { AppContext } from "../../contexts/app.context";
import mainPath from "../../constants/path";
import userQuery from "../../hooks/queries/useUserQuery"; // Your query hooks

export default function UserPage() {
  const { profile, setProfile } = useContext(AppContext);
  const { data, isLoading, isError } = userQuery.useGetme(); // Use the query here

  useEffect(() => {
    if (data && profile?.id == data?.data.id) {
      setProfile(data.data); // Update the context if data differs from current profile
    }
  }, [data, profile, setProfile]);

  if (isLoading) {
    return <p>Loading user information...</p>; // Handle loading state
  }

  if (isError) {
    return <p>Error loading user information. Please try again later.</p>; // Handle error state
  }

  return (
    <div className="mt-[14px] px-[40px] min-h-[70vh] py-[1rem]">
      <p className="font-bold text-[40px] py-[3rem]">Thông tin</p>

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
            {data ? (
              <div>
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
                  className="bg-primary-blue px-[12px] py-[6px] text-white hover:cursor-pointer hover:text-black hover:opacity-85 rounded-[10px]"
                  href={mainPath.payment}
                >
                  Mua thêm trang
                </a>
              </div>
            ) : (
              <p>No profile data available. Try again later.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

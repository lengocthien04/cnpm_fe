import { useState, useContext, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../contexts/app.context";
import notifyQuery from "../../hooks/queries/useNotifyQuery";
import useNotifyQueryConfig from "../../hooks/queryConfigs/useNotifyQueryConfig";
import mainPath from "../../constants/path";

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext);
  const notifyqueryconfig = useNotifyQueryConfig();
  const { data, refetch } = notifyQuery.useListNotify(notifyqueryconfig);

  const notifylist = useMemo(() => {
    return data?.data || [];
  }, [data?.data]);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false); // State to control dropdown visibility
  const [hasReadNotifications, setHasReadNotifications] = useState<boolean>(
    () => {
      // Check if notifications were already read (stored in localStorage)
      return JSON.parse(localStorage.getItem("notificationsRead") || "false");
    }
  );

  const HeaderName = [
    { name: "Trang chủ", path: mainPath.home },
    { name: "In ấn", path: mainPath.printing },
    { name: "Lịch sử in ấn", path: mainPath.printinghistory },
    { name: "Thanh toán", path: mainPath.payment },
  ];

  useEffect(() => {
    // Store notification count in localStorage once when notifications are fetched
    if (notifylist.length > 0 && !hasReadNotifications) {
      // Store the count in localStorage if it exists and has not been read
      localStorage.setItem(
        "notificationCount",
        JSON.stringify(notifylist.length)
      );
    }
  }, [notifylist, hasReadNotifications]);

  const handleBellClick = () => {
    setIsDropdownOpen(!isDropdownOpen); // Toggle dropdown visibility
    if (!hasReadNotifications) {
      setHasReadNotifications(true); // Mark notifications as read when bell is clicked
      localStorage.setItem("notificationsRead", "true"); // Set the notifications as read in localStorage
    }
    refetch();
  };

  return (
    <div className="flex justify-between items-center px-[4rem] py-[2rem] bg-primary-blue">
      <img
        className="w-[5rem] h-full bg-white rounded-[1rem]"
        src="public/01_logobachkhoasang 1.png"
        alt="Logo"
      />
      {HeaderName.map((item) => (
        <a
          key={item.name}
          href={item.path}
          className="text-white font-[550] text-[2.4rem] hover:bg-blue-100 hover:text-blue-300 transition-all duration-300 group relative border-0 rounded-[0.6rem]"
        >
          <span className="inline-block group-hover:block w-full px-4 py-2 rounded-md">
            {item.name}
          </span>
        </a>
      ))}
      {isAuthenticated ? (
        <div className=" gap-[1rem] relative flex items-center justify-center">
          <div className="relative transform -translate-y-[-5%]">
            <FontAwesomeIcon
              icon={faBell}
              className="text-primary-purple p-2 w-[1.8rem] h-full hover:bg-blue-100 hover:text-blue-300 transition-all duration-300 border-0 rounded-full"
              onClick={handleBellClick}
            />
            {/* Show notification count if notifications exist and haven't been read */}
            {notifylist.length > 0 && !hasReadNotifications && (
              <span className="absolute top-0 right-0 text-xs font-bold text-white bg-red-500 rounded-full px-2 py-1">
                {notifylist.length}
              </span>
            )}
          </div>

          {/* User Profile Icon */}
          <a
            className="w-[1.8rem] h-full flex items-center justify-center"
            href={mainPath.userprofile}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-primary-blue bg-primary-purple border-0 rounded-full p-2 hover:bg-blue-100 hover:text-blue-300 transition-all duration-300"
            />
          </a>

          {/* Dropdown for notifications */}
          {isDropdownOpen && (
            <div className="absolute top-[3rem] right-0 w-[20rem] bg-gray-200 rounded-md shadow-lg p-4 z-50">
              <h3 className="text-lg font-bold mb-2">Thông báo</h3>
              {notifylist.length === 0 ? (
                <p>No notifications available.</p>
              ) : (
                // Reverse the notifylist to display the newest notifications first
                [...notifylist].reverse().map((notification) => (
                  <div
                    key={notification.id}
                    className="p-2 border-b border-gray-300"
                  >
                    <p>{notification.message}</p>
                    {notification.printjob_id && (
                      <p>{notification.printjob_id}</p>
                    )}
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      ) : (
        <a
          className="text-[2.4rem] font-bold text-white bg-[#4B4DD6] p-4 hover:bg-blue-100 hover:text-blue-300 rounded-md"
          href={mainPath.login}
        >
          Đăng nhập
        </a>
      )}
    </div>
  );
}

import { useState, useContext, useEffect, useMemo } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faBell } from "@fortawesome/free-solid-svg-icons";
import { AppContext } from "../../contexts/app.context";
import mainPath from "../../constants/path";
import { Link, NavLink } from "react-router-dom";
import classNames from "classnames";
import { useQuery } from "@tanstack/react-query";
import userApi from "../../api/user.api";

export default function MainHeader() {
  const { isAuthenticated } = useContext(AppContext);

  const { data, refetch } = useQuery({
    queryKey: ["notify"],
    queryFn: () => userApi.getNotifications(),
    enabled: isAuthenticated,
  });

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
    { name: "Lịch sử in", path: mainPath.printinghistory },
    { name: "Mua giấy in", path: mainPath.payment },
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
    <div className="flex justify-between items-center h-20 px-6 py-2 bg-primary-blue">
      <img
        className="h-full bg-white rounded-xl"
        src="public/01_logobachkhoasang 1.png"
        alt="Logo"
      />
      {HeaderName.map((item) => (
        <NavLink
          key={item.name}
          to={item.path}
          className={({ isActive }) =>
            classNames(
              "text-white font-semibold text-2xl hover:bg-blue-100 hover:text-blue-500 transition-all group relative border-0 rounded-[0.6rem]",
              {
                "bg-blue-100 !text-blue-500 ": isActive,
              }
            )
          }
        >
          <span className="inline-block group-hover:block w-full px-4 py-2 rounded-md">
            {item.name}
          </span>
        </NavLink>
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
          <Link
            className="w-[1.8rem] h-full flex items-center justify-center"
            to={mainPath.userprofile}
          >
            <FontAwesomeIcon
              icon={faUser}
              className="text-primary-blue bg-primary-purple border-0 rounded-full p-2 hover:bg-blue-100 hover:text-blue-300 transition-all duration-300"
            />
          </Link>

          {/* Dropdown for notifications */}
          {isDropdownOpen && (
            <div className="absolute top-[3rem]   right-0 w-[20rem] bg-gray-200 rounded-md shadow-lg p-4 z-50">
              <h3 className="text-lg font-bold mb-2">Thông báo</h3>
              {notifylist.length === 0 ? (
                <p>No notifications.</p>
              ) : (
                <div className="w-full max-h-[40vh] p-2 bg-white rounded-lg overflow-auto">
                  {notifylist.map((notification) => (
                    <div
                      key={notification.id}
                      className="p-2 border-b border-gray-300"
                    >
                      <p>{notification.message}</p>
                      {notification.printjob_id && (
                        <p>{notification.printjob_id}</p>
                      )}
                    </div>
                  ))}
                </div>
                // Reverse the notifylist to display the newest notifications first
              )}
            </div>
          )}
        </div>
      ) : (
        <Link
          className="text-2xl font-bold text-white bg-[#4B4DD6] p-4 hover:bg-blue-100 hover:text-blue-300 rounded-md"
          to={mainPath.login}
        >
          Đăng nhập
        </Link>
      )}
    </div>
  );
}

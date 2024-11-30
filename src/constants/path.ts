// Define the main paths
const mainPath = {
  home: "/",
  login: "/login",
  printing: "/printing",
  printinghistory: "/printjob",
  payment: "/payment",
  userprofile: "/userprofile",
};

export default mainPath;

export const adminPath = {
  admin: "/admin",
  userList: "/admin/userinfo",
  userInfo: "/admin/userinfo/:userinfosId",
  printerConfig: "admin/printerconfig",
  report: "admin/report",
  createUser: "/admin/createuser",
};

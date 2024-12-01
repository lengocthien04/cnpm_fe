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
  userList: "/admin/user",
  userInfo: "/admin/user/:id",
  createUser: "/admin/user/create",
  printers: "/admin/printer",
  createPrinters: "/admin/printer/create",
  printerConfig: "admin/printerconfig",
  report: "admin/report",
};

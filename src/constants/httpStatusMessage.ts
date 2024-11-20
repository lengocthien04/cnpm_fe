export const delivery_duplicateDeliveryErrorMess =
  "some deliveries had been created before";

let httpStatusMessageMap: Map<string, string> | null = null;

const errorList = [
  "User not found",
  "password must be longer than or equal to 8 characters",
  "login failed",
  delivery_duplicateDeliveryErrorMess,
];

// Function to create the map with static error messages
const createHttpStatusMessageMap = (): Map<string, string> => {
  // If the map is already created, return it
  if (httpStatusMessageMap) return httpStatusMessageMap;

  // Create the map with static messages
  httpStatusMessageMap = new Map(errorList.map((name) => [name, name]));

  return httpStatusMessageMap;
};

export default createHttpStatusMessageMap;

import { useState, createContext } from "react";
import { UserModel } from "../types/user.type";

interface AdminContextInterface {
  currentUser: UserModel | null;
  setCurrentUser: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

const initialAdminContext: AdminContextInterface = {
  currentUser: null,
  setCurrentUser: () => null,
};

// eslint-disable-next-line react-refresh/only-export-components
export const AdminContext =
  createContext<AdminContextInterface>(initialAdminContext);

export const AdminProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<UserModel | null>(
    initialAdminContext.currentUser
  );

  return (
    <AdminContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}
    >
      {children}
    </AdminContext.Provider>
  );
};

import { createContext, useContext } from "react";
import axiosInstance from "../services/axiosInstance";

export const UserContext = createContext();

const UserProvider = ({ children }) => {
  const getUserById = async (id) => {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  };

  return (
    <UserContext.Provider value={{ getUserById }}>
      {children}
    </UserContext.Provider>
  );
};

export default UserProvider;

export const useUserContext = () => useContext(UserContext);

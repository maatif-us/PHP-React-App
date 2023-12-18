import { useContext } from "react";
import CustomersContext from "../context/CamerasContext";

export const useCustomers = () => {
  const { state, dispatch } = useContext(CustomersContext);

  return {
    ...state,
    dispatch,
  };
};

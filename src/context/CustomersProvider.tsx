import { FC, useReducer, useEffect } from "react";
import axios from "axios";
import CustomersContext from "./CamerasContext";
import CustomersReducer from "../reducers/CustomersReducer";
import { Customers, ContextState } from "../interfaces";
import { API_URL } from "../utils/base-url";

const INIT_STATE: ContextState = {
  customers: [],
  loading: true,
  error: null,
};

const CustomersProvider: FC = ({ children }) => {
  const [state, dispatch] = useReducer(CustomersReducer, INIT_STATE);

  const getCustomers = async () => {
    try {
      const {data} = await axios.get<{ data: Customers }>(API_URL);
      dispatch({ type: "SET_CUSTOMERS", payload: data.data });
    } catch (e) {
      console.log(e);
      dispatch({ type: "SET_ERROR", payload: "Something went wrong." });
      console.error(e);
    }
  };

  useEffect(() => {
    getCustomers();
  }, []);

  return (
    <CustomersContext.Provider value={{ state, dispatch }}>
      {children}
    </CustomersContext.Provider>
  );
};

export default CustomersProvider;

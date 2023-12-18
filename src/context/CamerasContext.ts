import { createContext, Dispatch } from "react";
import { CustomersActions, ContextState } from "../interfaces";

interface CustomersContextI {
  state: ContextState;
  dispatch: Dispatch<CustomersActions>;
}

const CustomersContext = createContext<CustomersContextI>(
  {} as CustomersContextI
);

export default CustomersContext;

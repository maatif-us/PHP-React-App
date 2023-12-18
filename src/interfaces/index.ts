export interface Customer {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  address: string;
  createdAt?: string;
}

export type Customers = Array<Customer>;
export type CustomerDTO = Omit<Customer, "_id" | "createdAt">;

export interface ContextState {
  customers: Customers;
  loading: boolean;
  error: string | null;
}

export type CustomersActions =
  | { type: "SET_CUSTOMERS"; payload: Customers }
  | { type: "SET_LOADING"; payload: boolean }
  | { type: "SET_ERROR"; payload: string }
  | { type: "ADD_CUSTOMER"; payload: Customer }
  | { type: "EDIT_CUSTOMER"; payload: Customer }
  | { type: "DELETE_CUSTOMER"; payload: string };

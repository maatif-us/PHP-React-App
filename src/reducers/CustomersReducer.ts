import { CustomersActions, ContextState } from "../interfaces";

const CustomersReducer = (
  state: ContextState,
  action: CustomersActions
): ContextState => {
  switch (action.type) {
    case "SET_CUSTOMERS":
      return {
        ...state,
        loading: false,
        customers: action.payload,
      };

    case "SET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case "ADD_CUSTOMER":
      return {
        ...state,
        customers: [...state.customers, action.payload],
      };

    case "DELETE_CUSTOMER":
      return {
        ...state,
        customers: state.customers.filter(
          (customer) => customer._id !== action.payload
        ),
      };

    case "EDIT_CUSTOMER":
      const found = state.customers.find(
        (item) => item._id === action.payload._id
      );

      return {
        ...state,
        customers: state.customers.map((customer) => {
          if (found) {
            Object.assign(found, action.payload);

            return {
              ...customer,
            };
          }

          return customer;
        }),
      };

    default:
      return state;
  }
};

export default CustomersReducer;

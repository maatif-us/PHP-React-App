import axios from "axios";
import { Customer, CustomerDTO } from "../interfaces";
import { API_URL } from "../utils/base-url";

export const addCustomer = async (newCustomer: CustomerDTO) => {
  const result = { dataCustomer: {} as Customer, error: false };

  const { fullName, email, phoneNumber, address } = newCustomer;
  const FD = new FormData();
  FD.append("fullName", fullName);
  FD.append("email", email);
  FD.append("phoneNumber", phoneNumber);
  FD.append("address", address);

  try {
    const { data } = await axios.post(`${API_URL}/store`, FD);
    result.dataCustomer = data;
  } catch (e) {
    console.log('error : ', e);
    result.error = true;
    console.error(e);
  }

  return result;
};

export const editCustomer = async (id: string, customerEdited: CustomerDTO) => {
  const result = { dataCustomer: {} as Customer, error: false };

  const { fullName, email, phoneNumber, address } = customerEdited;
  const FD = new FormData();
  FD.append("fullName", fullName);
  FD.append("email", email);
  FD.append("phoneNumber", phoneNumber);
  FD.append("address", address);

  try {
    const { data } = await axios.patch(`${API_URL}/update/${id}`, FD);
    result.dataCustomer = data;
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

export const deleteCustomer = async (id: string) => {
  const result = { error: false };

  try {
    await axios.delete(`${API_URL}/destroy/${id}`);
  } catch (e) {
    result.error = true;
    console.error(e);
  }

  return result;
};

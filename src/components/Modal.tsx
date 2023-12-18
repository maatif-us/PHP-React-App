import { FC, FormEvent, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { useForm } from "../hooks/useForm";
import { Customer, CustomerDTO } from "../interfaces";
import { addCustomer, editCustomer } from "../services";
import { Button } from "./Button";
import { RawModal } from "./RawModal";
import { TextInput } from "./TextInput";

interface ModalProps {
  onClose: () => void;
  isEdit?: boolean;
  item?: Customer;
}

export const Modal: FC<ModalProps> = ({ onClose, isEdit, item }) => {
  const [isValid, setIsValid] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);
  const [errors, setErrors] = useState({fullName: "", email: "", phoneNumber: "", address:""});


  const { dispatch } = useCustomers();

  const { values, handlerChange } = useForm<CustomerDTO>({
    fullName: isEdit ? item!.fullName : "",
    email: isEdit ? item!.email : "",
    phoneNumber: isEdit ? item!.phoneNumber : "",
    address: isEdit ? item!.address : "",
  });

  const { fullName, email, phoneNumber, address } = values;

  const handlerAdd = async (e: FormEvent) => {
    e.preventDefault();

    if (
      fullName !== "" 
      // email !== "" &&
      // phoneNumber !== "" &&
      // address !== ""
    ) {
      setErrors({...errors, fullName: "Full name is required"})
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      const { error, dataCustomer } = await addCustomer(values);

      if (!error) {
        dispatch({ type: "ADD_CUSTOMER", payload: dataCustomer });
        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);
      return;
    }

    setIsValid(true);
    setError(false);
  };

  const handlerEdit = async (e: FormEvent) => {
    e.preventDefault();

    if (
      fullName !== "" 
      // email !== "" &&
      // phoneNumber !== "" &&
      // address !== ""
    ) {
      setBtnLoading(true);
      setIsValid(false);
      setError(false);

      const { error, dataCustomer } = await editCustomer(item?._id!, values);

      if (!error) {
        dispatch({
          type: "EDIT_CUSTOMER",
          payload: { ...item!, ...dataCustomer },
        });

        onClose();
        return;
      }

      setError(true);
      setBtnLoading(false);
      return;
    }

    setIsValid(true);
    setError(false);
  };

  return (
    <RawModal onClose={onClose}>
      <form
        onSubmit={isEdit ? handlerEdit : handlerAdd}
        className="flex flex-col -mt-4 p-5 space-y-4 lg:px-8 sm:pb-6 xl:pb-8"
      >
        <h3 className="text-xl text-center font-medium text-gray-600">
          {isEdit ? "Edit customer" : "Add a new customer"}
        </h3>

        <TextInput
          name="fullName"
          placeholder="Full Name"
          value={fullName}
          onChange={handlerChange}
        />
        
          {isValid && errors.fullName !=="" ? (<div className="flex items-center justify-start">
            <p className="text-red-500 text-sm font-bold">
              Full Name is required.
            </p>
          </div>) : ""}


        <TextInput
          name="email"
          placeholder="Email Address"
          value={email}
          onChange={handlerChange}
        />

        <TextInput
          name="phoneNumber"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={handlerChange}
        />

        <TextInput
          name="address"
          placeholder="Address"
          value={address}
          onChange={handlerChange}
        />

        {/* Validation and Errors */}
        {isValid && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              All fields are required.
            </p>
          </div>
        )}

        {error && (
          <div className="flex items-center justify-end">
            <p className="text-red-500 text-sm font-bold">
              Something went wrong.
            </p>
          </div>
        )}

        <hr />

        {/* Footer */}
        <div className="flex items-center justify-end space-x-2">
          <Button label="Close" isClose click={onClose} />
          <Button
            label={btnLoading ? "Loading..." : isEdit ? "Edit" : "Add"}
            isSubmit
            isLoading={btnLoading}
          />
        </div>
      </form>
    </RawModal>
  );
};

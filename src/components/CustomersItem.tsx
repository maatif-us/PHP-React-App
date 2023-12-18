import { FC, useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { Customer } from "../interfaces";
import { deleteCustomer } from "../services";
import { Dialog } from "./Dialog";
import { Modal } from "./Modal";

interface CustomersItemProps {
  customer: Customer;
}

export const CustomersItem: FC<CustomersItemProps> = ({ customer }) => {
  const { fullName, email, address, phoneNumber, _id } = customer;

  const { dispatch } = useCustomers();
  const [showDialogDelete, setShowDialogDelete] = useState(false);
  const [showDialogEdit, setShowDialogEdit] = useState(false);
  const [btnLoading, setBtnLoading] = useState(false);
  const [error, setError] = useState(false);

  const handlerDelete = async () => {
    setBtnLoading(true);
    setError(false);

    const { error } = await deleteCustomer(_id);

    if (!error) {
      dispatch({ type: "DELETE_CUSTOMER", payload: _id });
      return;
    }

    setError(true);
    setBtnLoading(false);
  };

  return (
    <>
      <tr className="border-b odd:bg-white even:bg-gray-100 odd:bg-white even:bg-gray-50 border-gray-50">
        <td className="py-4 px-6 text-sm">{fullName}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{email}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{phoneNumber}</td>
        <td className="py-4 px-6 text-sm whitespace-nowrap">{address}</td>

        <td className="py-4 px-6 text-sm whitespace-nowrap space-x-3">
          <button
            onClick={() => setShowDialogEdit(true)}
            className="bg-green-500 hover:bg-green-600 text-white font-bold p-1.5 rounded-xl"
          >
            ✏️
          </button>
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold p-1.5 rounded-xl"
            onClick={() => setShowDialogDelete(true)}
          >
            🚫
          </button>
        </td>
      </tr>

      {showDialogDelete && (
        <Dialog
          click={handlerDelete}
          onClose={() => {
            setShowDialogDelete(false);
            setError(false);
            setBtnLoading(false);
          }}
          error={error}
          btnLoading={btnLoading}
        />
      )}

      {showDialogEdit && (
        <Modal
          isEdit
          item={customer}
          onClose={() => setShowDialogEdit(false)}
        />
      )}
    </>
  );
};

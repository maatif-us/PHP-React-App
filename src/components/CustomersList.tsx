import { useState } from "react";
import { useCustomers } from "../hooks/useCustomers";
import { Button } from "./Button";
import { CustomersItem } from "./CustomersItem";
import { Modal } from "./Modal";
import { Spinner } from "./Spinner";
import { Table } from "./Table";

export const CustomersList = () => {
  const { customers, loading, error } = useCustomers();
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      {loading && <Spinner />}

      {!loading && !error && (
        <>
          <div className="flex flex-col items-end mt-5">
            <Button
              label="New customer"
              click={() => setShowModal(!showModal)}
            />
          </div>

          <Table>
            {customers.map((item) => (
              <CustomersItem key={item._id} customer={item} />
            ))}

            {!customers.length && (
              <tr className="bg-white">
                <td colSpan={7} className="py-4 px-6 text-sm text-center">
                  <p className="font-semibold">There are no customer. 😢</p>
                </td>
              </tr>
            )}
          </Table>
        </>
      )}

      {error && (
        <div className="flex items-center justify-center h-89v">
          <p className="font-bold text-red-500 text-xl">{error} 😢</p>
        </div>
      )}

      {showModal && <Modal onClose={() => setShowModal(!showModal)} />}
    </>
  );
};

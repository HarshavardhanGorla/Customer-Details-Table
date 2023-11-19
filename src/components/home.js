import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getCustomerDetails } from "../api/api";
import CustomerDetailPage from "./customerDetails";
import Table from "./table";

function Home() {
  const [customerData, setCustomerData] = useState([]);
  const [selectedCustomer, setSelectedCustomer] = useState(null);

  const getCustomerDetailsApiCall = async () => {
    const { isError, data } = await getCustomerDetails();
    if (!isError) {
      setCustomerData(data);
    }
  };

  useEffect(() => {
    getCustomerDetailsApiCall();
  });

  return (
    <div className="mx-4 my-4">
      {!selectedCustomer ? (
        <>
          <Link to="/newcustomer">
            <button className="btn btn-primary my-2">Add Customer</button>
          </Link>
          <Table
            customerData={customerData}
            setSelectedCustomer={setSelectedCustomer}
          />
        </>
      ) : (
        <CustomerDetailPage
          updateCustomerData={selectedCustomer}
          setSelectedCustomer={setSelectedCustomer}
        />
      )}
    </div>
  );
}

export default Home;

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CreateCustomer, getCustomerDetails, UpdateCustomer } from "../api/api";

function CustomerDetailPage({ updateCustomerData, setSelectedCustomer }) {
  const navigate = useNavigate();

  const [customerDetails, setCustomerDetails] = useState(() => {
    return updateCustomerData
      ? updateCustomerData
      : {
          first_name: "first_name",
          last_name: "last_name",
          street: "street",
          address: "address",
          city: "city",
          state: "state",
          email: "email",
          phone: "phone",
        };
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isError = updateCustomerData
      ? await UpdateCustomer(customerDetails)
      : await CreateCustomer(customerDetails);
    console.log(isError, "asa");
    if (isError && !updateCustomerData) {
      navigate("/home");
    } else {
      setSelectedCustomer(false);
    }
  };
  const handleChange = (e) => {
    console.log(e.target.id, e.target.value);
    let customerData = customerDetails;
    customerData[e.target.id] = e.target.value;
    console.log(customerData[e.target.id], "dasdad");
    setCustomerDetails({ ...customerData });
  };

  return (
    <>
      <h3 className="mx-4 my-4">
        Customer Details<></>
      </h3>

      <div className="container">
        <div className="row">
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.first_name}
                id="first_name"
              />
            </div>
          </div>
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.last_name}
                id="last_name"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.street}
                id="street"
              />
            </div>
          </div>
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.address}
                id="address"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.city}
                id="city"
              />
            </div>
          </div>
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.state}
                id="state"
              />
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                value={customerDetails.email}
                id="email"
              />
            </div>
          </div>
          <div className="col">
            <div class="input-group mb-3 border border-primary">
              <input
                type="text"
                onChange={(e) => handleChange(e)}
                class="form-control"
                aria-label="phone"
                value={customerDetails.phone}
                id="phone"
              />
            </div>
          </div>
        </div>
        <button
          className="btn btn-primary float-right mr-2 "
          onClick={handleSubmit}
        >
          {updateCustomerData ? "Update" : "Submit"}
        </button>
      </div>
    </>
  );
}

export default CustomerDetailPage;

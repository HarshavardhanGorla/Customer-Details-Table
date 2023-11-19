import { useNavigate } from "react-router-dom";
import { DeleteCustomer } from "../api/api";

function Table({ customerData, setSelectedCustomer }) {
  const navigate = useNavigate();
  const handleEdit = (customerData) => {
    setSelectedCustomer(customerData);
  };
  const handleDelete = async (uuid) => {
    let isError = await DeleteCustomer(uuid);
    if (isError) {
      navigate("/");
    }
  };
  const renderData = () => {
    return customerData.map((customerDetail) => {
      return (
        <tr>
          <td>{customerDetail.first_name}</td>
          <td>{customerDetail.last_name}</td>
          <td>{customerDetail.address}</td>
          <td>{customerDetail.city}</td>
          <td>{customerDetail.email}</td>
          <td>{customerDetail.phone}</td>
          <td>
            <button onClick={() => handleEdit(customerDetail)}>Edit</button>{" "}
            <button onClick={() => handleDelete(customerDetail.uuid)}>
              Delete
            </button>
          </td>
        </tr>
      );
    });
  };

  return (
    <>
      <table class="table ">
        <thead>
          <tr>
            <th scope="col">First Name</th>
            <th scope="col">Last Name</th>
            <th scope="col">Address</th>
            <th scope="col">City</th>
            <th scope="col">Email</th>
            <th scope="col">Phone</th>
            <th scope="col">Action</th>
          </tr>
        </thead>
        <tbody>{renderData()}</tbody>
      </table>
    </>
  );
}

export default Table;

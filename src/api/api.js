import axios from 'axios';


const LoginAPi = async (email, password) => {
    try {
        let payload = {
           login_id: email,
        password: password,
      }
      const response = await axios.post('/sunbase/portal/api/assignment_auth.jsp', payload, {
        headers: {
          'Content-Type': 'application/json',
          
        },
      });
      console.log(response.data.access_token)
      return {isError:false,token:response.data.access_token}
    } catch (error) {
      console.error("Login API Error:", error);
      return { isError: true, token: '' };
    }
  };


const getCustomerDetails = async () => {
    try {
      let token =  localStorage.getItem('authToken')
      const response = await axios.get('/sunbase/portal/api/assignment.jsp?cmd=get_customer_list', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer " + token 
        },
      });
      console.log(response.data)
      return {isError:false,data:response.data}
    } catch (error) {
      return {isError:true,data:''}
    }
}


const CreateCustomer = async (data) => {
    try {
        let payload =data
      let token =  localStorage.getItem('authToken')

      const response = await axios.post('/sunbase/portal/api/assignment.jsp?cmd=create', payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer " + token 

          
        },
      });
      console.log(response.data.access_token)
      return true
    } catch (error) {
      return false
    }
  };

  const UpdateCustomer = async (data) => {
    try {
        let payload =data
      let token =  localStorage.getItem('authToken')

      const response = await axios.post(`/sunbase/portal/api/assignment.jsp?cmd=update&uuid=${data.uuid}`,payload, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer " + token 

          
        },
      });
      
      return true
    } catch (error) {
      return false
    }
  };


  const DeleteCustomer = async (uuid) => {
    try {
      let token =  localStorage.getItem('authToken')

      const response = await axios.post(`/sunbase/portal/api/assignment.jsp?cmd=delete&uuid=${uuid}`,{}, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization':"Bearer " + token 

          
        },
      });
      
      return true
    } catch (error) {
        console.log(error)
      return false
    }
  };


export {LoginAPi, getCustomerDetails, CreateCustomer, UpdateCustomer, DeleteCustomer}
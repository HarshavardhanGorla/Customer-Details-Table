import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { LoginAPi } from "../api/api";
import UserContext from "../context";

function Login(props) {
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const login = useContext(UserContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (login.login) {
      navigate("/home");
    }
  }, [login.login]);

  const invokeLoginApi = async (e) => {
    e.preventDefault();
    console.log("Email:", email);
    console.log("Password:", password);
    const { isError, token } = await LoginAPi(email, password);
    console.log("API Response - isError:", isError, "Token:", token);
    if (!isError) {
      props.setlogin({ login: true, authToken: token });
    }
  };
  

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
      }}
    >
      <div style={{ width: '450px' }}>
        <div className="mb-3 row">
          <label for="staticEmail" className="col-sm-2 col-form-label">
            Email
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="staticEmail"
              value={email}
              onChange={(e) => setemail(e.target.value)}
            />
          </div>
        </div>
        <div className="mb-3 row">
          <label for="inputPassword" className="col-sm-2 col-form-label">
            Password
          </label>
          <div className="col-sm-10">
            <input
              type="password"
              className="form-control"
              id="inputPassword"
              value={password}
              onChange={(e) => setpassword(e.target.value)}
            />
          </div>
          
        </div>
        <div style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}>
          <button
              type="button"
              class="btn btn-primary"
              onClick={(e) => invokeLoginApi(e)}
            >
              login
            </button>
        </div>
      </div>
    </div>
  );
}

export default Login;

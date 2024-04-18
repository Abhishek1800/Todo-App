import { useContext, useState } from "react"
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [error, setError] = useState("");

  const { dispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("https://mern-appl-wyiu.onrender.com/api/users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ email, password })
    });

    const json = await response.json();

    if (!response.ok) {
      console.log(json.error);
      setError(json.error);
    }

    if (response.ok) {
      console.log(json);
      dispatch({ type: "LOGIN", payload: json });

      localStorage.setItem("user", JSON.stringify(json));
    }
  }

  return (
    <>
      <form className="signup" onSubmit={handleSubmit}>

        <h3 >Sign In</h3>

        <div>
          <label >Email address</label>

          <input
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}

          />
        </div>

        <div>
          <label >Password</label>

          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}

          />
        </div>

        <div style={{ display: "flex"}}>
          <div><button >Login</button></div>
          <div style={{ width: '100%', height: "100px", display: 'flex', justifyContent: "center", alignItems: "center" }}> <Link to="/Signup" style={{ textDecoration: 'none' }}>
            <button style={{ padding: '0.5rem', borderRadius: '10px', backgroundColor: 'red', color: 'white', cursor: 'pointer' }}>Register</button>
          </Link></div>
        </div>
        {error && <div>{error}</div>}
      </form>
    </>

  )
}

export default Login;
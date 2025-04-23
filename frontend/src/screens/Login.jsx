import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../slices/authSlice";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
      dispatch(loginUser({ email, password }));
      toast.success("Login successfull!");
      navigate("/settings");
  };

  return (
    // <div className="d-flex justify-content-center align-items-center py-5">
    //   <div className="card shadow p-4" style={{ width: "25rem" }}>
    //     <h2 className="text-center mb-4">Login</h2>
    //     <form onSubmit={handleLogin}>
    //       <div className="mb-3">
    //         <label className="form-label">Email</label>
    //         <input
    //           type="email"
    //           className="form-control"
    //           placeholder="Enter Your Email"
    //           value={email}
    //           onChange={(e) => setEmail(e.target.value)}
    //         />
    //       </div>

    //       <div className="mb-3">
    //         <label className="form-label">Password</label>
    //         <input
    //           type="password"
    //           className="form-control"
    //           placeholder="Enter Your Password"
    //           value={password}
    //           onChange={(e) => setPassword(e.target.value)}
    //         />
    //       </div>

    //       <button className="btn btn-primary w-100">Login</button>

    //       <div className="d-flex gap-2 py-3 justify-content-center align-items-center">
    //         <span> New User?</span>{" "}
    //         <Link to="/register" className="nav-link" style={{ color: "blue" }}>
    //           Sign Up
    //         </Link>
    //       </div>
    //     </form>
    //   </div>
      // </div>
      <div className="d-flex justify-content-center align-items-center vh-100 bg-light">
  <div className="card shadow-lg border-0 p-4 rounded-4" style={{ width: "400px", backgroundColor: "#ffffff" }}>
    <h2 className="text-center mb-4 fw-bold" style={{ color: "#0d6efd" }}>Welcome Back</h2>
    <p className="text-center text-muted mb-4">Login to your account</p>
    <form onSubmit={handleLogin}>
      <div className="mb-3">
        <label className="form-label fw-semibold">Email Address</label>
        <input
          type="email"
          className="form-control rounded-3"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>

      <div className="mb-3">
        <label className="form-label fw-semibold">Password</label>
        <input
          type="password"
          className="form-control rounded-3"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </div>

      <div className="d-grid">
        <button className="btn btn-primary btn-lg rounded-3 shadow-sm" type="submit">
          Login
        </button>
      </div>

      <div className="text-center mt-4">
        <span className="text-muted">New User? </span>
        <Link to="/register" className="text-decoration-none fw-semibold" style={{ color: "#0d6efd" }}>
          Create an account
        </Link>
      </div>
    </form>
  </div>
</div>

  );
};

export default Login;

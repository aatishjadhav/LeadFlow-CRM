import { Link } from "react-router-dom";

const AccessDenied = () => {
  return (
    <div className="d-flex vh-100 justify-content-center align-items-center bg-light">
      <div className="bg-white p-5 rounded shadow text-center" style={{ maxWidth: "400px" }}>
        <div className="mb-3">
          <i className="bi bi-shield-lock-fill text-danger" style={{ fontSize: "2.5rem" }}></i>
        </div>
        <h2 className="mb-3 text-dark">Access Denied</h2>
        <p className="text-secondary mb-4">
          You do not have permission to view this page.
        </p>
        <Link to="/dashboard" className="btn btn-primary">
          Go to Dashboard
        </Link>
      </div>
    </div>
  );
};

export default AccessDenied;

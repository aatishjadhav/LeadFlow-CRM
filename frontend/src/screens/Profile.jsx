import { useDispatch, useSelector } from "react-redux";
import { logout } from "../slices/authSlice";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import Sidebar from "../components/Sidebar";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, status } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    toast.success("Logout successfull!");
    navigate("/");
  };

  return (
    <div className="container-fluid bg-light">
      {/* Sidebar */}
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar />
          </div>
        </div>

        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            height: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>
          <div className="py-3">
            {status === "loading" ? (
              <div
                className="d-flex justify-content-center align-items-center"
                style={{ height: "70vh" }}
              >
                <div className="spinner-border text-primary" role="status">
                  <span className="visually-hidden">Loading...</span>
                </div>
              </div>
            ) : (
              <>
               
                <div className="row justify-content-center">
                  <div className="col-12 col-sm-10 col-md-8 col-lg-6">
                    <div className="card text-center shadow p-4">
                      <h2 className="card-title mb-4">User Profile</h2>
                      <div className="card-body">
                        <img
                          src="https://i.imgur.com/LDOO4Qs.jpg"
                          alt="profile"
                          className="img-fluid rounded-circle mb-3"
                          style={{
                            width: "150px",
                            height: "150px",
                            objectFit: "cover",
                          }}
                        />
                        <p className="card-text fw-bold">
                          Full Name: {user?.name}
                        </p>
                        <p className="card-text fw-bold">
                          Email: {user?.email}
                        </p>
                        <button
                          onClick={handleLogout}
                          className="btn btn-danger mt-3"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

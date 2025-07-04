import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setFilterStatus } from "../slices/leadsSlice";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => state.auth);

  const { leads, filterStatus, status, error } = useSelector(
    (state) => state.leads
  );

  const leadCounts = leads.reduce(
    (acc, curr) => {
      acc.total += 1;
      if (curr.status === "New") acc.new += 1;
      if (curr.status === "Contacted") acc.contacted += 1;
      if (curr.status === "Qualified") acc.qualified += 1;
      return acc;
    },
    { total: 0, new: 0, contacted: 0, qualified: 0 }
  );

  const filteredLeads = filterStatus
    ? leads.filter((lead) => lead.status === filterStatus)
    : leads;

  const handleAddLead = () => {
    navigate("/add-lead");
  };

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);

  return (
    <div className="bg-light py-3 container-fluid">
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
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="col-12 col-md-9 col-lg-10 p-4">
          {/* Mobile Toggle */}
          <button
            className="btn btn-outline-primary d-md-none mb-4"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>

          {/* Header */}
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="fw-bold text-info mb-0">{user.role == "admin" ? "Leads Dashboard" : "Leads Assigned to You"}</h2>
            {user.role == "admin" && <button className="btn btn-dark shadow-sm" onClick={handleAddLead}>
              + Add New Lead
            </button>}
            
          </div>

          {/* Loader */}
          {status === "loading" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="#0d6efd"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <ul className="list-group mb-4 shadow-sm border rounded">
              {filteredLeads.map((lead) => (
                <li
                  className="list-group-item list-group-item-action d-flex justify-content-between align-items-center p-3 border-0 border-bottom"
                  key={lead._id}
                  style={{
                    transition: "background 0.3s, transform 0.2s",
                    cursor: "pointer",
                    backgroundColor: "light",
                  }}
                  onMouseOver={(e) => {
                    e.currentTarget.style.background = "#f1f3f5";
                    e.currentTarget.style.transform = "scale(1.005)";
                  }}
                  onMouseOut={(e) => {
                    e.currentTarget.style.background = "#fff";
                    e.currentTarget.style.transform = "scale(1)";
                  }}
                >
                  <Link
                    className="text-decoration-none text-dark fw-medium"
                    to={`/leads/${lead._id}`}
                    style={{ flex: 1 }}
                  >
                    <i className="bi bi-person-fill me-2 text-secondary"></i>
                    {lead.name}
                  </Link>
                  <span className="badge rounded-pill bg-light text-dark px-3 py-2 border">
                    {lead.status}
                  </span>
                </li>
              ))}
            </ul>
          )}

          {/* Error Alert */}
          {error && <div className="alert alert-danger">{error}</div>}

          {/* Lead Status Overview */}
          <section className="mb-5">
            <h4 className="fw-semibold text-secondary mb-3">
              Lead Status Overview
            </h4>
            <div className="d-flex gap-4 flex-wrap">
              <span className="badge rounded-pill bg-info p-3 fs-6 shadow-sm">
                New: {leadCounts.new}
              </span>
              <span className="badge rounded-pill bg-warning text-dark p-3 fs-6 shadow-sm">
                Contacted: {leadCounts.contacted}
              </span>
              <span className="badge rounded-pill bg-success p-3 fs-6 shadow-sm">
                Qualified: {leadCounts.qualified}
              </span>
            </div>
          </section>

          {/* Quick Filters */}
          <section className="mb-4">
            <h4 className="fw-semibold text-secondary mb-3">Quick Filters</h4>
            <div className="d-flex gap-4 flex-wrap">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="leadFilter"
                  id="filterNew"
                  checked={filterStatus === "New"}
                  onChange={() => dispatch(setFilterStatus("New"))}
                />
                <label className="form-check-label" htmlFor="filterNew">
                  New
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="leadFilter"
                  id="filterContacted"
                  checked={filterStatus === "Contacted"}
                  onChange={() => dispatch(setFilterStatus("Contacted"))}
                />
                <label className="form-check-label" htmlFor="filterContacted">
                  Contacted
                </label>
              </div>
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="radio"
                  name="leadFilter"
                  id="filterAll"
                  checked={!filterStatus}
                  onChange={() => dispatch(setFilterStatus(""))}
                />
                <label className="form-check-label" htmlFor="filterAll">
                  All
                </label>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;

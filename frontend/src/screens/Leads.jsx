import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { useSearchParams } from "react-router-dom";
import { fetchLeads } from "../slices/leadsSlice";
import { fetchAgents } from "../slices/agentsSlice";
import "./leads.css";
import Sidebar from "../components/Sidebar";

const Leads = () => {
  const dispatch = useDispatch();
  const [searchParams, setSearchParams] = useSearchParams();

  // Get leads and agents from Redux store
  const { leads, status } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.agents);

  // Extract filter values from URL
  const filters = {
    status: searchParams.get("status") || "",
    salesAgent: searchParams.get("salesAgent") || "",
    source: searchParams.get("source") || "",
  };

  // Fetch leads and agents when component loads or filters change
  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchLeads(filters));
  }, [dispatch, searchParams]);

  // Function to update filters in URL
  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    value ? newParams.set(key, value) : newParams.delete(key);
    setSearchParams(newParams);
  };

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
          <h1 className="text-center text-dark fw-bold display-6 mb-4">
            <i className="bi bi-person-lines-fill me-2 text-primary"></i>
            Leads Overview
          </h1>

          <div className="filters card border-0 shadow-sm rounded-4 p-4 mb-5">
            <h5 className="mb-4 text-secondary fw-semibold">
              <i className="bi bi-funnel-fill me-2 text-info"></i>
              Filter Leads
            </h5>

            <div className="row">
              {/* Status Filter */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold text-muted">
                  Status
                </label>
                <select
                  value={filters.status}
                  onChange={(e) => updateFilters("status", e.target.value)}
                  className="form-select shadow-sm rounded-pill"
                >
                  <option value="">All</option>
                  {[...new Set(leads.map((lead) => lead.status))].map(
                    (status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    )
                  )}
                </select>
              </div>

              {/* Sales Agent Filter */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold text-muted">
                  Sales Agent
                </label>
                <select
                  value={filters.salesAgent}
                  onChange={(e) => updateFilters("salesAgent", e.target.value)}
                  className="form-select shadow-sm rounded-pill"
                >
                  <option value="">All</option>
                  {agents?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>

              {/* Source Filter */}
              <div className="col-md-4 mb-3">
                <label className="form-label fw-semibold text-muted">
                  Source
                </label>
                <select
                  value={filters.source}
                  onChange={(e) => updateFilters("source", e.target.value)}
                  className="form-select shadow-sm rounded-pill"
                >
                  <option value="">All</option>
                  {[...new Set(leads.map((lead) => lead.source))].map(
                    (source) => (
                      <option key={source} value={source}>
                        {source}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>
          </div>

          {status === "loading" ? (
            <div className="d-flex justify-content-center align-items-center vh-100">
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
                wrapperStyle={{}}
                wrapperClass="rotating-lines"
              />
            </div>
          ) : (
            <div className="container mt-4">
              <div className="row">
                {leads.map((lead, index) => (
                  <div key={lead._id} className="col-md-6 col-lg-4 mb-4">
                    <div className="card shadow-sm border-light rounded">
                      <div className="card-body">
                        <h5 className="card-title text-dark">
                          Lead #{index + 1} - {lead.name}
                        </h5>
                        <p className="card-text">
                          <strong>Status:</strong> {lead.status || "No Status"}
                        </p>
                        <p className="card-text">
                          <strong>Sales Agent:</strong>{" "}
                          {lead.salesAgent?.name || "No Agent"}
                        </p>
                        <p className="card-text">
                          <strong>Source:</strong> {lead.source || "No Source"}
                        </p>
                        <Link
                          to={`/leads/${lead._id}`}
                          className="btn btn-outline-secondary btn-sm mt-2"
                        >
                          View Details
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Leads;

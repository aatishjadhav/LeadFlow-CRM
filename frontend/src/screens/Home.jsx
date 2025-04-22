// import { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchLeads, setFilterStatus } from "../slices/leadsSlice";
// import { Link } from "react-router-dom";
// import { useNavigate } from "react-router-dom";
// import { RotatingLines } from 'react-loader-spinner';
// import "./home.css";

// const Home = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const { leads, filterStatus, status, error } = useSelector(
//     (state) => state.leads
//   );

//   const leadCounts = leads.reduce(
//     (acc, curr) => {
//       acc.total += 1;
//       if (curr.status === "New") acc.new += 1;
//       if (curr.status === "Contacted") acc.contacted += 1;
//       if (curr.status === "Qualified") acc.qualified += 1;
//       return acc;
//     },
//     { total: 0, new: 0, contacted: 0, qualified: 0 }
//   );

//   const filteredLeads = filterStatus
//     ? leads.filter((lead) => lead.status === filterStatus)
//     : leads;

//   const handleAddLead = () => {
//     navigate("/add-lead");
//   };

//   useEffect(() => {
//     dispatch(fetchLeads());
//   }, [dispatch]);
//   return (
//     <>
//       {/* <h1 className="heading">Anvaya CRM Dashboard</h1> */}
//       <div className="home">
//         <div className="leads">
//           <h2>Leads:</h2>
//         </div>
//         <div className="">
//           {status === "loading" ? (
//             <div className="">
//             <RotatingLines
//             visible={true}
//             height="96"
//             width="96"
//             color="grey"
//             strokeWidth="5"
//             animationDuration="0.75"
//             ariaLabel="rotating-lines-loading"
//             wrapperStyle={{}}
//             wrapperClass=""
//               />
//               </div>
//           ) : (
//             <ul className="data">
//               {filteredLeads.map((lead) => (
//                 <li className="item" key={lead._id}>
//                   <Link className="nav-link nav" to={`/leads/${lead._id}`}>
//                     {lead.name}
//                   </Link>
//                 </li>
//               ))}
//             </ul>
//           )}
//         </div>
//         {error && <p>{error}</p>}
//       </div>
//       <div className="status">
//         <h3>Lead Status:</h3>
//         <p>New: [{leadCounts.new}] Leads</p>
//         <p>Contacted: [{leadCounts.contacted}] Leads</p>
//         <p>Qualified: [{leadCounts.qualified}] Leads</p>
//       </div>

//       <div className="filters">
//         <h3>Quick Filters</h3>
//         <input
//           type="radio"
//           name="leadFilter"
//           checked={filterStatus === "New"}
//           onChange={() => dispatch(setFilterStatus("New"))}
//         />
//         New
//         <input
//           type="radio"
//           name="leadFilter"
//           checked={filterStatus === "Contacted"}
//           onChange={() => dispatch(setFilterStatus("Contacted"))}
//         />
//         Contacted
//       </div>
//       <button className="lead-btn" onClick={handleAddLead}>
//         Add New Lead
//       </button>
//     </>
//   );
// };

// export default Home;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setFilterStatus } from "../slices/leadsSlice";
import { Link, useNavigate } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import Sidebar from "../components/Sidebar";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
    <div className="container-fluid">
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

        {/* Main Content */}
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
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2 className="mb-0">Leads Dashboard</h2>
            <button className="btn btn-primary" onClick={handleAddLead}>
              + Add New Lead
            </button>
          </div>

          {status === "loading" ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "150px" }}
            >
              <RotatingLines
                visible={true}
                height="96"
                width="96"
                color="grey"
                strokeWidth="5"
                animationDuration="0.75"
                ariaLabel="rotating-lines-loading"
              />
            </div>
          ) : (
            <ul className="list-group mb-4 shadow-sm">
              {filteredLeads.map((lead) => (
                <li className="list-group-item" key={lead._id}>
                  <Link
                    className="text-decoration-none text-dark fw-medium"
                    to={`/leads/${lead._id}`}
                  >
                    {lead.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}

          {error && <div className="alert alert-danger">{error}</div>}

          <section className="mb-5">
            <h4 className="mb-3">Lead Status Overview</h4>
            <div className="d-flex gap-4 flex-wrap">
              <div className="badge bg-primary p-3 fs-6">
                New: {leadCounts.new}
              </div>
              <div className="badge bg-secondary p-3 fs-6">
                Contacted: {leadCounts.contacted}
              </div>
              <div className="badge bg-success p-3 fs-6">
                Qualified: {leadCounts.qualified}
              </div>
            </div>
          </section>

          <section className="mb-4">
            <h4 className="mb-3">Quick Filters</h4>
            <div className="d-flex gap-3">
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

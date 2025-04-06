import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setFilterStatus } from "../slices/leadsSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RotatingLines } from 'react-loader-spinner';
import "./home.css";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads, filterStatus, status, error } = useSelector(
    (state) => state.leads
  );
  console.log("from home", leads);

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
    <>
      {/* <h1 className="heading">Anvaya CRM Dashboard</h1> */}
      <div className="home">
        <div className="leads">
          <h2>Leads:</h2>
        </div>
        <div className="">
          {status === "loading" ? (
            <div className="">
            <RotatingLines
            visible={true}
            height="96"
            width="96"
            color="grey"
            strokeWidth="5"
            animationDuration="0.75"
            ariaLabel="rotating-lines-loading"
            wrapperStyle={{}}
            wrapperClass=""
              />
              </div>
          ) : (
            <ul className="data">
              {filteredLeads.map((lead) => (
                <li className="item">
                  <Link className="nav-link nav" to={`/leads/${lead._id}`}>
                    {lead.name}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
        {error && <p>{error}</p>}
      </div>
      <div className="status">
        <h3>Lead Status:</h3>
        <p>New: [{leadCounts.new}] Leads</p>
        <p>Contacted: [{leadCounts.contacted}] Leads</p>
        <p>Qualified: [{leadCounts.qualified}] Leads</p>
      </div>

      <div className="filters">
        <h3>Quick Filters</h3>
        <input
          type="radio"
          name="leadFilter"
          checked={filterStatus === "New"}
          onChange={() => dispatch(setFilterStatus("New"))}
        />
        New
        <input
          type="radio"
          name="leadFilter"
          checked={filterStatus === "Contacted"}
          onChange={() => dispatch(setFilterStatus("Contacted"))}
        />
        Contacted
      </div>
      <button className="lead-btn" onClick={handleAddLead}>
        Add New Lead
      </button>
    </>
  );
};

export default Home;

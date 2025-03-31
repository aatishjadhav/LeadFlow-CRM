import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads, setFilterStatus } from "../slices/leadsSlice";
import Sidebar from "../components/Sidebar";
import { useNavigate } from "react-router-dom";

const Home = ({ homeMenu }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads, filterStatus } = useSelector((state) => state.leads);
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
    navigate("/leadForm");
  }

  useEffect(() => {
    dispatch(fetchLeads());
  }, [dispatch]);
  return (
    <>
      <h1 className="heading">Anvaya CRM Dashboard</h1>
      <div className="home">
        <Sidebar menuItems={homeMenu} />
        <div className="home1">
          <div className="lead">
            <h3>Leads:</h3>
            <div className="list">
              {filteredLeads.map((lead, index) => (
                <div key={index}>
                  <div className="item">
                    <span>Lead:</span>
                    <span className="">{lead.name}</span>
                  </div>
                </div>
              ))}
            </div>
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
          <button className="lead-btn" onClick={handleAddLead}>Add New Lead</button>
        </div>
      </div>
    </>
  );
};

export default Home;

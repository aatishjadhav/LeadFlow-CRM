import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchLeads } from "../slices/leadsSlice";
import Sidebar from "../components/Sidebar";

const Home = ({ homeMenu }) => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
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
              {leads.map((lead) => (
                <>
                  <div className="item">
                    <span>Lead:</span>
                    <span className="">{lead.name}</span>
                  </div>
                </>
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
            <input type="radio" />New
            <input type="radio" />Contacted
          </div>
          <button className="lead-btn">Add New Lead</button>
        </div>
      </div>
    </>
  );
};

export default Home;

import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import "./leads.css";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads } = useSelector((state) => state.leads);
  console.log("leads from Leads", leads);

  const [statusFilter, setStatusFilter] = useState("");
  const [salesAgentFilter, setSalesAgentFilter] = useState("");

  const filteredLeads = leads.filter((lead) => {
    return (
      (!statusFilter || lead.status === statusFilter) &&
      (!salesAgentFilter || lead.salesAgent?.name === salesAgentFilter)
    );
  });

  const handleAddLead = () => {
    navigate("/add-lead");
  };

  return (
    <div>
      <h1 className="heading">Leads Overview</h1>
      <ul>
        {filteredLeads.map((lead, index) => (
          <li key={lead._id}>
            Lead: [{index + 1}] - [{lead.status}] - [{lead.salesAgent.name}]
          </li>
        ))}
      </ul>
      <div className="filters">
        <h2>Filters:</h2>
        <label htmlFor="">Status:</label>
        <select
          name=""
          id=""
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          {leads
            .filter(
              (lead, index, self) =>
                index === self.findIndex((t) => t.status === lead.status)
            )
            .map((lead) => (
              <option value={lead.status}>{lead.status}</option>
            ))}
        </select>
        <br />
        <br />
        <label htmlFor="">Sales Agent:</label>
        <select
          value={salesAgentFilter}
          onChange={(e) => setSalesAgentFilter(e.target.value)}
        >
          {leads
            .filter(
              (lead, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.salesAgent?._id === lead.salesAgent?._id
                )
            )
            .map((lead) =>
              lead.salesAgent ? (
                <option key={lead.salesAgent._id} value={lead.salesAgent.name}>
                  {lead.salesAgent.name}
                </option>
              ) : null
            )}
        </select>
        <br />
        <br />
      </div>
      <button className="lead-btn" onClick={handleAddLead}>
        Add New Lead
      </button>
    </div>
  );
};

export default Leads;

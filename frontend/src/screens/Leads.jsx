import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import "./leads.css";
import { useNavigate } from "react-router-dom";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { leads } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.agents);

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
          {/* {agents
            .filter(
              (lead, index, self) =>
                index ===
                self.findIndex(
                  (t) => t._id === lead.salesAgent?._id
                )
            )
            .map((lead) =>
              lead.name ? (
                <option value={agent.name}>{agent.name}</option>
              ) : null
            )} */}
          {agents?.map((agent) => (
            <option value={agent.name}>{agent.name}</option>
          ))}
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

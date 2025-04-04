import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { fetchLeads } from "../slices/leadsSlice";
import { fetchAgents } from "../slices/agentsSlice";
import "./leads.css";

const Leads = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  const { leads } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.agents);

  // Get filters from URL
  const initialStatus = searchParams.get("status") || "";
  const initialAgent = searchParams.get("salesAgent") || "";
  const initialSource = searchParams.get("source") || "";

  const [statusFilter, setStatusFilter] = useState(initialStatus);
  const [salesAgentFilter, setSalesAgentFilter] = useState(initialAgent);
  const [sourceFilter, setSourceFilter] = useState(initialSource);

  useEffect(() => {
    dispatch(fetchAgents());
    dispatch(fetchLeads(Object.fromEntries(searchParams.entries()))); 
  }, [dispatch, searchParams]);

  // Update URL when filters change
  const updateFilters = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    setSearchParams(newParams);
  };

  return (
    <div>
      <h1 className="heading">Leads Overview</h1>

      <div className="filters">
        <h2>Filters:</h2>

        {/* Status Filter */}
        <label>Status:</label>
        <select
          value={statusFilter}
          onChange={(e) => {
            setStatusFilter(e.target.value);
            updateFilters("status", e.target.value);
          }}
        >
          <option value="">All</option>
          {[...new Set(leads.map((lead) => lead.status))].map((status) => (
            <option key={status} value={status}>
              {status}
            </option>
          ))}
        </select>

        <br /><br />

        {/* Sales Agent Filter */}
        <label>Sales Agent:</label>
        <select
          value={salesAgentFilter}
          onChange={(e) => {
            setSalesAgentFilter(e.target.value);
            updateFilters("salesAgent", e.target.value);
          }}
        >
          <option value="">All</option>
          {agents?.map((agent) => (
           <option key={agent._id} value={agent._id}>
           {agent.name}
         </option>
          ))}
        </select>

        <br /><br />

        {/* Source Filter */}
        <label>Source:</label>
        <select
          value={sourceFilter}
          onChange={(e) => {
            setSourceFilter(e.target.value);
            updateFilters("source", e.target.value);
          }}
        >
          <option value="">All</option>
          {[...new Set(leads.map((lead) => lead.source))].map((source) => (
            <option key={source} value={source}>
              {source}
            </option>
          ))}
        </select>
      </div>

      <ul>
        {leads.map((lead, index) => (
          <li key={lead._id}>
            [{index + 1}] - [{lead.status}] - [{lead.salesAgent?.name}] - [{lead.source}]
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leads;


// import { useDispatch, useSelector } from "react-redux";
// import { useEffect, useState } from "react";
// import "./leads.css";
// import { useNavigate, useLocation } from "react-router-dom";
// import { fetchAgents } from "../slices/agentsSlice";

// const Leads = () => {
//   const dispatch = useDispatch();
//   const navigate = useNavigate();
//   const location = useLocation();

//   const { leads } = useSelector((state) => state.leads);
//   const { agents } = useSelector((state) => state.agents);

//   const query = new URLSearchParams(location.search);

//   const [statusFilter, setStatusFilter] = useState("");
//   const [salesAgentFilter, setSalesAgentFilter] = useState("");
//   const [sortByPriority, setSortByPriority] = useState("");
//   const [sortByTimeToClose, setSortByTimeToClose] = useState("");

  

//   // 2. Update query when filters change
//   useEffect(() => {
//     const params = new URLSearchParams();
//     if (statusFilter) params.set("status", statusFilter);
//     if (salesAgentFilter) params.set("salesAgent", salesAgentFilter);
//     if (sortByPriority) params.set("sortByPriority", sortByPriority);
//     if (sortByTimeToClose) params.set("sortByTimeToClose", sortByTimeToClose);
//     navigate(`?${params.toString()}`, { replace: true });
//   }, [statusFilter, salesAgentFilter, sortByPriority, sortByTimeToClose]);

//   useEffect(() => {
//     dispatch(fetchAgents());
//   }, [dispatch]);

//   const filteredLeads = leads
//     .filter((lead) => {
//       return (
//         (!statusFilter || lead.status === statusFilter) &&
//         (!salesAgentFilter || lead.salesAgent?.name === salesAgentFilter)
//       );
//     })
//     .sort((a, b) => {
//       const priorityOrder = { High: 3, Medium: 2, Low: 1 };

//       if (sortByPriority) {
//         const priorityDiff = priorityOrder[b.priority] - priorityOrder[a.priority];
//         if (sortByPriority === "High" && priorityDiff !== 0) return priorityDiff;
//         else if (sortByPriority === "Low" && priorityDiff !== 0) return -priorityDiff;
//       }

//       if (sortByTimeToClose) {
//         return sortByTimeToClose === "asc"
//           ? a.timeToClose - b.timeToClose
//           : b.timeToClose - a.timeToClose;
//       }

//       return 0;
//     });

//   const handleAddLead = () => {
//     navigate("/add-lead");
//   };

//   return (
//     <div>
//       <h1 className="heading">Leads Overview</h1>
//       <ul>
//         {filteredLeads.map((lead, index) => (
//           <li key={lead._id}>
//             Lead: [{index + 1}] - [{lead.status}] - [{lead.salesAgent.name}] [{lead.priority}] [{lead.timeToClose}]
//           </li>
//         ))}
//       </ul>
//       <div className="filters">
//         <h2>Filters:</h2>
//         <label>Status:</label>
//         <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
//           <option value="">All</option>
//           {[...new Set(leads.map((lead) => lead.status))].map((status) => (
//             <option key={status} value={status}>{status}</option>
//           ))}
//         </select>
//         <br /><br />
//         <label>Sales Agent:</label>
//         <select value={salesAgentFilter} onChange={(e) => setSalesAgentFilter(e.target.value)}>
//           <option value="">All</option>
//           {agents?.map((agent) => (
//             <option key={agent._id} value={agent.name}>{agent.name}</option>
//           ))}
//         </select>
//         <br /><br />
//         <h2>Sort By:</h2>
//         <label>Priority:</label>
//         <select value={sortByPriority} onChange={(e) => setSortByPriority(e.target.value)}>
//           <option value="">None</option>
//           <option value="High">High</option>
//           <option value="Medium">Medium</option>
//           <option value="Low">Low</option>
//         </select>
//         <br /><br />
//         <label>Time to Close:</label>
//         <select value={sortByTimeToClose} onChange={(e) => setSortByTimeToClose(e.target.value)}>
//           <option value="">None</option>
//           <option value="asc">Ascending</option>
//           <option value="desc">Descending</option>
//         </select>
//       </div>
//       <button className="lead-btn" onClick={handleAddLead}>Add New Lead</button>
//     </div>
//   );
// };

// export default Leads;



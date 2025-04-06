import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addNewLead, fetchLeads, updateLead } from "../slices/leadsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAgents } from "../slices/agentsSlice";
import { toast } from "react-toastify";

const LeadForm = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const { leads } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.agents);

  const leadToEdit = location.state?.getLead || null;

  const [name, setName] = useState("");
  const [source, setSource] = useState("Website");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState("");

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch])

  useEffect(() => {
    if (leadToEdit) {
      setName(leadToEdit.name);
      setSource(leadToEdit.source);
      setSalesAgent(leadToEdit.salesAgent._id);
      setStatus(leadToEdit.status);
      setTags(leadToEdit.tags);
      setTimeToClose(leadToEdit.timeToClose);
      setPriority(leadToEdit.priority);
    }
  }, [leadToEdit]);

  const handleAdd =  async (e) => {
    e.preventDefault();
    const leadData = {
      name,
      source,
      salesAgent,
      status,
      tags:
        typeof tags === "string" ? tags.split(",").map((t) => t.trim()) : tags,
      timeToClose,
      priority,
    };
    
    if (leadToEdit) {
      const leadId = leadToEdit._id;
      dispatch(updateLead({ leadId, leadData }));
      toast.success("Lead updated successfully");
    } else {
      dispatch(addNewLead(leadData));
      toast.success("New Lead added");
      
    }
    await dispatch(fetchLeads());
    navigate("/");
  };
  return (
    <div>
      <h1>{leadToEdit ? "Update Lead" : "Add New Lead"}</h1>
      <form action="" onSubmit={handleAdd}>
        <label htmlFor="">Lead Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="">Lead Source:</label>
        <select
          name=""
          id=""
          value={source}
          onChange={(e) => setSource(e.target.value)}
        >
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Email">Email</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />

        <label htmlFor="">Sales Agent:</label>
        <select
          value={salesAgent}
          onChange={(e) => setSalesAgent(e.target.value)}
        >
          {/* {leads
            .filter(
              (lead, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.salesAgent?._id === lead.salesAgent?._id
                )
            ) 
            .map((lead) =>
              lead.salesAgent ? (
                <option key={lead.salesAgent._id} value={lead.salesAgent._id}>
                  {lead.salesAgent.name}
                </option>
              ) : null
            )} */}
          {agents?.map((agent) => (
            <option key={agent._id} value={agent._id}>{agent.name}</option>
          ))}
        </select>
        <br />
        <br />

        <label htmlFor="">Lead Status:</label>
        <select
          name=""
          id=""
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
          <option value="Qualified">Qualified</option>
        </select>
        <br />
        <br />

        <label htmlFor="">Priority:</label>
        <select
          name=""
          id=""
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
        <br />
        <br />

        <label htmlFor="">Time To Close:</label>
        <input
          type="number"
          placeholder="Number of Days"
          value={timeToClose}
          onChange={(e) => setTimeToClose(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="">Tags:</label>
        <select value={tags} onChange={(e) => setTags(e.target.value)}>
          {leads.map((lead) =>
            lead.tags && Array.isArray(lead.tags) ? (
              <option key={lead._id} value={lead.tags.join(", ")}>
                {lead.tags.join(", ")}
              </option>
            ) : null
          )}
        </select>

        <br />
        <br />

        <button className="leads-btn">{leadToEdit ? "Update" : "Add"}</button>
      </form>
    </div>
  );
};

export default LeadForm;

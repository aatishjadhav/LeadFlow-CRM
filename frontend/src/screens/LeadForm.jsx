import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addNewLead } from "../slices/leadsSlice";

const LeadForm = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const [name, setName] = useState("");
  const [source, setSource] = useState("Website");
  const [salesAgent, setSalesAgent] = useState("");
  const [status, setStatus] = useState("");
  const [priority, setPriority] = useState("");
  const [timeToClose, setTimeToClose] = useState("");
  const [tags, setTags] = useState("");

  const handleAdd = (e) => {
    e.preventDefault();
    const newLead = {
      name,
      source,
      salesAgent,
      status,
      tags,
      timeToClose,
      priority,
    };
    dispatch(addNewLead(newLead));
  };
  return (
    <div>
      <h1>Add New Lead</h1>
      <form action="" onSubmit={handleAdd}>
        <label htmlFor="">Lead Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br />
        <br />

        <label htmlFor="">Lead Source:</label>
        <select name="" id="" onChange={(e) => setSource(e.target.value)}>
          <option value="Website">Website</option>
          <option value="Referral">Referral</option>
          <option value="Cold Call">Cold Call</option>
          <option value="Advertisement">Advertisement</option>
          <option value="Email">Email</option>
          <option value="Other">Other</option>
        </select>
        <br />
        <br />

        {/* <label htmlFor="">Sales Agent:</label>
        <select onChange={(e) => setSalesAgent(e.target.value)}>
          {leads.map((lead, index) =>
            lead.salesAgent ? (
              <option
                key={`${lead?.salesAgent?._id}-${index}`}
                value={lead?.salesAgent?._id}
              >
                {lead.salesAgent.name}
              </option>
            ) : null
          )}
        </select>
        <br />
        <br /> */}

        <label htmlFor="">Sales Agent:</label>
        <select onChange={(e) => setSalesAgent(e.target.value)}>
          {leads
            .filter(
              (lead, index, self) =>
                index ===
                self.findIndex(
                  (t) => t.salesAgent?._id === lead.salesAgent?._id
                )
            ) // Filter unique sales agents
            .map((lead) =>
              lead.salesAgent ? (
                <option key={lead.salesAgent._id} value={lead.salesAgent._id}>
                  {lead.salesAgent.name}
                </option>
              ) : null
            )}
        </select>
        <br />
        <br />

        <label htmlFor="">Lead Status:</label>
        <select name="" id="" onChange={(e) => setStatus(e.target.value)}>
          <option value="New">New</option>
          <option value="Contacted">Contacted</option>
          <option value="Proposal Sent">Proposal Sent</option>
          <option value="Closed">Closed</option>
          <option value="Qualified">Qualified</option>
        </select>
        <br />
        <br />

        <label htmlFor="">Priority:</label>
        <select name="" id="" onChange={(e) => setPriority(e.target.value)}>
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
          onChange={(e) => setTimeToClose(e.target.value)}
        />
        <br />
        <br />

        <label htmlFor="">Tags:</label>
        <select onChange={(e) => setTags(e.target.value)}>
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

        <button>Add</button>
      </form>
    </div>
  );
};

export default LeadForm;

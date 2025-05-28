import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { addNewLead, fetchLeads, updateLead } from "../slices/leadsSlice";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchAgents } from "../slices/agentsSlice";
import { toast } from "react-toastify";
import Sidebar from "../components/Sidebar";

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
  }, [dispatch]);

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

  const handleAdd = async (e) => {
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
      await dispatch(updateLead({ leadId, leadData }));
      toast.success("Lead updated successfully");
    } else {
      await dispatch(addNewLead(leadData));
      toast.success("New Lead added");
    }
    await dispatch(fetchLeads());
    navigate("/dashboard");
  };
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
          <h1>{leadToEdit ? "Update Lead" : "Add New Lead"}</h1>
          <form
            onSubmit={handleAdd}
            className="container mt-4 p-4 border rounded shadow bg-light"
          >
            <div className="mb-3">
              <label className="form-label">Lead Name:</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lead Source:</label>
              <select
                value={source}
                onChange={(e) => setSource(e.target.value)}
                className="form-select"
              >
                <option value="Website">Website</option>
                <option value="Referral">Referral</option>
                <option value="Cold Call">Cold Call</option>
                <option value="Advertisement">Advertisement</option>
                <option value="Email">Email</option>
                <option value="Other">Other</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Sales Agent:</label>
              <select
                value={salesAgent}
                onChange={(e) => setSalesAgent(e.target.value)}
                className="form-select"
              >
                {agents?.map((agent) => (
                  <option key={agent._id} value={agent._id}>
                    {agent.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Lead Status:</label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="form-select"
              >
                <option value="New">New</option>
                <option value="Contacted">Contacted</option>
                <option value="Proposal Sent">Proposal Sent</option>
                <option value="Closed">Closed</option>
                <option value="Qualified">Qualified</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Priority:</label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="form-select"
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>

            <div className="mb-3">
              <label className="form-label">Time To Close (days):</label>
              <input
                type="number"
                placeholder="Number of Days"
                value={timeToClose}
                onChange={(e) => setTimeToClose(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Tags:</label>
              <select
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                className="form-select"
              >
                {leads.map((lead) =>
                  lead.tags && Array.isArray(lead.tags) ? (
                    <option key={lead._id} value={lead.tags.join(", ")}>
                      {lead.tags.join(", ")}
                    </option>
                  ) : null
                )}
              </select>
            </div>

            <button type="submit" className="btn btn-primary">
              {leadToEdit ? "Update Lead" : "+ Add Lead"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default LeadForm;

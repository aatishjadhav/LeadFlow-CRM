import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import "./leads.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { addComments, fetchComments } from "../slices/leadsSlice";
import { fetchAgents } from "../slices/agentsSlice";
import { toast } from "react-toastify";

const LeadDetails = () => {
  const dispatch = useDispatch();
  const { leads, comments } = useSelector((state) => state.leads);
  const { agents } = useSelector((state) => state.agents);
  const { leadId } = useParams();
  const [selectedAgent, setSelectedAgent] = useState("");
  const [commentText, setCommentText] = useState("");

  const getLead = leads.find((lead) => lead._id == leadId);

  useEffect(() => {
    dispatch(fetchComments(leadId));
    dispatch(fetchAgents());
  }, [dispatch, leadId]);

  const handleAddComment = () => {
    if (!commentText || !selectedAgent) {
      alert("Please select a sales agent and write a comment");
      return;
    }

    dispatch(addComments({ leadId, author: selectedAgent, commentText })).then(
      () => {
        setCommentText("");
        setSelectedAgent("");
        toast.success("added new comment.");
        dispatch(fetchComments(leadId));
      }
    );
  };

  return (
    <div className="container-fluid bg-light">
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
          <div className="container mt-2">
            <h1 className="mb-4">Lead Management: {getLead?.name}</h1>

            <div className="card mb-4">
              <div className="card-body">
                <h2 className="card-title">Lead Details</h2>
                <p className="card-text">
                  <strong>Lead Name:</strong> {getLead.name}
                </p>
                <p className="card-text">
                  <strong>Sales Agent:</strong> {getLead.salesAgent.name}
                </p>
                <p className="card-text">
                  <strong>Lead Source:</strong> {getLead.source}
                </p>
                <p className="card-text">
                  <strong>Lead Status:</strong> {getLead.status}
                </p>
                <p className="card-text">
                  <strong>Priority:</strong> {getLead.priority}
                </p>
                <p className="card-text">
                  <strong>Time to Close:</strong> {getLead.timeToClose} days
                </p>
                <Link
                  className="btn btn-outline-info mt-3"
                  to={`/edit-lead/${getLead._id}`}
                  state={{ getLead }}
                >
                  Edit Lead
                </Link>
              </div>
            </div>

            <div className="mb-4">
              <h2>Comments Section</h2>
              {comments.length > 0 ? (
                comments.map((comment) => (
                  <div className="border p-3 rounded mb-2" key={comment._id}>
                    <p className="mb-1">
                      <strong>Author:</strong> {comment.author}
                    </p>
                    <p className="mb-0">
                      <strong>Comment:</strong> {comment.commentText}
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-muted">No comments yet.</p>
              )}
            </div>

            <div className="mb-4">
              <h5>Add a Comment</h5>
              <div className="mb-3">
                <label className="form-label">Select Author</label>
                <select
                  value={selectedAgent}
                  onChange={(e) => setSelectedAgent(e.target.value)}
                  className="form-select"
                >
                  <option value="">Select Author</option>
                  {agents?.map((agent) => (
                    <option key={agent._id} value={agent._id}>
                      {agent.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-3">
                <label className="form-label">Comment</label>
                <textarea
                  value={commentText}
                  rows={4}
                  className="form-control"
                  onChange={(e) => setCommentText(e.target.value)}
                  placeholder="Write a comment..."
                ></textarea>
              </div>
              <button className="btn btn-dark" onClick={handleAddComment}>
                Add Comment
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadDetails;

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
        toast.success("added new comment.")
        dispatch(fetchComments(leadId));
      }
    );
  };

  return (
    <div>
      <h1>Lead Management: {getLead?.name}</h1>

      <h2 className="">Lead Details</h2>
      <p>Lead Name: {getLead.name}</p>
      <p>Sales Agent: {getLead.salesAgent.name}</p>
      <p>Lead Source: {getLead.source}</p>
      <p>Lead Status: {getLead.status}</p>
      <p>Priority: {getLead.priority}</p>
      <p>Time to Close: {getLead.timeToClose}</p>
      <Link
        className="edit-lead"
        to={`/edit-lead/${getLead._id}`}
        state={{ getLead }}
      >
        Edit Lead
      </Link>
      <div style={{ paddingTop: "1.5rem" }}>
        <h2>Comments Section</h2>
        {comments.map((comment) => (
          <div key={comment._id}>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.commentText}</p>
          </div>
        ))}
      </div>

      <div style={{paddingTop: '1.3rem'}}>
        <select
          value={selectedAgent}
          onChange={(e) => setSelectedAgent(e.target.value)}
        >
          <option value="">Select Author</option>
          {agents?.map((agent) => (
            <option key={agent._id} value={agent._id}>
              {agent.name}
            </option>
          ))}
        </select>{" "}
        <br />
        <br />
        <textarea
          value={commentText}
          rows={4}
          cols={25}
          onChange={(e) => setCommentText(e.target.value)}
          placeholder="write a comment..."
        ></textarea>
        <br />
        <br />
        <button className="edit-lead" onClick={handleAddComment}>
          Add Comment
        </button>
      </div>
    </div>
  );
};

export default LeadDetails;

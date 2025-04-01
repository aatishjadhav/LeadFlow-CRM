import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import { useParams } from "react-router-dom";
import "./leads.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchComments } from "../slices/leadsSlice";

const LeadDetails = () => {
  const dispatch = useDispatch();
  const { leads, comments } = useSelector((state) => state.leads);
  const { leadId } = useParams();

  const getLead = leads.find((lead) => lead._id == leadId);
  console.log("single", getLead);

  useEffect(() => {
    dispatch(fetchComments(leadId));
  }, [dispatch]);

  return (
    <div>
      <h1>Lead Management: {getLead.name}</h1>

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
      <div>
        <h2>Comments Section</h2>
        {comments.map((comment) => (
          <>
            <p>Author: {comment.author}</p>
            <p>Comment: {comment.commentText}</p>
          </>
        ))}
      </div>
    </div>
  );
};

export default LeadDetails;

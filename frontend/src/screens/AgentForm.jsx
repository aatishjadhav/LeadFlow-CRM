import { useState } from "react";
import "./agents.css";
import { useDispatch } from "react-redux";
import { addNewAgent } from "../slices/agentsSlice";
import { useNavigate } from "react-router-dom";


const AgentForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const newAgent = { name, email };
    dispatch(addNewAgent(newAgent));
    navigate("/agents");
  };
  return (
    <div>
      <h1>Add New Sales Agent</h1>
      <form action="" onSubmit={handleSubmit}>
        <label htmlFor="">Agent Name:</label>
        <input type="text" onChange={(e) => setName(e.target.value)} />
        <br />
        <br />

        <label htmlFor="">Email Address:</label>
        <input type="email" onChange={(e) => setEmail(e.target.value)} />
        <br />
        <br />
        <button type="submit" className="agents-btn">Create Agent</button>
      </form>
    </div>
  );
};

export default AgentForm;

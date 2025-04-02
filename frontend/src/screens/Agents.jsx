import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../slices/agentsSlice";
import "./agents.css";
import { Link } from "react-router-dom";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents } = useSelector((state) => state.agents);
  console.log("agents from screen", agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div>
      <h1>Sales Agent List</h1>
      <ul className="agent-main">
        {agents?.map((agent) => (
          <li key={agent._id} className="agents">
            Agent: [{agent.name}] - Email: [{agent.email}]
          </li>
        ))}
      </ul>
      <div className="agents-add">
        <Link to="/agents/add-new" className="nav-link agent-btn">Add Agent</Link>
      </div>
    </div>
  );
};

export default Agents;

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchAgents } from "../slices/agentsSlice";
import "./agents.css";
import { Link } from "react-router-dom";
import { RotatingLines } from "react-loader-spinner";
import { toast } from "react-toastify";

const Agents = () => {
  const dispatch = useDispatch();
  const { agents, status, error } = useSelector((state) => state.agents);

  useEffect(() => {
    dispatch(fetchAgents());
  }, [dispatch]);
  return (
    <div>
      <h1>Sales Agent List</h1>
      {status === "loading" ? (
        <RotatingLines
          visible={true}
          height="96"
          width="96"
          color="grey"
          strokeWidth="5"
          animationDuration="0.75"
          ariaLabel="rotating-lines-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      ) : (
        <ul className="agent-main">
          {agents?.map((agent) => (
            <li key={agent._id} className="agents">
              Agent: [{agent.name}] - Email: [{agent.email}]
            </li>
          ))}
        </ul>
      )}
      {error && <p>{error}</p>}

      <div className="agents-add">
        <Link to="/agents/add-new" className="nav-link agent-btn">
          Add Agent
        </Link>
      </div>
    </div>
  );
};

export default Agents;

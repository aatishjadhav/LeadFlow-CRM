import { useDispatch, useSelector } from "react-redux";
import Sidebar from "../components/Sidebar";
import "./leads.css";

const Leads = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  console.log("leads from Leads", leads);

  return (
    <div>
      <h1 className="heading">Leads List</h1>
     
    </div>
  );
};

export default Leads;

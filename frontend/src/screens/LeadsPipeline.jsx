import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchPipelineData } from "../slices/leadsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const LeadsPipeline = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);
  const { totalLeadsInPipeline } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchPipelineData());
  }, [dispatch]);

  // Filter leads that are closed
  const closedLeads = leads.filter((lead) => lead.status === "Closed").length; // Get count

  console.log(closedLeads); // Debugging to check closed leads

  // Data for Pie Chart
  const data = {
    labels: ["Leads In Pipeline", "Closed Leads"],
    datasets: [
      {
        data: [totalLeadsInPipeline, closedLeads], // Numeric values
        backgroundColor: ["#0088FE", "#00C49F"], // Colors for segments
        hoverBackgroundColor: ["#0077e6", "#00b38f"], // Hover effect
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <div style={{ width: "400px", height: "400px" }}>
      <h2>Leads In Pipeline</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default LeadsPipeline;

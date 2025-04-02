import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchPipelineData } from "../slices/leadsSlice";
import {
  Chart as ChartJS,
  BarElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const ClosedLeadsBySalesAgent = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchPipelineData());
  }, [dispatch]);

  // Filter leads to only include "Closed" leads
  const closedLeads = leads.filter((lead) => lead.status === "Closed");

  // Group closed leads by sales agent
  const salesAgentCounts = closedLeads.reduce((acc, lead) => {
    const agentName = lead.salesAgent?.name || "Unknown"; // Handle missing agent name
    acc[agentName] = (acc[agentName] || 0) + 1;
    return acc;
  }, {});

  // Get the highest count for Y-axis scaling
  const maxCount = Math.max(...Object.values(salesAgentCounts), 10); // Ensure min height

  // Chart data
  const data = {
    labels: Object.keys(salesAgentCounts), // Sales agents
    datasets: [
      {
        label: "Closed Leads",
        data: Object.values(salesAgentCounts), // Count of closed leads per agent
        backgroundColor: "#0088FE",
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      y: {
        beginAtZero: true,
        suggestedMax: maxCount + Math.ceil(maxCount * 0.1),
        ticks: {
          stepSize: Math.ceil(maxCount / 5),
        },
      },
      x: {
        ticks: {
          autoSkip: false, // Ensures all labels are visible
        },
        barPercentage: 0.5, // Decrease bar width (default is 0.9)
        categoryPercentage: 0.6, // Controls spacing between bars
      },
    },
  };

  return (
    <div style={{ width: "500px", height: "400px" }}>
      <h2>Closed Leads by Sales Agent</h2>
      <Bar data={data} options={options} />
    </div>
  );
};

export default ClosedLeadsBySalesAgent;

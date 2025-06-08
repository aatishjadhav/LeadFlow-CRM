import React, { useEffect } from "react";
import { Pie } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchPipelineData } from "../slices/leadsSlice";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend);

const LeadPieChart = () => {
  const dispatch = useDispatch();
  const { leads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchPipelineData());
  }, [dispatch]);

  // Count leads based on their status
  const statusCounts = leads.reduce((acc, lead) => {
    acc[lead.status] = (acc[lead.status] || 0) + 1;
    return acc;
  }, {});

  // Labels and data for the Pie Chart
  const data = {
    labels: Object.keys(statusCounts), // Lead statuses (e.g., "Open", "Closed", "In Progress")
    datasets: [
      {
        label: "Leads by Status",
        data: Object.values(statusCounts), // Count of leads per status
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#4BC0C0",
          "#9966FF",
        ], // Different colors for each slice
        hoverOffset: 10, // Adds a hover effect
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
      <h2>Lead Status Distribution</h2>
      <Pie data={data} options={options} />
    </div>
  );
};

export default LeadPieChart;

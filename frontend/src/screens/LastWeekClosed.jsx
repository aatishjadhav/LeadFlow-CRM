import React, { useEffect } from "react";
import { Bar } from "react-chartjs-2";
import { useDispatch, useSelector } from "react-redux";
import { fetchClosedLeads } from "../slices/leadsSlice";
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

const LastWeekClosed = () => {
  const dispatch = useDispatch();
  const { closedLeads } = useSelector((state) => state.leads);

  useEffect(() => {
    dispatch(fetchClosedLeads());
  }, [dispatch]);

  // Group leads by sales agent
  const agentData = closedLeads.reduce((acc, lead) => {
    if (!acc[lead.salesAgent]) {
      acc[lead.salesAgent] = [];
    }
    acc[lead.salesAgent].push(lead);
    return acc;
  }, {});

  // Labels (Sales Agents) & Data (Number of Closed Leads)
  const labels = Object.keys(agentData);
  const leadCounts = labels.map((agent) => agentData[agent].length);

  const maxCount = Math.max(...Object.values(leadCounts), 10);

  // Chart Data
  const data = {
    labels,
    datasets: [
      {
        label: "Closed Leads",
        data: leadCounts,
        backgroundColor: "#0088FE",
        borderColor: "#0056b3",
        borderWidth: 1,
      },
    ],
  };

  // Custom Tooltip to Show Lead Name & Closed Date
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
    plugins: {
      legend: { position: "top" },
      tooltip: {
        callbacks: {
          label: function (tooltipItem) {
            const agent = tooltipItem.label;
            const leads = agentData[agent];

            return leads
              .map(
                (lead) =>
                  `${lead.name} (Closed: ${new Date(
                    lead.closedAt
                  ).toLocaleDateString()})`
              )
              .join("\n");
          },
        },
      },
    },
  };

  return (
    <div style={{ width: "600px" }}>
      <h2>Closed Leads (Last Week)</h2>
      <div style={{ height: "400px" }}>
        <Bar data={data} options={options} />
      </div>
    </div>
  );
};

export default LastWeekClosed;

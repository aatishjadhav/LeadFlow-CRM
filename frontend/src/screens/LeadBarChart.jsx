// import React, { useEffect } from "react";
// import { Bar } from "react-chartjs-2";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPipelineData } from "../slices/leadsSlice";
// import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";

// // Register necessary Chart.js components
// ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// const LeadBarChart = () => {
//     const dispatch = useDispatch();
//     const { leads } = useSelector((state) => state.leads);

//     useEffect(() => {
//         dispatch(fetchPipelineData());
//     }, [dispatch]);

//     // Count leads based on their status
//     const statusCounts = leads.reduce((acc, lead) => {
//         acc[lead.status] = (acc[lead.status] || 0) + 1;
//         return acc;
//     }, {});

//     // Get the highest count for Y-axis scaling
//     const maxCount = Math.max(...Object.values(statusCounts), 10); // Ensuring a minimum height

//     // Labels and data for the Bar Chart
//     const data = {
//         labels: Object.keys(statusCounts), // Lead statuses (e.g., "Open", "Closed", "In Progress")
//         datasets: [
//             {
//                 label: "Total Leads",
//                 data: Object.values(statusCounts), // Count of leads per status
//                 backgroundColor: ["#0088FE", "#00C49F", "#FFBB28", "#FF8042"], // Different colors per bar
//                 borderWidth: 1,
//             },
//         ],
//     };

//     const options = {
//         responsive: true,
//         maintainAspectRatio: false,
//         scales: {
//             y: {
//                 beginAtZero: true,
//                 suggestedMax: maxCount + Math.ceil(maxCount * 0.1), // Add 10% padding to the top
//                 ticks: {
//                     stepSize: Math.ceil(maxCount / 5), // Adjust step size dynamically
//                 },
//             },
//         },
//         plugins: {
//             legend: {
//                 position: "top",
//             },
//         },
//     };

//     return (
//         <div style={{ width: "500px", height: "400px"}}>
//             <h2>Total Leads in Pipeline</h2>
//             <Bar data={data} options={options} />
//         </div>
//     );
// };

// export default LeadBarChart;


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
                backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "#4BC0C0", "#9966FF"], // Different colors for each slice
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

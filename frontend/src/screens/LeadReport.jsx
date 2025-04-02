// import React, { useEffect } from "react";
// import { PieChart, Pie, Cell, Tooltip, Legend } from "recharts";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPipelineData } from "../slices/leadsSlice";



// const COLORS = ["#0088FE", "#00C49F"]; // Blue for pipeline, Green for closed leads

// const LeadReport = () => {
//   const dispatch = useDispatch();
//   const { leads } = useSelector((state) => state.leads);
//   const totalLeadsInPipeline = useSelector(
//     (state) => state.leads.totalLeadsInPipeline
//   );

//   useEffect(() => {
//     dispatch(fetchPipelineData());
//   }, [dispatch]);

//   const closedLeads = leads.filter((lead) => lead.status === "Closed");
//   console.log("closed lead", closedLeads);
//   const closeCount = closedLeads.length;

//   const data = [
//     { name: "Leads In Pipeline", value: totalLeadsInPipeline },
//     { name: "Closed Leads", value: closeCount },
//   ];

//   return (
//     <div>
//       <h2>Leads Pipeline Report</h2>
//       <PieChart width={400} height={400}>
//         <Pie
//           data={data}
//           cx="50%"
//           cy="50%"
//           outerRadius={150}
//           fill="#8884d8"
//           dataKey="value"
//           label
//         >
//           {data.map((entry, index) => (
//             <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//           ))}
//         </Pie>
//         <Tooltip />
//         <Legend />
//       </PieChart>
//     </div>
//   );
// };

// export default LeadReport;

// import React, { useEffect } from "react";
// import { Pie } from "react-chartjs-2";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchPipelineData } from "../slices/leadsSlice";
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// // Register Chart.js components
// ChartJS.register(ArcElement, Tooltip, Legend);

// const LeadReport = () => {
//   const dispatch = useDispatch();
//   const { leads } = useSelector((state) => state.leads);
//   const totalLeadsInPipeline = useSelector(
//     (state) => state.leads.totalLeadsInPipeline
//   );

//   useEffect(() => {
//     dispatch(fetchPipelineData());
//   }, [dispatch]);

//   // Filter leads that are closed
//   const closedLeads = leads.filter((lead) => lead.status === "Closed").length; // Get count

//   console.log(closedLeads); // Debugging to check closed leads

//   // Data for Pie Chart
//   const data = {
//     labels: ["Pipeline Leads", "Closed Leads"],
//     datasets: [
//       {
//         data: [totalLeadsInPipeline, closedLeads], // Numeric values
//         backgroundColor: ["#0088FE", "#00C49F"], // Colors for segments
//         hoverBackgroundColor: ["#0077e6", "#00b38f"], // Hover effect
//       },
//     ],
//   };

//   const options = {
//     responsive: true,
//     maintainAspectRatio: false,
//     plugins: {
//       legend: {
//         position: "bottom",
//       },
//     },
//   };

//   return (
//     <div style={{ width: "400px", height: "400px" }}>
//       <h2>Leads Pipeline Report</h2>
//       <Pie data={data} options={options} />
//     </div>
//   );
// };

// export default LeadReport;


import ClosedLeadsBySalesAgent from "./ClosedLeadsBySalesAgent"
import LastWeekClosed from "./LastWeekClosed"
import LeadPieChart from "./LeadBarChart"
import LeadsPipeline from "./LeadStatusChart"


const LeadReport = () => {
    return (
        <div className="report">
           
            <LeadPieChart />
            <LastWeekClosed/>
            <ClosedLeadsBySalesAgent />
            <LeadsPipeline/>
        </div>
    )
}

export default LeadReport



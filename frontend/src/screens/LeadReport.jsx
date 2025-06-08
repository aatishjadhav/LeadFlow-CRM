import Sidebar from "../components/Sidebar";
import ClosedLeadsBySalesAgent from "./ClosedLeadsBySalesAgent";
import LastWeekClosed from "./LastWeekClosed";
import LeadPieChart from "./LeadPieChart";
import LeadsPipeline from "./LeadsPipeline";

const LeadReport = () => {
  return (
    <div className="container-fluid bg-light py-3">
      {/* Sidebar */}
      <div className="row">
        <div
          className="offcanvas offcanvas-start"
          tabIndex="-1"
          id="mobileSidebar"
          aria-labelledby="mobileSidebarLabel"
          style={{ width: "250px" }}
        >
          <div className="offcanvas-header">
            <button
              type="button"
              className="btn-close text-reset"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>
          <div className="offcanvas-body p-0">
            <Sidebar />
          </div>
        </div>

        <div
          className="col-12 col-md-3 col-lg-2 d-none d-md-block p-0"
          style={{
            position: "sticky",
            top: 0,
            minHeight: "100vh",
            overflowY: "auto",
          }}
        >
          <Sidebar />
        </div>
        <div className="col-12 col-md-9 col-lg-10 p-4">
          <button
            className="btn btn-outline-primary d-md-none mb-3"
            type="button"
            data-bs-toggle="offcanvas"
            data-bs-target="#mobileSidebar"
            aria-controls="mobileSidebar"
          >
            ☰ Menu
          </button>
          <div className="report">
            <LeadPieChart />
            <LastWeekClosed />
            <ClosedLeadsBySalesAgent />
            <LeadsPipeline />
          </div>
        </div>
      </div>
    </div>
  );
};

export default LeadReport;

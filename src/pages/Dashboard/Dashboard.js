import { Routes, Route } from "react-router-dom";

import Sidebar from "../../components/Sidebar";
// import BooksTable from "../../components/BooksTable";
// import StaffsTable from "../../components/StaffsTable";
// import ActionHistory from "../../components/ActionHistory";

const Dashboard = () => {
  return (
    <div style={{ display: "flex" }}>
      <div>
        <Sidebar />
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        {/* <Routes>
          <Route path="books" element={<BooksTable />} />
          <Route path="staffs" element={<StaffsTable />} />
          <Route path="action-history" element={<ActionHistory />} />
        </Routes> */}
      </div>
    </div>
  );
};

export default Dashboard;

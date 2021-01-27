import React, { useEffect, useState } from "react";
function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  return (
    <div className="col s12 m7">
      <h2 className="header">Dashboard</h2>
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

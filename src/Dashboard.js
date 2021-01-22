import React, { useEffect, useState } from "react";
import axiosInstance from "./authAxios";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);

  const fetchDocuments = () => {
    setLoading(true);
    axiosInstance
      .get("documents/?page=1&limit=10")
      .then((response) => {
        setLoading(false);
        setDocs(response.data.payload);
      })
      .catch((err) => console.log("Error", err));
  };

  const createDoc = (document) => {
    axiosInstance.post("documents");
  };

  useEffect(() => {
    fetchDocuments();
  }, []);

  return (
    <div className="col s12 m7">
      <h2 className="header">Dashboard</h2>
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            {loading && "Loading..."}
            {docs.length && docs[0].title}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

import React, { useEffect, useState } from "react";
import axiosInstance from "./authAxios";

function Dashboard() {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState([]);
  const [newDoc, setNewDoc] = useState([]);
  const [submitting, setSubmitting] = useState(false);

  const fetchDocuments = () => {
    setLoading(true);
    axiosInstance
      .get("documents/?page=1&limit=10", { withCredentials: true })
      .then((response) => {
        setLoading(false);
        setDocs(response.data.payload);
      })
      .catch((err) => console.log("Error", err));
  };

  const createDoc = (e) => {
    e.preventDefault();
    setSubmitting(true);
    axiosInstance
      .post("documents", newDoc)
      .then((res) => {
        setSubmitting(false);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    const doc = { ...newDoc };
    doc[name] = value;
    setNewDoc(doc);
  };
  useEffect(() => {
    console.log("hello");
    fetchDocuments();
  }, []);

  const documentList = docs.map((item) => (
    <li className="collection-item">Title: {item.title}</li>
  ));
  return (
    <div className="col s12 m7">
      <h2 className="header">Dashboard</h2>
      <div className="card horizontal">
        <div className="card-stacked">
          <div className="card-content">
            {loading && "Loading..."}
            {docs.length && <ul className="collection"> {documentList}</ul>}
          </div>

          <div className="card-content">
            <h1>Create Document</h1>
            <form onSubmit={createDoc}>
              <div>
                <label>
                  Title
                  <input
                    type="text"
                    required
                    maxLength={255}
                    name="title"
                    onChange={handleChange}
                  />
                </label>
                <label>
                  Content
                  <input
                    type="text"
                    required
                    maxLength={1000}
                    name="content"
                    onChange={handleChange}
                  />
                </label>
                <button
                  className="btn red waves-light lighten-2"
                  disabled={submitting}
                  type="submit"
                >
                  {submitting ? "Loading..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;

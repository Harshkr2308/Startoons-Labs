import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Graph from "./Graph";

const DashBoard = () => {
  const [data, setData] = useState([]);
  const [showGraph, setShowGraph] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://startoons-labs.onrender.com/users");
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const filteredData = data.filter((item) => item.role === "user");
  const auth = localStorage.getItem("user");
 const navigate=useNavigate();
  const logout = () => {
    localStorage.clear();
    navigate("/");
  };
  return (
    <>
      <div className="header">
        <div className="lft">
          <p onClick={() => setShowGraph(false)}>Home</p>
          <p onClick={() => setShowGraph(true)}>Graph</p>
          <p onClick={logout}>Logout</p>
        </div>
        <div className="rht">
          <input type="text" />
          <button>Search</button>
        </div>
      </div>
      <div className="bottom">
        {showGraph ? (
          <Graph data={filteredData} />
        ) : (
          <table className="dashboard-table">
            <thead style={{ backgroundColor: "skyblue" }}>
              <tr>
                <th>S.No</th>
                <th>Name</th>
                <th>Email</th>
                <th>Count</th>
                <th>Last Login Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.map((item, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{item.name}</td>
                  <td>{item.email}</td>
                  <td>{item.count}</td>
                  <td>{new Date(item.lastLoginDate).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
};

export default DashBoard;

import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  CartesianGrid,
} from "recharts";

const Graph = ({ data }) => {
  const [viewBy, setViewBy] = useState("date"); // state to toggle between 'date' and 'month'
  const [selectedOption, setSelectedOption] = useState(""); // state to store the selected date or month

  const formatData = (viewBy) => {
    if (viewBy === "date") {
      return data.map((item) => ({
        date: new Date(item.lastLoginDate).toLocaleDateString(),
        count: item.count,
      }));
    } else {
      const monthData = {};
      data.forEach((item) => {
        const month = new Date(item.lastLoginDate).toLocaleDateString("default", {
          year: "numeric",
          month: "short",
        });
        if (!monthData[month]) {
          monthData[month] = 0;
        }
        monthData[month] += item.count;
      });
      return Object.keys(monthData).map((month) => ({
        date: month,
        count: monthData[month],
      }));
    }
  };

  const formattedData = formatData(viewBy);

  const availableOptions = [...new Set(data.map((item) => {
    return viewBy === "date"
      ? new Date(item.lastLoginDate).toLocaleDateString()
      : new Date(item.lastLoginDate).toLocaleDateString("default", { year: "numeric", month: "short" });
  }))];

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const filteredData = formattedData.filter(item => item.date === selectedOption || selectedOption === "");

  const cnt = filteredData.reduce((acc, item) => acc + item.count, 0);

  return (
    <div className="graph">
      <div className="topg">
        <div className="content">
          <p className="num">{cnt}</p>
          <p>Total User Count</p>
        </div>
        <div className="content">
          <p className="num">XX</p>
          <p>Total Click Count</p>
        </div>
      </div>
      <div className="botg">
        <BarChart width={600} height={300} data={filteredData} className="bar">
          <XAxis dataKey="date" stroke="#8884d8" />
          <YAxis domain={[0, 9]} tickCount={10} />
          <Tooltip wrapperStyle={{ width: 100, backgroundColor: "#ccc" }} />
          <Legend
            width={100}
            wrapperStyle={{
              top: 40,
              right: 20,
              backgroundColor: "#f5f5f5",
              border: "1px solid #d5d5d5",
              borderRadius: 3,
              lineHeight: "40px",
            }}
          />
          <CartesianGrid stroke="#ccc" />
          <Bar dataKey="count" fill="blue" barSize={30} />
        </BarChart>
        <div className="chose">
          <div>
            <div onClick={() => setViewBy("date")}>MyDate</div>
            {viewBy === "date" && (
              <select onChange={handleOptionChange} value={selectedOption}>
                <option value=""></option>
                {availableOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
          <div>
            <div onClick={() => setViewBy("month")}>Month</div>
            {viewBy === "month" && (
              <select onChange={handleOptionChange} value={selectedOption}>
                <option value=""></option>
                {availableOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Graph;

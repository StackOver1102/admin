import React from "react";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Register necessary components in ChartJS
ChartJS.register(ArcElement, Tooltip, Legend);

const SaleStatistics = (props) => {
  const { totalRevenueByOrigin } = props;

  // Data for the pie chart
  const data = {
    labels: totalRevenueByOrigin?.map((item) => (item._id === null ? 'Other' : item._id)),
    datasets: [
      {
        label: 'Sales Distribution',
        data: totalRevenueByOrigin?.map((item) => item.totalRevenue),
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sale statistics</h5>
          {/* Pie chart */}
          <Pie data={data} />
        </article>
      </div>
    </div>
  );
};

export default SaleStatistics;

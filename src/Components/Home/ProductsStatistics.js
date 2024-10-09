import React from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const SalesMonthStatistics = (props) => {
  const { totalRevenueByMonth } = props;

  // Prepare the chart data
  const labels = totalRevenueByMonth.map((item) => `Month ${item._id.month}`);
  const data = {
    labels,
    datasets: [
      {
        label: "Total Revenue (VND)",
        data: totalRevenueByMonth.map((item) => item.totalRevenue),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        fill: true,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "Monthly Sales Statistics",
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function (value) {
            return new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(value);
          },
        },
      },
    },
  };

  return (
    <div className="col-xl-6 col-lg-12">
      <div className="card mb-4 shadow-sm">
        <article className="card-body">
          <h5 className="card-title">Sales Month Statistics</h5>
          {totalRevenueByMonth && totalRevenueByMonth.length > 0 ? (
            <Line data={data} options={options} />
          ) : (
            <p>No data available</p>
          )}
        </article>
      </div>
    </div>
  );
};

export default SalesMonthStatistics;

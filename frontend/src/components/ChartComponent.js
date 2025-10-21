import React, { useRef, useEffect } from 'react';
import { Chart, registerables } from 'chart.js';
import { Line } from 'react-chartjs-2';

Chart.register(...registerables);

const ChartComponent = () => {
  const chartRef = useRef(null);

  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Performance',
        data: [65, 59, 80, 81, 56, 55],
        fill: false,
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1
      }
    ]
  };

  useEffect(() => {
    if (!chartRef.current) return;
    const chartInstance = chartRef.current;
    chartInstance.update();
  }, []);

  return (
    <div>
      <h2>Performance Overview</h2>
      <Line ref={chartRef} data={data} />
    </div>
  );
};

export default ChartComponent;

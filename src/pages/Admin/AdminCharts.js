import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'chartjs-adapter-moment';

function AdminCharts() {
  useEffect(() => {
    fetchChartData();
  }, []);

  function fetchChartData() {
    fetch('https://localhost:7225/api/Events/GetEventChart')
      .then((response) => response.json())
      .then((data) => {
        displayChartData(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }

  function displayChartData(chartData) {
    const groupedData = {};
    chartData.forEach((dataItem) => {
      const eventType = dataItem.eventType;
      if (!groupedData[eventType]) {
        groupedData[eventType] = [];
      }
      groupedData[eventType].push(dataItem);
    });

    Object.keys(groupedData).forEach((eventType) => {
      const eventData = groupedData[eventType];
      eventData.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      const labels = eventData.map((dataItem) => {
        const eventDate = new Date(dataItem.eventDate);
        const startOfMonth = new Date(eventDate.getFullYear(), eventDate.getMonth(), 1);
        return moment(startOfMonth).format('MMM YYYY');
      });
      const values = eventData.map((dataItem) => dataItem.eventCount);

      const chartContainer = document.createElement('div');
      chartContainer.className = 'chart-container';
      document.getElementById('chartContainer').appendChild(chartContainer);

      const chartTitle = document.createElement('h2');
      chartTitle.textContent = eventType;
      chartContainer.appendChild(chartTitle);

      const chartCanvas = document.createElement('canvas');
      chartContainer.appendChild(chartCanvas);

      new Chart(chartCanvas, {
        type: 'line',
        data: {
          labels: labels,
          datasets: [
            {
              label: 'Event Count',
              data: values,
              backgroundColor: 'rgba(0, 123, 255, 0.7)',
              borderColor: 'rgba(0, 123, 255, 1)',
              borderWidth: 1,
              fill: false,
            },
          ],
        },
        options: {
          scales: {
            x: {
              type: 'time',
              time: {
                unit: 'month',
                displayFormats: {
                  month: 'MMM YYYY',
                },
              },
              ticks: {
                source: 'labels',
              },
            },
            y: {
              beginAtZero: true,
              precision: 0,
              title: {
                display: true,
                text: 'Count',
              },
            },
          },
        },
      });
    });
  }

  return <center><div id="chartContainer"></div></center>;
}

export default AdminCharts;

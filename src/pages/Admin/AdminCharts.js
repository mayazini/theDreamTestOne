import React, { useEffect } from 'react';
import Chart from 'chart.js/auto';
import moment from 'moment';
import 'moment/locale/en-gb';
import 'chartjs-adapter-moment';
import '../../designPages/Charts.css'
import ProtectedRoute from '../../components/ProtectedRoute';

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
    const eventTypesSet = new Set(); // Keep track of unique event types
    
    chartData.forEach((dataItem) => {
      const eventType = dataItem.EventType;
      if (!eventTypesSet.has(eventType)) {
        eventTypesSet.add(eventType);
        groupedData[eventType] = [];
      }
      groupedData[eventType].push(dataItem);
    });

    Object.keys(groupedData).forEach((eventType) => {
      const eventData = groupedData[eventType];
      eventData.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));

      const labels = eventData.map((dataItem) => moment(dataItem.eventDate).format('MMM D'));
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
                unit: 'day',
                displayFormats: {
                  day: 'MMM D',
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

  return  <ProtectedRoute allowedRoles={['admin']}><center><div id="chartContainer" className="chart-container"></div></center></ProtectedRoute>;
}

export default AdminCharts;

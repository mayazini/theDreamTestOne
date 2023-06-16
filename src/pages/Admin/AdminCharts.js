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
    const eventTypes = new Set();
  
    chartData.forEach((dataItem) => {
      const eventType = dataItem.eventType;
      eventTypes.add(eventType);
    });
  
    const chartContainer = document.getElementById('chartContainer');
    chartContainer.innerHTML = ''; // Clear previous content
  
    eventTypes.forEach((eventType) => {
      const eventData = chartData.filter((dataItem) => dataItem.eventType === eventType);
      eventData.sort((a, b) => new Date(a.eventDate) - new Date(b.eventDate));
  
      const labels = eventData.map((dataItem) =>
        moment(dataItem.eventDate).format('MMM D')
      );
      const values = eventData.map((dataItem) => dataItem.eventCount);
  
      const chartDiv = document.createElement('div');
      chartDiv.className = 'chart-container';
      chartContainer.appendChild(chartDiv);
  
      const chartTitle = document.createElement('h2');
      chartTitle.textContent = eventType;
      chartDiv.appendChild(chartTitle);
  
      const chartCanvas = document.createElement('canvas');
      chartDiv.appendChild(chartCanvas);
  
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
                text: 'Events',
              },
            },
          },
        },
      });
    });
  }
  

  return  <ProtectedRoute allowedRoles={['admin']}><center><h1>Site data as of {moment().format('MMMM YYYY')}</h1><div id="chartContainer" className="chart-container"></div></center></ProtectedRoute>;
}

export default AdminCharts;

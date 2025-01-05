// Mock data for the Transect Plot
function generateMockTransectData() {
    const distances = Array.from({ length: 10 }, (_, i) => i * 10); // Distance in km
    const temperature = distances.map(d => 15 + Math.sin(d / 10) * 2); // Temperature in °C
    const salinity = distances.map(d => 35 + Math.cos(d / 10) * 1); // Salinity in PSU
    const oxygen = distances.map(d => 6 + Math.sin(d / 15) * 1.5); // Oxygen in ml/L
    const acidity = distances.map(d => 8.1 + Math.cos(d / 20) * 0.3); // Acidity (pH)
    const currents = distances.map(d => 0.5 + Math.sin(d / 5) * 0.3); // Currents in m/s
    const seaIce = distances.map(d => 10 + Math.cos(d / 10) * 2); // Sea ice in %
  
    return { distances, temperature, salinity, oxygen, acidity, currents, seaIce };
  }
  
  // Chart.js configuration for Transect Plot
  function createTransectPlot() {
    const { distances, temperature, salinity, oxygen, acidity, currents, seaIce } = generateMockTransectData();
    
    const ctx = document.getElementById('transectPlot').getContext('2d');
    new Chart(ctx, {
      type: 'line',
      data: {
        labels: distances,
        datasets: [
          {
            label: 'Temperature (°C)',
            data: temperature,
            borderColor: '#ff6347',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Salinity (PSU)',
            data: salinity,
            borderColor: '#1e90ff',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Oxygen (ml/L)',
            data: oxygen,
            borderColor: '#32cd32',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Acidity (pH)',
            data: acidity,
            borderColor: '#ff9900',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Currents (m/s)',
            data: currents,
            borderColor: '#9933cc',
            fill: false,
            tension: 0.4,
          },
          {
            label: 'Sea Ice (%)',
            data: seaIce,
            borderColor: '#66ccff',
            fill: false,
            tension: 0.4,
          }
        ]
      },
      options: {
        responsive: true,
        plugins: {
          title: {
            display: true,
            text: 'Ocean Transect Plot'
          }
        },
        scales: {
          x: {
            title: {
              display: true,
              text: 'Distance (km)'
            }
          },
          y: {
            title: {
              display: true,
              text: 'Value'
            }
          }
        }
      }
    });
  }
createTransectPlot();
  
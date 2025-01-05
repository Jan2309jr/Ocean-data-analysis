function showPage(pageId) {
	const pages = document.querySelectorAll('.page');
	pages.forEach(page => page.classList.remove('active'));
  
	const selectedPage = document.getElementById(pageId);
	if (selectedPage) {
	  selectedPage.classList.add('active');
	  initChart(pageId);
	}
  }
  // Mock Data Generation
  function generateMockCTDData() {
	const depths = Array.from({ length: 20 }, (_, i) => i * 50); // Depths in meters
	const temperatures = depths.map(d => 20 - d * 0.05); // Decreasing temp with depth
	const salinities = depths.map(d => 35 + d * 0.02); // Increasing salinity with depth
	return { depths, temperatures, salinities };
  }
  
  function generateMockTransectData() {
	const distances = Array.from({ length: 10 }, (_, i) => i * 10); // Distances in km
	const temperature = distances.map(d => 15 + Math.sin(d / 10) * 2); // variation
	const salinity = distances.map(d => 35 + Math.cos(d / 10) * 1); // variation
	return { distances, temperature, salinity };
  }
  function initChart(pageId) {
	if (pageId === 'CTD') {
	  const { depths, temperatures, salinities } = generateMockCTDData();
	  const ctx = document.getElementById('ctdProfile').getContext('2d');
	  new Chart(ctx, {
		type: 'line',
		data: {
		  labels: depths,
		  datasets: [
			{
			  label: 'Temperature (°C)',
			  data: temperatures,
			  borderColor: '#ff6347',
			  fill: false,
			},
			{
			  label: 'Salinity (PSU)',
			  data: salinities,
			  borderColor: '#1e90ff',
			  fill: false,
			},
		  ],
		},
		options: {
		  responsive: true,
		  scales: {
			x: { title: { display: true, text: 'Depth (m)' } },
			y: { title: { display: true, text: 'Value' } },
		  },
		},
	  });
	}
  
	if (pageId === 'TS') {
	  const { depths, temperatures, salinities } = generateMockCTDData();
	  const ctx = document.getElementById('tsDiagram').getContext('2d');
	  new Chart(ctx, {
		type: 'scatter',
		data: {
		  datasets: [
			{
			  label: 'T-S Data',
			  data: temperatures.map((temp, i) => ({ x: salinities[i], y: temp })),
			  backgroundColor: '#32cd32',
			},
		  ],
		},
		options: {
		  responsive: true,
		  plugins: {
			title: {
			  display: true,
			  text: 'Temperature-Salinity Diagram',
			},
		  },
		  scales: {
			x: { title: { display: true, text: 'Salinity (PSU)' } },
			y: { title: { display: true, text: 'Temperature (°C)' } },
		  },
		},
	  });
	}

	if (pageId === 'Transect') {
		iframe.src = 'transect.html';
	}
	if (pageId === 'TenYears') {
	  async function fetchSalinityData() {
		// Replace this mock data with real API responses
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const salinityValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); // Mock salinity range: 30-35 PSU
		return { years, salinityValues };
		}
		async function initChart() {
		const data = await fetchSalinityData();
		const ctx = document.getElementById('salinityChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Salinity (PSU)',
			data: data.salinityValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Salinity'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw} PSU`
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Salinity (PSU)'
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		
		// linear graph func-calling
		initChart();
		
		//sea ice
		async function fetchSeaIceData() {
		// Replace this mock data with real API responses
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const seaIceValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); // Mock salinity range: 30-35 PSU
		return { years, seaIceValues };
		}
		async function initChartIce() {
		const data = await fetchSeaIceData();
		
		const ctx = document.getElementById('seaIceChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Sea Ice',
			data: data.seaIceValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Sea Ice'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw}`
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Sea Ice'
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		initChartIce();
		
		//Temperature
		async function fetchTempData() {
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const tempValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); 
		return { years, tempValues };
		}
		async function initChartTemp() {
		const data = await fetchTempData();
		
		const ctx = document.getElementById('tempChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Temperature',
			data: data.tempValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Temperature'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw} *C`
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Temperature'
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		initChartTemp();
		//Temperature
		async function fetchCurrentsData() {
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const currentsValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); 
		return { years, currentsValues };
		}
		async function initChartCurrents() {
		const data = await fetchCurrentsData();
		
		const ctx = document.getElementById('currentsChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Currents ',
			data: data.currentsValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Currents'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw} `
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Currents '
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		initChartCurrents();
		
		//Acidity
		async function fetchAcidityData() {
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const acidityValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); 
		return { years, acidityValues };
		}
		async function initChartAcidity() {
		const data = await fetchAcidityData();
		
		const ctx = document.getElementById('acidityChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Acidity ',
			data: data.acidityValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Acidity'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw} pH`
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Acidity '
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		initChartAcidity();
		//Oxygen
		async function fetchOxygenData() {
		const years = Array.from({ length: 10 }, (_, i) => new Date().getFullYear() - 9 + i);
		const oxygenValues = years.map(() => (Math.random() * 5 + 30).toFixed(2)); 
		return { years, oxygenValues };
		}
		async function initChartOxygen() {
		const data = await fetchOxygenData();
		
		const ctx = document.getElementById('oxygenChart').getContext('2d');
		new Chart(ctx, {
		  type: 'line',
		  data: {
		  labels: data.years,
		  datasets: [{
			label: 'Ocean Oxygen ',
			data: data.oxygenValues,
			borderColor: '#0077be',
			backgroundColor: 'rgba(0, 119, 190, 0.2)',
			borderWidth: 2,
			tension: 0.3
		  }]
		  },
		  options: {
		  responsive: true,
		  plugins: {
			title: {
			display: true,
			text: 'Oxygen'
			},
			tooltip: {
			callbacks: {
			  label: (context) => `${context.raw} `
			}
			}
		  },
		  scales: {
			x: {
			title: {
			  display: true,
			  text: 'Year'
			}
			},
			y: {
			title: {
			  display: true,
			  text: 'Oxygen '
			},
			beginAtZero: false
			}
		  }
		  }
		});
		}
		initChartOxygen();
	}
  }
  
  
  // Initialize first page on load
  document.addEventListener('DOMContentLoaded', () => {
	initChart('CTD');
  });
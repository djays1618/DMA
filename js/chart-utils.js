class ChartUtils {
    constructor(canvasId) {
        this.canvas = document.getElementById(canvasId);
        this.chart = null;
    }
    
    createScatterPlot(data, onPointClick) {
        if (this.chart) {
            this.chart.destroy();
        }
        
        if (!this.canvas) {
            console.error('Canvas element not found');
            return;
        }
        
        const ctx = this.canvas.getContext('2d');
        
        this.chart = new Chart(ctx, {
            type: 'scatter',
            data: {
                datasets: [{
                    label: 'Electric Bikes',
                    data: data,
                    backgroundColor: 'rgba(75, 192, 192, 0.8)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                    pointRadius: 8,
                    pointHoverRadius: 12
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                scales: {
                    x: {
                        title: {
                            display: true,
                            text: 'Price ($)'
                        },
                        min: 0
                    },
                    y: {
                        title: {
                            display: true,
                            text: 'Score'
                        },
                        min: 0,
                        max: 100
                    }
                },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const point = context.raw;
                                return `${point.label} - Score: ${point.y.toFixed(1)}, Price: $${point.x.toFixed(2)}`;
                            }
                        }
                    },
                    legend: {
                        display: false
                    }
                },
                onClick: function(e, elements) {
                    if (elements.length > 0) {
                        const index = elements[0].index;
                        const bikeId = data[index].id;
                        if (onPointClick) {
                            onPointClick(bikeId);
                        }
                    }
                }
            }
        });
        
        return this.chart;
    }
} 
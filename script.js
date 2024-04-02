document.addEventListener('DOMContentLoaded', function() {
    const expenseForm = document.getElementById('expense-form');
    const expenseList = document.getElementById('expense-list');
    const expenseChartCanvas = document.getElementById('expense-chart').getContext('2d');
    const currentMonth = (new Date()).getMonth(); 

    // Get expenses from local storage
    let expenses = JSON.parse(localStorage.getItem('expenses')) || [];

    // Display expenses
    function displayExpenses() {
        expenseList.innerHTML = '';
        expenses.forEach((expense, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span>${expense.name}</span>
                <span>Ksh ${expense.amount}</span>
                <button class="edit-btn" data-id="${index}">Edit</button>
                <button class="delete-btn" data-id="${index}">Delete</button>
            `;
            expenseList.appendChild(li);
        });
        updateLocalStorage();
        renderCharts();
    }

    // Add new expense
    expenseForm.addEventListener('submit', function(event) {
        event.preventDefault();
        const name = document.getElementById('expense-name').value;
        const amount = parseFloat(document.getElementById('expense-amount').value);
        if (name && amount) {
            expenses.push({ name, amount });
            displayExpenses();
            expenseForm.reset();
        } else {
            alert('Please enter both expense name and amount.');
        }
    });

    // Edit expense
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('edit-btn')) {
            const index = event.target.dataset.id;
            const newName = prompt('Enter new expense name:');
            const newAmount = parseFloat(prompt('Enter new expense amount:'));
            if (newName && newAmount) {
                expenses[index].name = newName;
                expenses[index].amount = newAmount;
                displayExpenses();
            } else {
                alert('Please enter both expense name and amount.');
            }
        }
    });

    // Delete expense
    expenseList.addEventListener('click', function(event) {
        if (event.target.classList.contains('delete-btn')) {
            const index = event.target.dataset.id;
            expenses.splice(index, 1);
            displayExpenses();
        }
    });

    // Update local storage
    function updateLocalStorage() {
        localStorage.setItem('expenses', JSON.stringify(expenses));
    }

    // Render pie chart
    function renderPieChart() {
        const existingChart = document.getElementById('expense-chart');
        if (existingChart) {
            existingChart.parentNode.removeChild(existingChart);
        }

        const canvas = document.createElement('canvas');
        canvas.id = 'expense-chart';
        canvas.width = 400;
        canvas.height = 400;

        const chartContainer = document.getElementById('chart-container');
        chartContainer.appendChild(canvas);

        const expenseChartCanvas = canvas.getContext('2d');

        const expenseData = {};
        expenses.forEach(expense => {
            if (expense.name in expenseData) {
                expenseData[expense.name] += expense.amount;
            } else {
                expenseData[expense.name] = expense.amount;
            }
        });

        const labels = Object.keys(expenseData);
        const data = Object.values(expenseData);

        new Chart(expenseChartCanvas, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    data: data,
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.7)',
                        'rgba(54, 162, 235, 0.7)',
                        'rgba(255, 206, 86, 0.7)',
                        'rgba(75, 192, 192, 0.7)',
                        'rgba(153, 102, 255, 0.7)',
                        'rgba(255, 159, 64, 0.7)'
                    ],
                    borderWidth: 1
                }]
            },
            options: {
                title: {
                    display: true,
                    text: 'Expense Distribution'
                }
            }
        });
    }

    // Render radar skip point graph
    function renderRadarSkipPointGraph() {
        const existingChart = document.getElementById('radar-skip-point-graph');
        if (existingChart) {
            existingChart.parentNode.removeChild(existingChart);
        }

        // Create a new canvas element
        const canvas = document.createElement('canvas');
        canvas.id = 'radar-skip-point-graph';
        canvas.width = 400;
        canvas.height = 400;

        const chartContainer = document.getElementById('exp');
        chartContainer.appendChild(canvas);

        const radarSkipPointGraphCanvas = canvas.getContext('2d');
        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
        const data = Array.from({ length: 12 }, (_, i) => (i === currentMonth ? 1 : 0));

        new Chart(radarSkipPointGraphCanvas, {
            type: 'radar',
            data: {
                labels: months,
                datasets: [{
                    label: 'Dataset',
                    data: data,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgba(54, 162, 235, 1)',
                    pointBackgroundColor: 'rgba(54, 162, 235, 1)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgba(54, 162, 235, 1)',
                    pointRadius: 5,
                    pointHoverRadius: 7
                }]
            },
            options: {
                scales: {
                    r: {
                        suggestedMin: 0,
                        suggestedMax: 1
                    }
                },
                plugins: {
                    legend: {
                        display: false
                    }
                },
                title: {
                    display: true,
                    text: 'Radar Skip Point Graph'
                }
            }
        });
    }

    function renderCharts() {
        renderPieChart();
        renderRadarSkipPointGraph();
    }

    displayExpenses();
    renderCharts();

});

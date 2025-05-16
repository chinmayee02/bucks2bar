document.addEventListener("DOMContentLoaded", function () {

    // Input with id "username" on change
    const usernameInput = document.getElementById('username');
    // regex to check if username has at least 1 capital letter, 1 special character, 1 number and is at least 8 characters long    
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(?=.*\d)[A-Za-z\d!@#$%^&*]{8,}$/;
    usernameInput.addEventListener('input', function () {
        const username = usernameInput.value;
        const message = document.getElementById('username-message');
        if (regex.test(username)) {
            // set the username input border to green color
            usernameInput.style.borderColor = 'green';
        } else {
            // set the username input border to red color
            usernameInput.style.borderColor = 'red';
        }
    });

    const downloadButton = document.getElementById('download-btn');
    const canvas = document.getElementById('barChart');

    downloadButton.addEventListener('click', function () {
        const image = canvas.toDataURL('image/png'); // Convert canvas to image (PNG format)
        const link = document.createElement('a'); // Create a temporary anchor element
        link.href = image;
        link.download = 'chart.png'; // Set the file name for the download
        link.click(); // Trigger the download
    });


    function getMonthlyData() {
    const months = [
        'january', 'february', 'march', 'april', 'may', 'june', 
        'july', 'august', 'september', 'october', 'november', 'december'
    ];
    
    const incomeData = [];
    const expensesData = [];
    
    months.forEach(month => {
        const incomeInput = document.getElementById(`${month}-income`);
        const expensesInput = document.getElementById(`${month}-expenses`);
    
        const income = incomeInput ? parseFloat(incomeInput.value) || 0 : 0;
        const expenses = expensesInput ? parseFloat(expensesInput.value) || 0 : 0;
    
        incomeData.push(income);
        expensesData.push(expenses);
        });
    
        return { incomeData, expensesData };
    }
    
    // Example usage:
    document.addEventListener("DOMContentLoaded", function () {
        const { incomeData, expensesData } = getMonthlyData();
        console.log("Income Data:", incomeData);
        console.log("Expenses Data:", expensesData);
    });

    const ctx = document.getElementById('barChart').getContext('2d');
    const barChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['January', 'February', 'March', 'April', 'May','June','July','August','September'
                ,'October','November','December'], // Add more months as needed
            datasets: [{
                label: 'Income',
                data: [], // Replace with actual income data
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1
            }, {
                label: 'Expenses',
                data: [], // Replace with actual expenses data
                backgroundColor: 'rgba(255, 99, 132, 0.2)',
                borderColor: 'rgba(255, 99, 132, 1)',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    // Update the chart data dynamically
    function updateChartData() {
        const { incomeData, expensesData } = getMonthlyData();
        barChart.data.datasets[0].data = incomeData; // Set income data
        barChart.data.datasets[1].data = expensesData; // Set expenses data
        barChart.update(); // Refresh the chart
    }

    // Update the chart when the page loads
    updateChartData();

    // Optionally, add event listeners to update the chart when inputs change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('input', updateChartData);
    });

});
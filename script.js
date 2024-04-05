document.addEventListener('DOMContentLoaded', async () => {
    // Fetch JSON data
    try {
        const response = await fetch('data.json');
        const data = await response.json();
        updateTable(data);
    } catch (error) {
        console.error('Error fetching JSON data:', error);
    }

    const toggleContainer = document.getElementById('modeToggle');
    const body = document.body;

    toggleContainer.addEventListener('click', function() {
        body.classList.toggle('dark-mode');
        const halfMoon = document.querySelector('.half-moon');
        if (body.classList.contains('dark-mode')) {
            halfMoon.style.transform = 'translateY(-50%) rotate(180deg)'; // Rotate half-moon for dark mode
        } else {
            halfMoon.style.transform = 'translateY(-50%) rotate(0)'; // Reset rotation for light mode
        }
    });
});

function updateTable(data) {
    const tableBody = document.querySelector('table tbody');
    tableBody.innerHTML = '';

    let isBreakFound = false;

    data.forEach((rowData, index) => {
        const row = tableBody.insertRow();
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);

        cell1.textContent = rowData.column1;
        cell2.textContent = rowData.column2;
        cell3.textContent = rowData.column3;

        if (rowData.break && rowData.break === 'now' && !isBreakFound && index !== data.length - 1) {
            row.classList.add('break-row');
            isBreakFound = true;
        }
    });
}

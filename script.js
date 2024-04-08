document.addEventListener('DOMContentLoaded', async () => {
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

    const jsonListContainer = document.querySelector('.json-list');

    // List of JSON files to fetch
    const jsonFiles = ['lesson1.json', 'lesson2.json', 'lesson3.json', 'lesson4.json', 'lesson5.json', 'lesson6.json',
    'lesson7.json', 'lesson8.json', 'lesson9.json', 'lesson10.json','lesson11.json', 'lesson12.json', 'lesson13.json', 
    'lesson14.json', 'lesson15.json', 'lesson16.json'];

    // Function to create JSON file name buttons
    async function createJsonButtons() {
        for (const fileName of jsonFiles) {
            const nameWithoutExtension = fileName.split('.').slice(0, -1).join('');
            // Replace "lesson" with "section"
            const sectionName = nameWithoutExtension.replace('lesson', '');
    
            const button = document.createElement('button');
            button.textContent = sectionName;
            button.addEventListener('click', async () => {
                try {
                    const response = await fetch(fileName);
                    const data = await response.json();
                    updateTable(data);
                } catch (error) {
                    console.error('Error fetching JSON data:', error);
                }
            });
            jsonListContainer.appendChild(button);
    
            // If the filename is "lesson1.json", load its content by default
            if (fileName === 'lesson1.json') {
                try {
                    const response = await fetch(fileName);
                    const data = await response.json();
                    updateTable(data);
                } catch (error) {
                    console.error('Error fetching JSON data:', error);
                }
            }
        }
    }

createJsonButtons(); // Call the function to create JSON file name buttons


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
});

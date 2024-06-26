document.addEventListener('DOMContentLoaded', async () => {
    const toggleContainer = document.getElementById('modeToggle');
    const body = document.body;

    // Function to toggle dark mode
    function toggleDarkMode() {
        body.classList.toggle('dark-mode');
    }

    toggleContainer.addEventListener('click', toggleDarkMode);

    // Detect double-click to toggle dark mode
    let lastClickTime = 0;
    document.addEventListener('click', function(event) {
        const currentTime = new Date().getTime();
        const timeDifference = currentTime - lastClickTime;
        if (timeDifference < 300) { // Check if the time difference is less than 300ms (double-click threshold)
            toggleDarkMode(); // Toggle dark mode
        }
        lastClickTime = currentTime;
    });

    const jsonListContainer = document.querySelector('.json-list');
    const dataContainer = document.getElementById('dataContainer');

    // List of JSON files to fetch
    const jsonFiles = ['lesson1.json', 'lesson2.json', 'lesson3.json', 'lesson4.json', 'lesson5.json', 'lesson6.json',
        'lesson7.json', 'lesson8.json', 'lesson9.json', 'lesson10.json', 'lesson11.json', 'lesson12.json', 'lesson13.json',
        'lesson14.json', 'lesson15.json', 'lesson16.json'];

    // Function to create JSON file name buttons
    async function createJsonButtons() {
        for (let i = 0; i < jsonFiles.length; i++) {
            const button = document.createElement('button');
            button.textContent = i + 1; // Display the number from 1 to 16
            jsonListContainer.appendChild(button);

            // Add event listener using a separate function to capture the current value of 'i'
            addButtonEventListener(button, i + 1);

            // If the filename is "lesson1.json", load its content by default
            if (i === 0) {
                try {
                    const response = await fetch(`lesson${i + 1}.json`);
                    const data = await response.json();
                    updateTable(data);
                } catch (error) {
                    console.error('Error fetching JSON data:', error);
                }
            }
        }
    }

    // Function to add event listener to a button
    function addButtonEventListener(button, index) {
        button.addEventListener('click', async () => {
            const fileName = `lesson${index}.json`; // Construct the file name based on the number
            try {
                const response = await fetch(fileName);
                const data = await response.json();
                updateTable(data);
            } catch (error) {
                console.error('Error fetching JSON data:', error);
            }
        });
    }

    createJsonButtons(); // Call the function to create JSON file name buttons

    function updateTable(data) {
        console.log('Updating table with data:', data); // Log the data being used to update the table

        dataContainer.innerHTML = ''; // Clear previous data

        for (let i = 0; i < data.length; i += 3) {
            const row = document.createElement('div');
            row.classList.add('row');

            for (let j = i; j < Math.min(i + 3, data.length); j++) {
                const box = document.createElement('div');
                box.classList.add('data-box');
                box.innerHTML = `
                    <div class="box-content">
                        <div class="box-top">${data[j].column1}</div>
                        <div class="box-bottom">${data[j].column2}</div>
                        <div class="box-hidden hidden">${data[j].column3}</div>
                    </div>
                `;
                // Add event listener to speak the text for each column1
                box.addEventListener('click', () => {
                    speak(data[j].column1);
                });
                row.appendChild(box);
            }

            dataContainer.appendChild(row);
        }

        // Adjust box id values sequentially starting from 1
        const boxes = document.querySelectorAll('.data-box');
        boxes.forEach((box, index) => {
            box.setAttribute('id', `box-${index + 1}`);
        });
    }

    // Event delegation to handle click on dynamically added data boxes
    dataContainer.addEventListener('click', function(event) {
        const clickedBox = event.target.closest('.data-box');
        console.log('Clicked box:', clickedBox); // Log the clicked box element
        if (clickedBox) {
            const hiddenContent = clickedBox.querySelector('.box-hidden');
            console.log('Hidden content:', hiddenContent); // Log the hidden content element
            if (hiddenContent) {
                hiddenContent.classList.toggle('hidden');
            }
        }
    });

    // Function to speak text
    function speak(text) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = 'fr-FR'; // Set the language to French
        speechSynthesis.speak(utterance);
    }

    // Function to speak text with adjustable speech rate and voice
    function speakWithRateAndVoice(text, rate, voiceURI) {
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = rate; // Set the speech rate
        // Check if the provided voiceURI is available
        const voices = speechSynthesis.getVoices();
        const voice = voices.find(v => v.voiceURI === voiceURI);
        if (voice) {
            utterance.voice = voice; // Set the voice
        } else {
            console.error('Voice not found:', voiceURI);
        }
        speechSynthesis.speak(utterance);
    }

});

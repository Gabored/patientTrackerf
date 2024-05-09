document.addEventListener('DOMContentLoaded', function() {
    setInterval(fetchUsersAndUpdateCards, 10000);  // Update every 10 seconds
    fetchUsersAndUpdateCards();  // Initial fetch

    async function fetchUsersAndUpdateCards() {
        try {
            const usersResponse = await fetch('/api/users');
            const users = await usersResponse.json();
            const patients = users.filter(user => user.role === 'Patient');
            //patients.sort((a, b) => (b.IoT ? 1 : 0) - (a.IoT ? 1 : 0));

            const cardsContainer = document.getElementById('user-cards-container');
            cardsContainer.innerHTML = '';  // Clear existing cards

            for (const patient of patients) {
                const iotLinks = patient.IoT.split(',');
                const [tempUrl, bpmUrl, statusUrl] = iotLinks.map(url => url.trim());
                const tempData = await fetchLatestData(tempUrl);
                const bpmData = await fetchLatestData(bpmUrl);
                const statusData = await fetchLatestData(statusUrl);

                const cardHtml = createCardHtml(patient, tempData, bpmData, statusData);
                cardsContainer.innerHTML += cardHtml;  // Append new card
            }
        } catch (error) {
            console.error('Error fetching users or IoT data:', error);
        }
    }

    async function fetchLatestData(url) {
        const response = await fetch(url);
        const data = await response.json();
        return data.feeds[data.feeds.length - 1];  // Return the latest entry
    }

    function createCardHtml(patient, tempData, bpmData, statusData) {
        const tempValue = tempData ? `${tempData.field5} °C` : 'N/A';
        const bpmValue = bpmData ? `${bpmData.field6} BPM` : 'N/A';
        const status = statusData ? statusData.status : 'N/A';
        const bgColor = !tempData && !bpmData && !statusData ? 'bg-secondary' : '';

        return `
            <div class="col-md-3 mb-4">
                <div class="card ${bgColor}">
                    <div class="card-body">
                        <h5 class="card-title">${patient.patientName}</h5>
                        <p class="card-text"><strong>Temperature:</strong> ${tempValue}</p>
                        <p class="card-text"><strong>BPM:</strong> ${bpmValue}</p>
                        <p class="card-text"><strong>Age:</strong> ${patient.age}</p>
                        <p class="card-text"><strong>Sex:</strong> ${patient.sex}</p>
                    </div>
                </div>
            </div>
        `;
    }
});

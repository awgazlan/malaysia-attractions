let currentPage = 1;  // Default starting page
let attractionsPerPage = 5;  // Number of attractions per page
let attractionsData = [];  // Store all attractions data

// Function to fetch and parse XML data
function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "attractions.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const attractions = xmlDoc.getElementsByTagName("Attraction");
            attractionsData = [];  // Reset attractions data

            // Push all attractions to the attractionsData array
            for (let i = 0; i < attractions.length; i++) {
                let placeID = attractions[i].getElementsByTagName("PlaceID")[0].textContent;
                let name = attractions[i].getElementsByTagName("Name")[0].textContent;
                let image = attractions[i].getElementsByTagName("Image")[0].textContent;
                let description = attractions[i].getElementsByTagName("Description")[0].textContent;
                let openingHours = attractions[i].getElementsByTagName("OpeningHours")[0].textContent;
                let category = attractions[i].getElementsByTagName("Category")[0].textContent;
                let ticket = attractions[i].getElementsByTagName("Ticket")[0].textContent;
                let price = attractions[i].getElementsByTagName("Price")[0].textContent;

                attractionsData.push({
                    placeID, name, image, description, openingHours, category, ticket, price
                });
            }

            // Display the first page of all attractions
            displayAttractions();
        }
    };
    xhr.send();
}

// Function to display attractions for the current page and category
function displayAttractions() {
    const selectedCategory = document.getElementById("category-filter").value;
    
    // Filter attractions by category if selected, otherwise display all
    const filteredAttractions = selectedCategory ? 
        attractionsData.filter(attraction => attraction.category === selectedCategory) : 
        attractionsData;

    const startIndex = (currentPage - 1) * attractionsPerPage;
    const endIndex = startIndex + attractionsPerPage;
    const attractionsToDisplay = filteredAttractions.slice(startIndex, endIndex);

    let attractionList = "";
    attractionsToDisplay.forEach(attraction => {
        attractionList += `
            <div class="attraction" onclick="showDetails(${attraction.placeID})">
                <img src="${attraction.image}" alt="${attraction.name}" class="attraction-img" />
                <p><strong>Name:</strong> ${attraction.name}</p>
                <p><strong>Category:</strong> ${attraction.category}</p>
            </div>
        `;
    });

    document.getElementById("attraction-list").innerHTML = attractionList;
    document.getElementById("prev-btn").disabled = currentPage === 1;  // Disable prev button on first page
    document.getElementById("next-btn").disabled = currentPage * attractionsPerPage >= filteredAttractions.length;  // Disable next button on last page
}

// Function to change pages
function changePage(direction) {
    currentPage += direction;
    displayAttractions();
}

// Function to show attraction details in a modal
function showDetails(placeID) {
    const attraction = attractionsData.find(item => item.placeID == placeID);

    if (attraction) {
        // Display modal with attraction details
        const detailsHTML = `
            <img src="${attraction.image}" alt="${attraction.name}" class="attraction-detail-img" />
            <h2>${attraction.name}</h2>
            <p><strong>Description:</strong> ${attraction.description}</p>
            <p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>
            <p><strong>Ticket:</strong> ${attraction.ticket}</p>
            <p><strong>Price:</strong> ${attraction.price}</p>
            <button onclick="closeModal()">Close</button>
        `;

        // Inject the details into the modal content
        document.getElementById("attraction-details-modal").innerHTML = detailsHTML;
        
        // Show the modal
        document.getElementById("modal").style.display = "block";
    }
}

// Function to close the modal
function closeModal() {
    document.getElementById("modal").style.display = "none";  // Hide modal
}

// Load the XML on page load
window.onload = loadXML;

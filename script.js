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

// Function to show attraction details
function showDetails(placeID) {
    const attraction = attractionsData.find(item => item.placeID == placeID);

    if (attraction) {
        // Hide the attraction list and show the details container
        document.getElementById("attraction-list").style.display = "none";
        document.getElementById("pagination").style.display = "none";  // Hide pagination
        document.getElementById("category-filter").style.display = "none";  // Hide category filter

        // Create a detailed view of the selected attraction
        const detailsHTML = `
            <div class="attraction-details">
                <img src="${attraction.image}" alt="${attraction.name}" class="attraction-detail-img" />
                <h2>${attraction.name}</h2>
                <p><strong>Description:</strong> ${attraction.description}</p>
                <p><strong>Opening Hours:</strong> ${attraction.openingHours}</p>
                <p><strong>Ticket:</strong> ${attraction.ticket}</p>
                <p><strong>Price:</strong> ${attraction.price}</p>
                <button onclick="goBackToList()">Back to List</button>
            </div>
        `;

        document.getElementById("attraction-details-container").innerHTML = detailsHTML;
        document.getElementById("attraction-details-container").style.display = "block";
    }
}

// Function to go back to the list of attractions
function goBackToList() {
    // Hide the details and show the list and pagination again
    document.getElementById("attraction-details-container").style.display = "none";
    document.getElementById("attraction-list").style.display = "block";
    document.getElementById("pagination").style.display = "flex";
    document.getElementById("category-filter").style.display = "block";

    // Reset the page to show the first set of attractions
    currentPage = 1;
    displayAttractions();
}

// Load the XML on page load
window.onload = loadXML;

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

            // Display the first page of attractions
            displayAttractions();
        }
    };
    xhr.send();
}

// Function to display attractions for the current page
function displayAttractions() {
    const startIndex = (currentPage - 1) * attractionsPerPage;
    const endIndex = startIndex + attractionsPerPage;
    const attractionsToDisplay = attractionsData.slice(startIndex, endIndex);

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
    document.getElementById("next-btn").disabled = currentPage * attractionsPerPage >= attractionsData.length;  // Disable next button on last page
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
        alert(`
            Name: ${attraction.name}
            Description: ${attraction.description}
            Opening Hours: ${attraction.openingHours}
            Ticket: ${attraction.ticket}
            Price: ${attraction.price}
        `);
    }
}

// Load the XML on page load
window.onload = loadXML;

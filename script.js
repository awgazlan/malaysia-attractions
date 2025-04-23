// Function to fetch and parse XML data
function loadXML() {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "attractions.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const attractions = xmlDoc.getElementsByTagName("Attraction");
            let attractionList = "";
            for (let i = 0; i < attractions.length; i++) {
                let placeID = attractions[i].getElementsByTagName("PlaceID")[0].textContent;
                let name = attractions[i].getElementsByTagName("Name")[0].textContent;
                let image = attractions[i].getElementsByTagName("Image")[0].textContent;
                let category = attractions[i].getElementsByTagName("Category")[0].textContent;
                attractionList += `
                    <div class="attraction">
                        <img src="${image}" alt="${name}" class="attraction-img" />
                        <p><strong>PlaceID:</strong> ${placeID}</p>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Category:</strong> ${category}</p>
                    </div>
                `;
            }
            document.getElementById("attraction-list").innerHTML = attractionList;
        }
    };
    xhr.send();
}

// Function to filter attractions by category
function showAttractions(filter, type) {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "attractions.xml", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState === 4 && xhr.status === 200) {
            const xmlDoc = xhr.responseXML;
            const attractions = xmlDoc.getElementsByTagName("Attraction");
            let attractionList = "";
            for (let i = 0; i < attractions.length; i++) {
                let attractionCategory = attractions[i].getElementsByTagName("Category")[0].textContent;
                let placeID = attractions[i].getElementsByTagName("PlaceID")[0].textContent;
                let name = attractions[i].getElementsByTagName("Name")[0].textContent;
                let image = attractions[i].getElementsByTagName("Image")[0].textContent;
                // Show based on category filter
                if (type === "category" && attractionCategory === filter || type === "category" && filter === "") {
                    attractionList += `
                        <div class="attraction">
                            <img src="${image}" alt="${name}" class="attraction-img" />
                            <p><strong>PlaceID:</strong> ${placeID}</p>
                            <p><strong>Name:</strong> ${name}</p>
                            <p><strong>Category:</strong> ${attractionCategory}</p>
                        </div>
                    `;
                }
            }
            document.getElementById("attraction-list").innerHTML = attractionList;
        }
    };
    xhr.send();
}

// Load the XML on page load
window.onload = loadXML;
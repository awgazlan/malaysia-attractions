body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    margin: 0;
    padding: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    width: 90%;
    max-width: 1200px;
    background-color: white;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
    text-align: center;
    color: #333;
    margin-bottom: 20px;
}

#category-filter {
    text-align: center;
    margin-bottom: 20px;
}

select {
    padding: 10px;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

#attraction-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    gap: 20px;
}

.attraction {
    background-color: #fff;
    padding: 15px;
    border-radius: 8px;
    box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
    text-align: center;
    cursor: pointer;
    transition: transform 0.2s ease;
}

.attraction:hover {
    transform: scale(1.05);
}

.attraction-img {
    width: 100%;
    max-width: 250px;
    height: auto;
    border-radius: 8px;
    margin-bottom: 15px;
}

#pagination {
    display: flex;
    justify-content: center;
    margin-top: 20px;
}

button {
    padding: 10px;
    margin: 5px;
    border: none;
    background-color: #4CAF50;
    color: white;
    cursor: pointer;
    border-radius: 5px;
}

button:disabled {
    background-color: #ccc;
    cursor: not-allowed;
}

button:hover {
    background-color: #45a049;
}

/* Modal Styles */
.modal {
    display: none; /* Hidden by default */
    position: fixed; /* Fixed position */
    z-index: 1; /* Stay on top */
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4); /* Background color with transparency */
}

.modal-content {
    background-color: #fff;
    margin: 10% auto;
    padding: 20px;
    border-radius: 8px;
    width: 80%;
    max-width: 800px;
}

.close-btn {
    color: #aaa;
    font-size: 28px;
    font-weight: bold;
    cursor: pointer;
}

.close-btn:hover,
.close-btn:focus {
    color: black;
    text-decoration: none;
    cursor: pointer;
}

@media (max-width: 768px) {
    #category-filter {
        text-align: center;
    }
}

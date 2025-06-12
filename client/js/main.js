let app = require("../../app.js"); 

app.listen(8000, () => {
    console.log("server is running");
});

document.addEventListener("DOMContentLoaded", () => {
    fetch('/recommendations')
        .then(response => response.json())
        .then(data => {
            const movieList = document.getElementById('movie-list');
            data.forEach(movie => {
                const li = document.createElement('li');
                li.textContent = movie.title;
                movieList.appendChild(li);
            });
        })
        .catch(error => console.error("Error fetching recommendations:", error));
});
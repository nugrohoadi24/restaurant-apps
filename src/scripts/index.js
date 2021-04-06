import 'regenerator-runtime'; /* for async await transpile */
import '../styles/main.css';
import data from '../DATA.json'

console.log(data);

/* Navbar */

let mainNav = document.getElementById('js-menu');
let navBarToggle = document.getElementById('js-navbar-toggle');

navBarToggle.addEventListener('click', function() {
    mainNav.classList.toggle('active');
});

/* Data JSON */

let dataRest = '';
data.restaurants.forEach((restaurants) => {
    dataRest += `
        <div class="column-4">
            <div class="card h-760 bottom-2 shadow" tabindex="0">
                <img src="${restaurants.pictureId}" alt="gambar-katalog-restoran" tabindex="0">
                <div class="card-content">
                    <h3 class="card-title" tabindex="0">${restaurants.name} &nbsp;- &nbsp; ${restaurants.city} &nbsp; ${restaurants.rating}</h3>
                    <p class="card-description" tabindex="0">${restaurants.description}</p>
                </div>
            </div>
        </div>
    `;
});
console.log(dataRest);
document.getElementById("card-container").innerHTML = dataRest;
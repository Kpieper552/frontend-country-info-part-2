const countryList = document.getElementById('countryList');

async function getAllCountries() {
    try {
        const result = await axios.get('https://restcountries.eu/rest/v2/all');
        const { data } = result;
        data.sort((a, b) => {
            return a.population - b.population;
        });

        data.map((country) => {
            const { flag, name, region, population } = country;

            const countryElement = document.createElement('li');
            countryElement.setAttribute('class', 'country-clickable');

            const flagElement = document.createElement('img');
            flagElement.setAttribute('src', flag);
            flagElement.setAttribute('class', 'flag');
            // <img> aan ons <li> element toevoegen
            countryElement.appendChild(flagElement);

            const countryNameElement = document.createElement('span');
            countryNameElement.textContent = name;
            countryNameElement.setAttribute('class', getRegionClass(region));
            // <span> aan ons <li> element toevoegen
            countryElement.appendChild(countryNameElement);

            const populationText = document.createElement('p');
            populationText.setAttribute('class', 'population-dropdown');
            populationText.textContent = `Has a population of ${population} people`;

            countryElement.appendChild(populationText);
           countryElement.addEventListener('click', () => {
                toggleVisibility(populationText);
            });
            countryList.appendChild(countryElement);
        });

        console.log(data);
    } catch(e) {
        console.error(e);
    }
}

getAllCountries();

function toggleVisibility(populationElement) {
    populationElement.classList.toggle('visible');
}

function getRegionClass(currentRegion) {
    switch (currentRegion) {
        case 'Africa':
            return 'blue';
        case 'Americas':
            return 'green';
        case 'Asia':
            return 'red';
        case 'Europe':
            return 'yellow';
        case 'Oceania':
            return 'purple';
        default:
            return 'default';
    }
}



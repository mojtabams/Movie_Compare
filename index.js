const fetchData = async searchTerm => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c4568ff9',
            s: searchTerm,
        },
    });

    if (response.data.Error) {
        return [];
    }
    return response.data.Search;
};


const container = document.querySelector('#container');
container.innerHTML = `
    <label><b>Search For a Movie</b></label>
    <input class="input">
        <div class="dropdown">
            <div class="dropdown-menu" id="dropdown-menu" role="menu">
                <div class="dropdown-content">
                </div>
            </div>
        </div>
     <div id="summary">
     </div>  
`
const input = document.querySelector("input");
const dropdown = document.querySelector(".dropdown");
const content = document.querySelector(".dropdown-content");
const summary = document.querySelector("#summary");

const onInput = async event => {
    const movies = await fetchData(event.target.value);

    if (!movies.length) {
        dropdown.classList.remove('is-active');
        return;
    }

    content.innerHTML = ``;
    dropdown.classList.add('is-active');
    for (let movie of movies) {
        const aList = document.createElement('a');
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;

        aList.classList.add('dropdown-item');
        aList.innerHTML = `  
            <img src="${imgSrc}" />
            ${movie.Title}
            `;

        aList.addEventListener('click', ev => {
            dropdown.classList.remove('is-active');
            input.value = movie.Title;
            onMovieSelect(movie);
        });

        content.appendChild(aList);
    }

};

input.addEventListener('input', debounce(onInput, 500));
document.addEventListener('click', event => {
    if (!container.contains(event.target)) {
        dropdown.classList.remove('is-active');
    }
});
input.addEventListener('click', event => {
    if (input.value.length > 0) {
        dropdown.classList.add('is-active');
    }
});

const onMovieSelect = async movie => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c4568ff9',
            i: movie.imdbID,
        },
    });
    summary.innerHTML = moviedata(response.data);
};

const moviedata = (movieDetail) => {
    return `
    <article content="media">
        <figure class="media-left">
            <p class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
       <article class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
    `
};

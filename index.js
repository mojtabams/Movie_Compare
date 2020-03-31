let leftMovie, rightMovie;
const onMovieSelect = async (movie, side) => {
    const response = await axios.get('http://www.omdbapi.com/', {
        params: {
            apikey: 'c4568ff9',
            i: movie.imdbID,
        },
    });
    document.querySelector(`#${side}-summary`).innerHTML = movieData(response.data);
    side == 'left' ? leftMovie = response.data : rightMovie = response.data;
    if (leftMovie && rightMovie) {
        runCompare();
    }
};
const runCompare = () => {

    const leftSideStatus = document.querySelectorAll('#left-summary .notification');
    const rightSideStatus = document.querySelectorAll('#right-summary .notification');

    leftSideStatus.forEach((leftStat, index) => {
        const rightStat = rightSideStatus[index];

        const leftSideValue = parseInt(leftStat.dataset.value);
        const rightSideValue = parseInt(rightStat.dataset.value);

        if(rightSideValue>leftSideValue){
            leftStat.classList.remove('is-primary');
            leftStat.classList.add('is-warning');
        } else {
            rightStat.classList.remove('is-primary');
            rightStat.classList.add('is-warning');
        }
    });
};
const movieData = (movieDetail) => {
    const dollars = parseInt(movieDetail.BoxOffice.replace(/\$/g, '').replace(/,/g, ''));
    const metascore = parseInt(movieDetail.Metascore);
    const imdbRating = parseFloat(movieDetail.imdbRating);
    const imdbVotes = parseInt(movieDetail.imdbVotes.replace(/,/g, ''));

    const awards = movieDetail.Awards.split(' ').reduce((prev, word) => {
        const value = parseInt(word);
        if (isNaN(value)) {
            return prev;
        } else {
            return prev + value;
        }
    }, 0);

    return `
    <article class="media" content="media">
        <figure class="media-left">
            <p  class="image">
                <img src="${movieDetail.Poster}"/>
            </p>
        </figure>
        <div class="media-content">
            <div class="content">                
                <h1>${movieDetail.Title}</h1>
                <h4>${movieDetail.Genre}</h4>
                <br>
                <p>${movieDetail.Plot}</p>
            </div>
        </div>
    </article>
       <article data-value=${awards} class="notification is-primary">
      <p class="title">${movieDetail.Awards}</p>
      <p class="subtitle">Awards</p>
    </article>
    <article data-value=${dollars} class="notification is-primary">
      <p class="title">${movieDetail.BoxOffice}</p>
      <p class="subtitle">Box Office</p>
    </article>
    <article data-value=${metascore} class="notification is-primary">
      <p class="title">${movieDetail.Metascore}</p>
      <p class="subtitle">Metascore</p>
    </article>
    <article data-value=${imdbRating} class="notification is-primary">
      <p class="title">${movieDetail.imdbRating}</p>
      <p class="subtitle">IMDB Rating</p>
    </article>
    <article data-value=${imdbVotes} class="notification is-primary">
      <p class="title">${movieDetail.imdbVotes}</p>
      <p class="subtitle">IMDB Votes</p>
    </article>
    `
};

const autoContainConfig = {
    renderOption(movie) {
        const imgSrc = movie.Poster === 'N/A' ? '' : movie.Poster;
        return `<img src="${imgSrc}" /> ${movie.Title} (${movie.Year})`
    },
    inputValue(movie) {
        return movie.Title;
    },
    async fetchData(searchTerm) {
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
    },

};

createContain({
    ...autoContainConfig,
    container: document.querySelector('#left-autocomplete'),
    onAListSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, 'left');

    },
});
createContain({
    ...autoContainConfig,
    container: document.querySelector('#right-autocomplete'),
    onAListSelect(movie) {
        document.querySelector('.tutorial').classList.add('is-hidden');
        onMovieSelect(movie, 'right');

    },
});






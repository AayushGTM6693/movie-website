// harek ko lagi xhuutai api hunxa
 const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c'
 const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
 const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'
 // id tanna paryo manipulate garna lai
const main = document.getElementById('main')
 const form = document.getElementById('form')
 const search = document.getElementById('search');
//GET INITIAL MOVIES 
getMovies(API_URL) // api ko url halera call gareu

 async function getMovies(url){//fetch => async => await garna parxa
    const res = await fetch(url)
  
    console.log(res);

    const data = await res.json()// res ma bhako data lai json ma convert garxa
    console.log(data.results);

  showMovies(data.results);// get bhayesi show garna paryo
 
 }
 function showMovies(movies){ // main bhitra huna paryo content
    main.innerHTML = '';
    movies.forEach((movie)=>{// harek aako result ma loop
const {title,poster_path,vote_average,// yo name haru fixed , huna parxa , data ma je xa tei
    overview}= movie;// destructuring , movie bata chaiyeko content liyo

    const movieEl = document.createElement('div')// main bhitra naya div banayo
    movieEl.classList.add('movie')// class add bhayo
    movieEl.innerHTML =`
    <div class="movie">
    <img src="${IMG_PATH + poster_path}" alt="${title}">
    <div class="movie-info">
        <h3>${title}</h3>
        <span class="${getClassByRate(vote_average)}">${vote_average}</span>
    </div>
    <div class="overview">
        <h3>Overview</h3>
        ${overview}

    </div>
</div>`// div ko innerhtml ma json bata ako result show garna paryo

main.appendChild(movieEl)// div lai main bhitra append garna paryo
    })
 }

 function getClassByRate(vote){// vote wala , easy
    if(vote >= 8){
        return 'green'
    }
    else if (vote >=5)
    return 'orange'
else {
    return 'red'
}
 }

 form.addEventListener('submit',(e)=>{// search wala
    e.preventDefault()// default behaviour of submit lai prevent garxa

const searchTerm = search.value;// input bhayeko value

if(searchTerm && searchTerm !== ''){
    getMovies(SEARCH_API + searchTerm)// get movies lai call garxa bhitra search url halera
    search.value = ''// search bhayesi feri reset hunxa
}
else {
    window.location.reload()// if empty string => reload hunxa page
}

 })




  
class App {
    constructor() {
        this.movies = [];
        try {
            this.movies = JSON.parse(window.localStorage.getItem('kinoAppMovies')) || [];
        }
        catch(e) {
            console.log(e);
        }
        this.rootEl = document.getElementById('content');
        this.routes = {
            '/': () => '<h1 class="mt-5 text-center text-uppercase">Добро пожаловать<br> на портал Мир Кино!</h1>',
            'list': this.renderMoviesList.bind(this),
            'list-{id}': this.renderMovieDetails.bind(this),
            'search-{param}': this.searchMovies.bind(this)
        };

        this.modalRenderer = new ModalRenderer(this.addMovie.bind(this), 
                                               this.updateMovie.bind(this),
                                               this.findMovie.bind(this));

        this.movieDetailsRenderer = new MovieRenderer();
    }

    init () {
        this.router = new Router(this.routes, this.rootEl);
        this.modalRenderer.bindEventHandlers();
        this.bindEventHandlers();
    }

    bindEventHandlers() {
        document.getElementById('search-form').addEventListener('submit', e => {
            e.preventDefault();
            const param = document.getElementById('search-movie-inp').value;
            if(param.length < 3) return;
            this.router.redirect(`search-${param}`);
        });
    }

    addMovie(formData) {
        this.movies.push(formData);
        this.saveMoviesToStorage();
    }

    renderMoviesList(moviesList) {
        const movies = moviesList || this.movies;
        let result = '';
        movies.forEach(m => {
            result += cardTemplate(m);
        });
        return result;
    }

    deleteMovieHandler(id){
        if(!confirm('Do you really want to delete movie?')) {
            return;
        }
        this.removeMovie(id);
    }

    removeMovie(id) {
        const { index } = this.findMovie('id', id);
        this.movies.splice(index, 1);
        this.saveMoviesToStorage();
        this.router.redirect('list');
    }

    renderMovieDetails({ id }){
        const { movie } = this.findMovie('id', id);
        return this.movieDetailsRenderer.render(movie);
    }

    editMovieHandler(id){
        const { movie } = this.findMovie('id', id);
        this.modalRenderer.show(movie);
    }

    updateMovie(formData, id) {
        let newMovie = {};
    
        const { movie } = this.findMovie('id', id);
        Object.assign(newMovie, movie, formData)
        this.removeMovie(id);
        
        this.movies.push(newMovie);
        this.saveMoviesToStorage();
        this.router.redirect('list');
    }

    findMovie(key, value) {
        let movie = null, index = -1;
         for(let i = 0; i < this.movies.length; ++i) {
            if(this.movies[i][key] === value) {
                movie = this.movies[i];
                index = i;
                break;
            }
        };

        return { movie, index };
    }

    searchMovies({id}){
        const param = decodeURI(id);
        const words = param.split(' ');
        const filteredMovies = this.movies.filter( m => {
            for (let i = 0; i < words.length; ++i) {
                if(m.title.includes(words[i])) {
                    return true;
                }
            }
        }); 
        
        return this.renderMoviesList(filteredMovies);
    }

    saveMoviesToStorage() {
        window.localStorage.setItem('kinoAppMovies', JSON.stringify(this.movies));
    }
}
class MovieRenderer {
    movie = null;
    render(movie) {
        this.movie = movie;
        const { cast } = this.movie;
        const castList = this.renderCast(cast);        
        const additionalStuff = this.renderAdditionalStuff();
        if(this.movie.likeCount === undefined) this.movie.likeCount = 0;
        if(this.movie.dislikeCount === undefined) this.movie.dislikeCount = 0;

        const movieObj = Object.assign({}, this.movie, {cast: castList, additionalStuff});

        return movieTemplate(movieObj);
    }

    renderCast(castString) {
        const castArr = castString.split(',');
        let castListElements = '';

        castArr.forEach(el => {
            castListElements += `<li>${el.trim()}</li>`;    
        });

        const castList = `<div class="col-sm-3">
                            <h3>В ролях:</h3>
                            <ul class="list-unstyled">
                                ${castListElements}
                            </ul>
                        </div>`;

        return castList;                
    }

    renderAdditionalStuff(){
        const stuffItem = template`<li class="d-flex">
                                <p class="col-3">${'position'}</p>
                                <p class="col-9">${'personName'}</p>
                            </li>`;
        const stuffObj = {};

        Object.keys(this.movie).forEach(key => {
            if(key.startsWith('position')) {
                const arr = key.split('_');
                stuffObj[arr[1]] = {
                    position: this.movie[key]
                };    
            }

            if(key.startsWith('personName')) {
                const arr = key.split('_');
                stuffObj[arr[1]].personName = this.movie[key];    
            }
        });                    
                
        let additionalStuffElement = '';

        Object.values(stuffObj).forEach( val=> {
            additionalStuffElement += stuffItem({position: val.position, 
                                                 personName: val.personName});
        });
        return additionalStuffElement;
    }

    putLike(el) {
        if(this.movie.dislikeCount > 0) --this.movie.dislikeCount;
        ++this.movie.likeCount;
        document.getElementById('dislike-btn').setAttribute('data-count', this.movie.dislikeCount);
        el.setAttribute('data-count', this.movie.likeCount);
    }

    putDislike(el) {
        if(this.movie.likeCount > 0) --this.movie.likeCount;
        ++this.movie.dislikeCount;
        document.getElementById('like-btn').setAttribute('data-count', this.movie.likeCount);
        el.setAttribute('data-count', this.movie.dislikeCount);
    }
}
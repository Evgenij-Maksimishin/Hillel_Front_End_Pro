class ModalRenderer {
    additionalStuffEl = `<div class="form-group row additional-stuff-row" id="additional-stuff-group">
                            <div class="col-sm-5">
                            <input type="text" class="form-control position-inp" placeholder="Должность" name="position">
                            </div>
                            <div class="col-sm-5">
                            <input type="text" class="form-control person-name-inp" placeholder="Имя" name="personName">
                            </div>
                            <div class="col-sm-2">
                            <button class="btn btn-danger btn-sm btn-remove-field" type="button" id="remove-stuff-btn"><svg class="octicon octicon-x" viewBox="0 0 14 18" version="1.1" width="14" height="18" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
                            </div>
                        </div>`;
    additionalStuffIndex = 0;

    constructor(addMovieHandler, editMovieHandler, findMovieHandler){
        this.addNewModalHTML  = $.parseHTML(addNewTemplate)[0];
        this.addMovieHandler  = addMovieHandler;
        this.editMovieHandler = editMovieHandler;
        this.findMovieHandler = findMovieHandler;
    }

    bindEventHandlers(){
        document.getElementById('add-new-btn').addEventListener('click', () => {
            this.openModalEventHandler();
        });
        document.querySelectorAll('edit-btn');

        $(document).on('hidden.bs.modal', '.modal', () => { 
            $("#addNewModal").remove(); 
        });
    }

    openModalEventHandler(movieId) {
        $(this.addNewModalHTML).modal('show');
        $(this.addNewModalHTML).on('click', '#save-movie-btn', e => {
            e.preventDefault();
            e.stopPropagation();
            
            const form = document.getElementById('add-new-form');
            const isEditing = movieId !== undefined;

            if (form.checkValidity()) {
                this.parseForm(form, isEditing).then(data => {
                    if (isEditing) {
                        this.editMovie(data, movieId);
                    }
                    else{
                        this.addMovie(data);
                    }
                });
            }
            document.getElementById('movie-saved-message').classList.add('d-none');
            form.classList.add('was-validated');
        }); 

        $(this.addNewModalHTML).on('click', '#add-stuff-btn', e => {
            ++this.additionalStuffIndex;
            this.createAdditionalStuffElement();
        });

        $(this.addNewModalHTML).on('click', '#remove-stuff-btn', e => {
            --this.additionalStuffIndex;
            e.currentTarget.closest('.row').remove();
        });
    }

    addMovie(formData){
        const { movie } = this.findMovieHandler('title', formData.title);
        if (movie) {
            document.getElementById('movie-exist-message').classList.remove('d-none');
            return;
        }
        document.getElementById('movie-exist-message').classList.add('d-none');
        this.addMovieHandler(formData);
        document.getElementById('movie-saved-message').classList.remove('d-none');
    }

    editMovie(formData, movieId) {
        if(!formData.poster) delete formData.poster; 
        this.editMovieHandler(formData, movieId);
        document.getElementById('movie-edited-message').classList.remove('d-none');
    }

    parseForm(form, isEditing){
        const formData = new FormData(form);
        let obj = Object.fromEntries(formData);  
        if(!isEditing) obj.id = generateId();

        return new Promise((resolve, reject) => {
            if(obj.poster.size > 0) {
                toBase64(obj.poster).then(
                    data => {
                        obj.poster = data;
                        resolve(obj);
                    },
                    err => { console.log(err); reject(obj); }
                );
            }
            else {
                obj.poster = null;
                resolve(obj);
            }
        });
    }

    show(movie) {
        $(document).on('shown.bs.modal', '.modal', () => { 
            this.fillFields(movie); 
        });
        this.openModalEventHandler(movie.id);
    }

    fillFields(movie) {
        const additionalRows = document.querySelectorAll('.additional-stuff-row');
        additionalRows.forEach(el => el.remove());

        for(let [key, value] of Object.entries(movie)) {
            if(key.startsWith('position')) {
                let clone = stringToElement(this.additionalStuffEl);
                const arr = key.split('_');
                clone.setAttribute('id', `additional-stuff-group${arr[1]}`);
                clone.querySelector('.position-inp').setAttribute('name', key);
                clone.querySelector('.position-inp').value = value;
                clone.querySelector('.person-name-inp').setAttribute('name', `personName_${arr[1]}`);
                clone.querySelector('.person-name-inp').value = movie[`personName_${arr[1]}`];
                document.getElementById('details-fieldset').appendChild(clone);
            }
            else if(key !== 'poster' && 
                    document.querySelector(`[name="${key}"]`) &&
                    !key.startsWith('personName')) {
                        document.querySelector(`[name="${key}"]`).value = value;
            }
        }
    }

    createAdditionalStuffElement() {
        let clone = stringToElement(this.additionalStuffEl);
        clone.setAttribute('id', `additional-stuff-group${this.additionalStuffIndex}`);
        clone.querySelector('.position-inp').setAttribute('name', `position_${this.additionalStuffIndex}`);
        clone.querySelector('.person-name-inp').setAttribute('name', `personName_${this.additionalStuffIndex}`);
        document.getElementById('details-fieldset').appendChild(clone);
    }
}
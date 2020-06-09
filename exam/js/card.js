const cardTemplate = template`
    <div class="card mt-3 col-6" style="max-width: 48%;">
        <div class="row no-gutters">
            <div class="col-md-4">
                <img src="${'poster'}" class="card-img" alt="${'title'}">
            </div>
            <div class="col-md-8">
                <div class="card-body">
                <h5 class="card-title">${'title'}</h5>
                <p class="card-text">${'description'}</p>
                <p class="card-text"><small class="text-muted font-weight-bold">${'rating'}</small></p>
                <div class="card-text"><a href="#list-${'id'}" class="more">Подробнее...</a></div>
                </div>
            </div>
            <div class="card-footer">
                <button class="btn btn-sm btn-outline-primary btn-edit" onclick="app.editMovieHandler('${'id'}')"><svg class="octicon octicon-pencil" viewBox="0 0 14 16" version="1.1" width="14" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M0 12v3h3l8-8-3-3-8 8zm3 2H1v-2h1v1h1v1zm10.3-9.3L12 6 9 3l1.3-1.3a.996.996 0 0 1 1.41 0l1.59 1.59c.39.39.39 1.02 0 1.41z"></path></svg></button>
                <button class="btn btn-sm btn-outline-danger btn-delete" onclick="app.deleteMovieHandler('${'id'}')"><svg class="octicon octicon-x" viewBox="0 0 14 18" version="1.1" width="14" height="18" aria-hidden="true"><path fill-rule="evenodd" d="M7.48 8l3.75 3.75-1.48 1.48L6 9.48l-3.75 3.75-1.48-1.48L4.52 8 .77 4.25l1.48-1.48L6 6.52l3.75-3.75 1.48 1.48L7.48 8z"></path></svg></button>
            </div>
        </div>
    </div>
`;
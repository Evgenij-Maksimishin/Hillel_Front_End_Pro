const movieTemplate = template`<div class="movie-details">
  <div class="my-5">
    <h1 class="my-0">${'title'}</h1>
    <h4 class="my-0">${'originalTitle'}</h2>
  </div>
  <div class="row">
    <div class="col-sm-3">
      <img class="img-fluid" src="${'poster'}" alt="${'title'}">
      <div class="text-center mt-2">
        <button type="button" id="like-btn" class="btn btn-text" data-count="${'likeCount'}" onclick="app.movieDetailsRenderer.putLike(this);app.saveMoviesToStorage();">
          <svg height="32" class="octicon octicon-thumbsup" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M15.98 8.17l-.97 5.95C14.84 15.5 13.13 16 12 16H5.69c-.2 0-.38-.05-.53-.14L3.72 15H2c-1.06 0-2-.94-2-2V9c0-1.06.94-2.02 2-2h2c.91 0 1.39-.45 2.39-1.55.91-1 .88-1.8.63-3.27-.08-.5.06-1 .42-1.42C7.83.29 8.42 0 9 0c1.83 0 3 3.71 3 5.01l-.02.98h2.04c1.16 0 1.95.8 1.98 1.97 0 .11-.02.21-.02.21zm-1.97-1.19h-1.99c-.7 0-1.03-.28-1.03-.97l.03-1.03c0-1.27-1.17-4-2-4-.5 0-1.08.5-1 1 .25 1.58.34 2.78-.89 4.14C6.11 7.25 5.36 8 4 8v6l1.67 1H12c.73 0 1.95-.31 2-1l.02-.02 1-6c-.03-.64-.38-1-1-1h-.01z"></path></svg>
        </button>
        <button type="button" id="dislike-btn" class="btn btn-text" data-count="${'dislikeCount'}" onclick="app.movieDetailsRenderer.putDislike(this);app.saveMoviesToStorage();"><svg height="32" class="octicon octicon-thumbsdown" viewBox="0 0 16 16" version="1.1" width="32" aria-hidden="true"><path fill-rule="evenodd" d="M15.98 7.83l-.97-5.95C14.84.5 13.13 0 12 0H5.69c-.2 0-.38.05-.53.14L3.72 1H2C.94 1 0 1.94 0 3v4c0 1.06.94 2.02 2 2h2c.91 0 1.39.45 2.39 1.55.91 1 .88 1.8.63 3.27-.08.5.06 1 .42 1.42.39.47.98.76 1.56.76 1.83 0 3-3.71 3-5.01l-.02-.98h2.04c1.16 0 1.95-.8 1.98-1.97 0-.11-.02-.21-.02-.21zm-1.97 1.19h-1.99c-.7 0-1.03.28-1.03.97l.03 1.03c0 1.27-1.17 4-2 4-.5 0-1.08-.5-1-1 .25-1.58.34-2.78-.89-4.14C6.11 8.75 5.36 8 4 8V2l1.67-1H12c.73 0 1.95.31 2 1l.02.02 1 6c-.03.64-.38 1-1 1h-.01z"></path></svg></button>
      </div>
    </div>
    <div class="col-sm-6">
      <ul class="movie-info pl-0">
        <li class="d-flex">
          <p class="col-3">год</p>
          <p class="col-9">${'year'}</p>
        </li>
        <li class="d-flex">
          <p class="col-3">страна</p>
          <p class="col-9">${'country'}</p>
        </li>
        <li class="d-flex">
          <p class="col-3">слоган</p>
          <p class="col-9">${'slogan'}</p>
        </li>
        <li class="d-flex">
          <p class="col-3">режиссер</p>
          <p class="col-9">${'director'}</p>
        </li>
        ${'additionalStuff'}
      </ul>
      <div class="movie-description mt-5">
        <p class="font-weight-bold">IMDb: ${'rating'}</p>
        <p>${'description'}</p>
      </div>
    </div>
    ${'cast'}
  </div>
</div>
`;
const addNewTemplate = `<div class="modal fade" role="dialog" id="addNewModal">
<div class="modal-dialog">
<div class="modal-content">
  <div class="modal-header">
    <h5 class="modal-title">Добавить новый фильм</h5>
    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
      <span aria-hidden="true">&times;</span>
    </button>
  </div>
  <div class="modal-body">
    <form class="w-100 mx-auto" id="add-new-form" name="add-new-form">
        <div class="form-group">
          <label>Название фильма:</label>
          <input type="text" class="form-control" name="title" required>
        </div>
        <div class="form-group">
          <label>Оригинальное название фильма:</label>
          <input type="text" class="form-control" name="originalTitle">
        </div>
        <div class="input-group mb-3">
          <div class="input-group-prepend">
            <span class="input-group-text" id="upload-poster-addon">Постер</span>
          </div>
          <div class="custom-file">
            <input type="file" class="custom-file-input" id="upload-poster" name="poster" aria-describedby="upload-poster-addon">
            <label class="custom-file-label" for="upload-poster">Выберите файл</label>
          </div>
        </div>
        <fieldset class="form-group" id="details-fieldset">
          <legend class="col-form-label pt-0">Детальная информация:</legend>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Год:</label>
            <div class="col-sm-10">
              <input type="number" class="form-control" name="year" min="1900" max="2020">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Страна:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="country">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Слоган:</label>
            <div class="col-sm-10">
              <input type="text" class="form-control" name="slogan">
            </div>
          </div>
          <div class="form-group row">
            <label class="col-sm-2 col-form-label">Режиссер:</label>
            <div class="col-sm-8">
              <input type="text" class="form-control" name="director">
            </div>
            <div class="col-sm-2">
              <button class="btn btn-primary btn-add-field" type="button" id="add-stuff-btn"><svg class="octicon octicon-plus" viewBox="0 0 12 16" version="1.1" width="12" height="16" aria-hidden="true"><path fill-rule="evenodd" d="M12 9H7v5H5V9H0V7h5V2h2v5h5v2z"></path></svg></button>
            </div>
          </div>
        </fieldset>
        <div class="form-group">
          <label>В ролях:</label>
          <textarea class="form-control" rows="3" name="cast"></textarea>
          <small class="form-text text-muted">Укажите актеров через запятую.</small>
        </div>
        <div class="form-group">
          <label>Рейтинг IMDB:</label>
          <input type="number" class="form-control" name="rating" min="1" max="10">
        </div>
        <div class="form-group">
          <label>Описание:</label>
          <textarea class="form-control" rows="3" name="description"></textarea>
        </div>
      </form>
      <p class="d-none" id="movie-saved-message" role="alert">Movie successfully saved!</p>
      <p class="d-none" id="movie-edited-message" role="alert">Movie successfully updated!</p>
      <p class="d-none" id="movie-exist-message" role="alert">Movie with such title already exist!</p>
  </div>
  <div class="modal-footer justify-content-center">
    <button type="button" class="btn btn-outline-danger" data-dismiss="modal">Отменить</button>
    <button type="button" class="btn btn-primary mr-3" id="save-movie-btn">Сохранить</button>
  </div>
</div>
</div>
</div>
`;
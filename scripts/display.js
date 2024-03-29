'use strict';

/* globals Store */

const Display = (function () {

    function noBookmarks() {
        return `
      <h2> Welcome to FireFly Web Clipper </h2>
      <p>You don't have any bookmarks yet!  Click 'Add New Bookmark' to add your first bookmark.</p>
      <button class='button' id='new-bookmark'>Add New Bookmark</button>
    `;
    }

    function listHeader() {
        return `

      <div class='bookmark-controls'>
        <button class='button' id='new-bookmark'>Add New Bookmark</button>
        <label for='filter-by-rating'>Filter By Min Rating</label>
        <select id='filter-by-rating'>
          <option value="" ${Store.filterBy === '' ? 'selected="selected"' : ''}>All</option>
          <option value="1" ${Store.filterBy === 1 ? 'selected="selected"' : ''}>1 Star</option>
          <option value="2" ${Store.filterBy === 2 ? 'selected="selected"' : ''}>2 Stars</option>
          <option value="3" ${Store.filterBy === 3 ? 'selected="selected"' : ''}>3 Stars</option>
          <option value="4" ${Store.filterBy === 4 ? 'selected="selected"' : ''}>4 Stars</option>
          <option value="5" ${Store.filterBy === 5 ? 'selected="selected"' : ''}>5 Stars</option>
        </select>
      </div>
    `;
    }

    function error(message) {
        return `
      ${message}
      <span id='close-error-msg'><i class="fas fa-times"></i></span>
    `;
    }

    function form() {
        return `
      <div class='form-field'>
        <label for='bookmark-title'></label>
        <input type='text' name='title' id='bookmark-title' placeholder='Title' >
      </div>

      <div class='form-field'>
        <label for='bookmark-url'></label>
        <input type='text' name='url' id='bookmark-url' placeholder='https://FireFlyWebClipper.com' >
      </div>

      <div class='form-field description'>
        <label for='bookmark-desc'></label>
        <textarea form='js-form' name='desc' id='bookmark-desc' placeholder='Description about your bookmark...'></textarea>
      </div>

      <fieldset class='form-field'>
        <legend> Rating </legend>
        <label> <input type="radio" name="rating" value="1"> 1 </label>
        <label> <input type="radio" name="rating" value="2"> 2 </label>
        <label> <input type="radio" name="rating" value="3"> 3 </label>
        <label> <input type="radio" name="rating" value="4"> 4 </label>
        <label> <input type="radio" name="rating" value="5"> 5 </label>
      </fieldset>

      <div class='form-controls'>
        <button class='button' type='submit'>Create</button>
        <button class='button' type='button' id='close-form'>Cancel</button>
      </div>
    `;
    }

    function editForm(bookmark) {
        return `
      <li class='bookmark' data-id='${bookmark.id}'>
        <div class='header'>
          <i class="fas fa-chevron-up"></i>
          <h3 ">${bookmark.title}</h3>
        </div>
        
        <div class='body'>
          <form id='js-edit-form'>
            <div class='description'>
              <label style='display:block;' for='edit-bookmark-desc'>Description</label>
              <textarea form='js-edit-form' name='desc' id='edit-bookmark-desc'>${bookmark.desc ? bookmark.desc : 'no description given'}</textarea>
            </div>
            <div class='rating'>
              <fieldset>
                <legend> Rating </legend>
                  <label> <input type="radio" name="rating" value="1" ${bookmark.rating === 1 ? 'checked="checked"' : ''}> 1 </label>
                  <label> <input type="radio" name="rating" value="2" ${bookmark.rating === 2 ? 'checked="checked"' : ''}> 2 </label>
                  <label> <input type="radio" name="rating" value="3" ${bookmark.rating === 3 ? 'checked="checked"' : ''}> 3 </label>
                  <label> <input type="radio" name="rating" value="4" ${bookmark.rating === 4 ? 'checked="checked"' : ''}> 4 </label>
                  <label> <input type="radio" name="rating" value="5" ${bookmark.rating === 5 ? 'checked="checked"' : ''}> 5 </label>
              </fieldset>
              <span class='edit-bookmark'><a href='#'>cancel</a></span>
              <span class='remove-bookmark'><i class="far fa-trash-alt"></i></span>
            </div>
            <button type='submit' class='button small'>Update Bookmark</button>
          </form>
        </div>
      </li>
    `;
    }

    function rating(rating) {
        rating = Number(rating);
        let html = '';
        for (let i = 0; i < rating; i++) {
            html += '<i class="fas fa-star"></i>';
        }
        return html;
    }

    function bookmarkListView(bookmark) {
        return `
      <li class='bookmark' tabindex="0" data-id='${bookmark.id}'>
        <div class='header' >
          <i class="fas fa-chevron-down" ></i>
          <h3  >${bookmark.title}</h3>
        </div>
        
        <div class='body'>
          <div class='rating'>
            ${bookmark.rating ? Display.rating(bookmark.rating) : 'no rating given'}
            <span class='remove-bookmark'><i class="far fa-trash-alt"></i></span>
          </div>
        </div>
      </li>
    `;
    }

    function bookmarkExpandedView(bookmark) {
        return `
      <li class='bookmark' data-id='${bookmark.id}'>
        <div style="background-color:black;color:white;" class='header' >
          <i style="color:white;" class="fas fa-chevron-up"></i>
          <h3 >${bookmark.title}</h3>
        </div>
        
        <div class='body'>
          <p>
            ${bookmark.desc ? bookmark.desc : 'no description given'}
          </p>
          <a class='button small' href='${bookmark.url}' target='_blank'>Visit Site</a>
          <div class='rating'>
            ${bookmark.rating ? Display.rating(bookmark.rating) : 'no rating given'}
            <span class='edit-bookmark'><i class="far fa-edit"></i></span>
            <span class='remove-bookmark'><i class="far fa-trash-alt"></i></span>
          </div>
        </div>
      </li>
    `;
    }

    return {
        noBookmarks,
        listHeader,
        error,
        form,
        editForm,
        rating,
        bookmarkListView,
        bookmarkExpandedView
    };

}());
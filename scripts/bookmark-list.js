'use strict';

/* globals Store, Api, Display */

$.prototype.extend({
    serializeJson: function () {
        const formData = new FormData(this[0]);
        const obj = {};
        formData.forEach((val, name) => obj[name] = val);
        return JSON.stringify(obj);
    }
});

const BookmarkList = (function () {

    function render(filteredList = null) {
        if (Store.isAdding) {
            $('#js-form').html(Display.form());
            $('#js-form').show();
        } else {
            $('#js-form').html('');
            $('#js-form').hide();
        }
        if (!Store.list.length) {
            $('.js-list-header').html('');
            $('.js-bookmark-list').html('');
            return $('.js-no-bookmarks-intro').html(Display.noBookmarks());
        }

        const bookmarks = filteredList ? filteredList : Store.list;
        const bookmarkTemplate = bookmarks.map(bookmark => buildBookmarkHtml(bookmark));

        $('.js-no-bookmarks-intro').html('');
        $('.js-list-header').html(Display.listHeader());
        $('.js-bookmark-list').html(bookmarkTemplate);
    }

    function renderError(message) {
        $('.js-error-message').html(Display.error(message));
        $('.js-error-message').show();
    }

    function buildBookmarkHtml(bookmark) {
        if (bookmark.isEditing) {
            return Display.editForm(bookmark);
        } else if (bookmark.isExpanded) {
            return Display.bookmarkExpandedView(bookmark);
        } else {
            return Display.bookmarkListView(bookmark);
        }
    }

    // handlers

    function formSubmit() {
        $('.container').on('submit', 'form#js-form', function (e) {
            e.preventDefault();
            const data = $(e.target).serializeJson();
            Api.addBookmark(data)
                .then(bookmark => {
                    Store.addBookmark(bookmark);
                    render();
                })
                .catch(error => {
                    renderError(error.message);
                });
        });
    }
    function filterByRating() {
        $('.container').on('change', 'select', function () {
            const rating = $(this).val();
            const filteredList = Store.filterByRating(rating);
            render(filteredList);
        });
    }
    function displayForm() {
        $('.container').on('click', '#new-bookmark', function () {
            Store.isAdding = true;
            render();
        });
    }

    function formClose() {
        $('.container').on('click', '#close-form', function () {
            Store.isAdding = false;
            render();
        });
    }



    function toggleBookmarkView() {
        $('.js-bookmark-list').on('click', '.header', function () {
            const id = $(this).closest('li').data('id');
            Store.toggleExpandedView(id);
            render();
        });
    }

    function bookmarkDelete() {
        $('.js-bookmark-list').on('click', '.remove-bookmark', function () {
            const id = $(this).closest('li').data('id');
            Api.deleteBookmark(id)
                .then(() => {
                    Store.deleteBookmark(id);
                    render();
                })
                .catch(error => {
                    renderError(error.message);
                });
        });
    }

    function closeError() {
        $('.container').on('click', '#close-error-msg', function () {
            $(this).closest('div').hide();
        });
    }

    function toggleEditForm() {
        $('.js-bookmark-list').on('click', '.edit-bookmark', function () {
            const id = $(this).closest('li').data('id');
            Store.toggleEditing(id);
            render();
        });
    }

    function editFormSubmit() {
        $('.js-bookmark-list').on('submit', 'form#js-edit-form', function (e) {
            e.preventDefault();
            const id = $(this).closest('li').data('id');
            const data = $(e.target).serializeJson();
            Api.updateBookmark(id, data)
                .then(() => {
                    Store.updateBookmark(id, data);
                    render();
                })
                .catch(error => {
                    renderError(error.message);
                });
        });
    }

    function fireEventHandlers() {
        displayForm();
        formClose();
        formSubmit();
        toggleBookmarkView();
        bookmarkDelete();
        filterByRating();
        closeError();
        toggleEditForm();
        editFormSubmit();
    }

    return {
        render,
        renderError,
        fireEventHandlers
    };
}());
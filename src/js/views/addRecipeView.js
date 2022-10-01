import View from './views';

class AddRecipeView extends View {
  _parentEl = document.querySelector('.upload');
  _modal = document.querySelector('.add-recipe-window');
  _overlay = document.querySelector('.overlay');
  _btnOpen = document.querySelector('.nav__btn--add-recipe');
  _btnClose = document.querySelector('.btn--close-modal');
  _message = 'Recipe was successfully uploaded :)';

  constructor() {
    super();
    // this._addToggleModalHandler();
  }

  toggleWindow() {
    this._modal.classList.toggle('hidden');
    this._overlay.classList.toggle('hidden');
  }

  _addToggleModalHandler() {
    // show modal
    this._btnOpen.addEventListener('click', this.toggleWindow.bind(this));

    // close modal
    this._btnClose.addEventListener('click', this.toggleWindow.bind(this));
    this._overlay.addEventListener('click', this.toggleWindow.bind(this));
  }

  addUploadHandler(handler) {
    this._parentEl.addEventListener(
      'submit',
      function (e) {
        e.preventDefault();
        const dataArr = [...new FormData(this._parentEl)];
        const data = Object.fromEntries(dataArr);
        handler(data);
      }.bind(this)
    );
  }
}
export default new AddRecipeView();

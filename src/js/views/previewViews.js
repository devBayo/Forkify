import View from './views';
import icons from 'url:../../img/icons.svg';

export default class PreviewView extends View {
  _generateMarkup() {
    return this._data.map(this._generateMarkupPreview).join('');
  }

  _generateMarkupPreview(preview) {
    const id = window.location.hash.slice(1);

    return ` <li class="preview">
    <a class="preview__link ${
      id === preview.id ? 'preview__link--active' : ''
    }" href="#${preview.id}">
      <figure class="preview__fig">
        <img src="${preview.imageUrl}" alt="${preview.title}" />
      </figure>
      <div class="preview__data">
        <h4 class="preview__title">${preview.title}</h4>
        <p class="preview__publisher">${preview.publisher}</p>
      </div>
    </a>
  </li>`;
  }
}

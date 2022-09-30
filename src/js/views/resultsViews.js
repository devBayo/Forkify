import View from './views';
import PreviewViews from './previewViews';
import icons from 'url:../../img/icons.svg';

class ResultsView extends PreviewViews {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    "We couldn't find recipes for that query. Please try another one!";
}
export default new ResultsView();

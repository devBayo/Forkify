import PreviewViews from './previewViews';

class ResultsView extends PreviewViews {
  _parentEl = document.querySelector('.results');
  _errorMessage =
    "We couldn't find recipes for that query. Please try another one!";
}
export default new ResultsView();

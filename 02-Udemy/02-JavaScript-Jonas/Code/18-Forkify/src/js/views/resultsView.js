import View from './View';
import previewView from './previewView';
import icons from 'url:../../img/icons.svg';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _message = 'Start by searching for a recipe or an ingredient. Have fun!';
  _errorMessage =
    "Couldn't find recipes for your query, Please try another one!";

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();

import View from './View';
import icons from 'url:../../img/icons.svg';

class PaginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerPagination(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');
      if (!btn) return;
      const { goToPage } = btn.dataset;
      handler(+goToPage);
    });
  }

  _generateMarkup() {
    const curPage = this._data.page;

    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );

    // Page 1, and there are other pages:
    if (curPage === 1 && numPages > 1)
      return `
        <button data-go-to-page="${
          curPage + 1
        }" class="btn--inline pagination__btn--next">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
          <span>Page ${curPage + 1}</span>
        </button>
      `;

    // Last page:
    if (curPage === numPages && numPages > 1)
      return `
          <button data-go-to-page="${
            curPage - 1
          }" class="btn--inline pagination__btn--prev">
            <svg class="search__icon">
              <use href="${icons}#icon-arrow-left"></use>
            </svg>
            <span>Page ${curPage - 1}</span>
          </button>
`;

    // Other page:
    if (curPage < numPages)
      return `
     <button data-go-to-page="${
       curPage - 1
     }" class="btn--inline pagination__btn--prev">
        <svg class="search__icon">
          <use href="${icons}#icon-arrow-left"></use>
        </svg>
        <span>Page ${curPage - 1}</span>
      </button>
      <button data-go-to-page="${
        curPage + 1
      }" class="btn--inline pagination__btn--next">
      <svg class="search__icon">
          <use href="${icons}#icon-arrow-right"></use>
      </svg>
      <span>Page ${curPage + 1}</span>
      </button>
          `;

    // Page 1, and there are NO other pages:
    return '';
  }
}

export default new PaginationView();

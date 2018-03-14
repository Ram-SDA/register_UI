import { CrudGridPage } from './app.po';

describe('crud-grid App', function() {
  let page: CrudGridPage;

  beforeEach(() => {
    page = new CrudGridPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});

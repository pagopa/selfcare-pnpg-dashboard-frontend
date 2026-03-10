import { NavigationPath } from '@pagopa/selfcare-common-frontend/lib/components/NavigationBar';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { Product } from '../../model/Product';
import { createStore } from '../../redux/store';
import ProductNavigationBar from '../ProductNavigationBar';

const renderComponent = async (paths: Array<NavigationPath>, selectedProduct?: Product) =>
  render(
    <Provider store={createStore()}>
      <ProductNavigationBar selectedProduct={selectedProduct} paths={paths} />
    </Provider>
  );

test('Test ProductNavigationBar component with selected product', () => {
  const selectedProduct = { title: 'Selected Product' } as Product;
  const paths = [{ description: 'Path 1' }, { description: 'Path 2' }];

  renderComponent(paths, selectedProduct);

  const pathElements = screen
    .queryAllByText((_content, element) => element?.tagName.toLowerCase() === 'p')
    .filter(
      (path) =>
        path.textContent === 'Selected Product' ||
        path.textContent === 'Path 1' ||
        path.textContent === 'Path 2'
    );

  expect(pathElements).toHaveLength(3);

  expect(pathElements[0]).toHaveTextContent('Selected Product');
  expect(pathElements[1]).toHaveTextContent('Path 1');
  expect(pathElements[2]).toHaveTextContent('Path 2');
});

test('Test ProductNavigationBar component without selected product', () => {
  const paths = [{ description: 'Path 1' }, { description: 'Path 2' }];

  renderComponent(paths);

  const pathElements = screen
    .queryAllByText((_content, element) => element?.tagName.toLowerCase() === 'p')
    .filter(
      (path) =>
        path.textContent === 'Selected Product' ||
        path.textContent === 'Path 1' ||
        path.textContent === 'Path 2'
    );

  expect(pathElements).toHaveLength(2);

  expect(pathElements[0]).toHaveTextContent('Path 1');
  expect(pathElements[1]).toHaveTextContent('Path 2');
});

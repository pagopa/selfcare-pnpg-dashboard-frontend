import { renderHook } from '@testing-library/react-hooks';
import { useSelectedPartyProduct } from '../useSelectedPartyProduct';
import { mockedPartyProducts } from '../../services/__mocks__/productService';

test('useSelectedPartyProduct returns the currect product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('prod-pn-pg', mockedPartyProducts));

  expect(result.current).toEqual(mockedPartyProducts[0]);
});

test('useSelectedPartyProduct returns undefined for non-existent product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('mockId4', mockedPartyProducts));

  expect(result.current).toBeUndefined();
});

test('useSelectedPartyProduct re-renders when productId changes', () => {
  const { result, rerender } = renderHook(
    ({ productId }: { productId: string }) =>
      useSelectedPartyProduct(productId, mockedPartyProducts),
    { initialProps: { productId: 'prod-pn-pg' } }
  );

  expect(result.current).toEqual(mockedPartyProducts[0]);

  rerender({ productId: 'prod-pn-pg-svil' });

  expect(result.current).toEqual(mockedPartyProducts[1]);
});

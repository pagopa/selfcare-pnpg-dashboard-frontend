import { renderHook } from '@testing-library/react-hooks';
import { useSelectedPartyProduct } from '../useSelectedPartyProduct';
import { mockedPartyProducts } from '../../services/__mocks__/productService';

test('useSelectedPartyProduct returns the currect product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('mockId2', mockedPartyProducts));

  expect(result.current).toEqual({ id: 'mockId2', name: 'Product2' });
});

test('useSelectedPartyProduct returns undefined for non-existent product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('mockId4', mockedPartyProducts));

  expect(result.current).toBeUndefined();
});

test('useSelectedPartyProduct re-renders when productId changes', () => {
  const { result, rerender } = renderHook(
    ({ productId }: { productId: string }) =>
      useSelectedPartyProduct(productId, mockedPartyProducts),
    { initialProps: { productId: 'mockId1' } }
  );

  expect(result.current).toEqual({ id: 'mockId1', name: 'Product1' });

  rerender({ productId: 'mockId2' });

  expect(result.current).toEqual({ id: 'mockId2', name: 'Product2' });
});

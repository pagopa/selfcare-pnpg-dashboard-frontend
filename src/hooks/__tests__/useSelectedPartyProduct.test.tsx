import { renderHook } from '@testing-library/react-hooks';
import { useEffect } from 'react';
import { useSelectedPartyProduct } from '../useSelectedPartyProduct';

const products = [
  { id: 'mockId1', name: 'Product1' },
  { id: 'mockId2', name: 'Product2' },
  { id: 'mockId3', name: 'Product3' },
];

test('useSelectedPartyProduct returns the currect product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('mockId2', products));

  expect(result.current).toEqual({ id: 'mockId2', name: 'Product2' });
});

test('useSelectedPartyProduct returns undefined for non-existent product', () => {
  const { result } = renderHook(() => useSelectedPartyProduct('mockId4', products));

  expect(result.current).toBeUndefined();
});

test('useSelectedPartyProduct re-renders when productId changes', () => {
  const { result, rerender } = renderHook(
    ({ productId }) => useSelectedPartyProduct(productId, products),
    { initialProps: { productId: 'mockId1' } }
  );

  expect(result.current).toEqual({ id: 'mockId1', name: 'Product1' });

  rerender({ productId: 'mockId2' });

  expect(result.current).toEqual({ id: 'mockId2', name: 'Product2' });
});

import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { partiesActions } from '../../redux/slices/partiesSlice';
import { RootState } from '../../redux/store';
import { mockedPnpgParties } from '../../services/__mocks__/partyService';
// import { mockedPartyProduct } from '../../services/__mocks__/productService';

export const verifyMockExecution = (state: RootState) => {
  expect(state.parties.selected).toMatchObject(mockedPnpgParties[0]);
};

export default (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(partiesActions.setPartySelected(mockedPnpgParties[0]));
    // dispatch(partiesActions.setPartySelectedProducts(mockedPartyProduct));
  }, []);
  return <WrappedComponent {...props} />;
};

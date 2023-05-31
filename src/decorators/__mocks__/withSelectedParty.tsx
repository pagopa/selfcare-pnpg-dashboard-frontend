import { useEffect } from 'react';
import { useAppDispatch } from '../../redux/hooks';
import { partiesActions } from '../../redux/slices/partiesSlice';
import { RootState } from '../../redux/store';
import { mockedInstitutions } from '../../services/__mocks__/partyService';
import { mockedPartyProducts } from '../../services/__mocks__/productService';

export const verifyMockExecution = (state: RootState) => {
  expect(state.parties.selected).toMatchObject(mockedInstitutions[0]);
};

export default (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(partiesActions.setPartySelected(mockedInstitutions[0]));
    dispatch(partiesActions.setPartySelectedProducts(mockedPartyProducts));
  }, []);
  return <WrappedComponent {...props} />;
};

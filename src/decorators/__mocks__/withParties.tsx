import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { partiesActions, partiesSelectors } from '../../redux/slices/partiesSlice';
import { RootState } from '../../redux/store';
import { mockedPnpgParties } from '../../services/__mocks__/partyService';

export const verifyMockExecution = (state: RootState) => {
  expect(state.parties.list).toMatchObject(mockedPnpgParties);
};

export default (WrappedComponent: React.ComponentType<any>) => (props: any) => {
  const dispatch = useAppDispatch();
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  useEffect(() => {
    dispatch(partiesActions.setPartiesList(mockedPnpgParties));
  }, []);
  return parties ? <WrappedComponent parties={parties} {...props} /> : <></>;
};

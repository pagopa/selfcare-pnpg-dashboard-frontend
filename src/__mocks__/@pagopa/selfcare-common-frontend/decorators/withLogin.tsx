import { useEffect } from 'react';
import { User } from '@pagopa/selfcare-common-frontend/lib/model/User';
import {
  userActions,
  userSelectors,
} from '@pagopa/selfcare-common-frontend/lib/redux/slices/userSlice';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '../../../../redux/hooks';
import { RootState } from '../../../../redux/store';

export const mockedUser: User = {
  name: 'NAME',
  surname: 'SURNAME',
  uid: 'UID',
  taxCode: 'AAAAAA00A00A000A',
  email: 'a@a.aa',
  iss: 'SPID',
};

export const verifyMockExecution = (state: RootState) => {
  console.log('stateIsThere', state);
  expect(state.user.logged).toMatchObject({ uid: 'UID' });
};

export default (WrappedComponent: React.ComponentType<any>) => () => {
  const dispatch = useAppDispatch();
  const loggedUser = useSelector(userSelectors.selectLoggedUser);
  useEffect(() => {
    dispatch(userActions.setLoggedUser(mockedUser));
  }, []);
  return loggedUser ? <WrappedComponent /> : <></>;
};

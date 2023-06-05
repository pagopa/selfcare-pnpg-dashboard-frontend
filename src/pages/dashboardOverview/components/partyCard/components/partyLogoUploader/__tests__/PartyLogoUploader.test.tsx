import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { mockedInstitutions } from '../../../../../../../services/__mocks__/partyService';
import '../../../../../../../locale';
import { PartyLogoUploader } from '../PartyLogoUploader';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../../redux/store';
import { DashboardApi } from '../../../../../../../api/DashboardApi';
import { saveInstitutionLogo } from '../../../../../../../services/partyService';

jest.mock('../../../../../../../api/DashboardApi', () => ({
  saveInstitutionLogo: jest.fn(),
}));

test('test onDropAccepted behavior', async () => {
  const expectedPartyId = '5b321318-3df7-48c1-67c8-1111e6707c3d';

  render(
    <Provider store={createStore()}>
      <PartyLogoUploader partyId={expectedPartyId} />
    </Provider>
  );

  const dropzoneElement = screen.getByTestId('dropzone');
  const file = new File(['logo.png'], 'logo.png', { type: 'image/png' });

  fireEvent.change(dropzoneElement, { target: { files: [file] } });
});

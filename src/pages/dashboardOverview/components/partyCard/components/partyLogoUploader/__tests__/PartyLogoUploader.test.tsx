import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import '../../../../../../../locale';
import { createStore } from '../../../../../../../redux/store';
import { PartyLogoUploader } from '../PartyLogoUploader';

vi.mock('../../../../../../../api/DashboardApi', () => ({
  saveInstitutionLogo: vi.fn(),
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

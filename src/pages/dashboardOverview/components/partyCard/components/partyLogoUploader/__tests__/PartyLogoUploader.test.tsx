import { fireEvent, render, screen } from '@testing-library/react';
import { mockedPnpgParties } from '../../../../../../../services/__mocks__/partyService';
import '../../../../../../../locale';
import { PartyLogoUploader } from '../PartyLogoUploader';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../../redux/store';
import { DashboardPnpgApi } from '../../../../../../../api/DashboardPnpgApiClient';

beforeEach(() => {
  jest.spyOn(require('../../../../../../../services/partyService'), 'saveInstitutionLogo');
});

const renderComponent = () => {
  render(
    <Provider store={createStore()}>
      <PartyLogoUploader partyId={mockedPnpgParties[0].partyId} />
    </Provider>
  );
};

test('Render test', () => {
  renderComponent();
});

test('Test business logo upload success', async () => {
  renderComponent();

  const file = new File(['logo'], 'logo.png', { type: 'image/png' });
  const input = screen.getByText("Modifica il logo dell'impresa");
  fireEvent.click(input);

  fireEvent.change(input, { target: { files: [file] } });
});

test('Test business logo fail', async () => {
  renderComponent();

  jest.spyOn(DashboardPnpgApi, 'saveInstitutionLogo').mockImplementation(() => {
    return Promise.reject(new Error('Errore durante il caricamento del logo'));
  });

  const file = new File(['logo'], 'logo.png', { type: 'image/png' });
  const input = screen.getByText("Modifica il logo dell'impresa");
  fireEvent.click(input);

  fireEvent.change(input, { target: { files: [file] } });
});

import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { saveInstitutionLogo } from '../../../../../../../services/partyService';
import { mockedPnpgParties } from '../../../../../../../services/__mocks__/partyService';
import '../../../../../../../locale';
import { PartyLogoUploader } from '../PartyLogoUploader';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../../redux/store';

let image;

beforeEach(() => {
  image = new File(['----'], 'mockedImage.png', { type: 'image/png' });
});

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

test('test the presence of the disclaimer and the upload of a mocked business logo', async () => {
  renderComponent();

  screen.getByText(
    `Inserisci solo il logo della tua impresa.\ Sarai responsabile dell’inserimento di immagini diverse da quella indicata.`
  );

  const modifyBusinessLogo = screen.getByText("Modifica il logo dell'impresa");
  fireEvent.click(modifyBusinessLogo);

  await waitFor(() =>
    fireEvent.change(modifyBusinessLogo, {
      target: { files: [image] },
    })
  );

  const businessLogo = document.getElementById('AccountBalanceRoundedIcon') as any;

  if (businessLogo) {
    expect(businessLogo.files[0].name).toBe('mockedImage.png');
    expect(businessLogo.files.length).toBe(1);
  }
});

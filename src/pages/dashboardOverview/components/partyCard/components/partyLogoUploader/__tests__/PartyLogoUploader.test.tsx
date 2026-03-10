import { fireEvent, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { createStore } from '../../../../../../../redux/store';
import { PartyLogoUploader } from '../PartyLogoUploader';

vi.mock('../../../../../../../api/DashboardApi', () => ({
  DashboardApi: {
    saveInstitutionLogo: vi.fn(),
  },
}));

vi.mock('@pagopa/selfcare-common-frontend/lib', () => ({
  useLiveAnnouncerWithRegion: () => ({
    announce: vi.fn(),
    LiveRegion: null,
  }),
}));

vi.mock('@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher', () => ({
  default: () => vi.fn(),
}));

vi.mock('@pagopa/selfcare-common-frontend/lib/services/analyticsService', () => ({
  trackEvent: vi.fn(),
}));

beforeEach(() => {
  globalThis.FileReader = class {
    onload: any;
    onerror: any;
    readAsDataURL() {
      this.onload?.({ target: { result: 'data:image/png;base64,abc' } });
    }
  } as any;

  globalThis.Image = class {
    onload: any;
    set src(_: string) {
      Object.assign(this, { width: 200, height: 200 });
      this.onload?.();
    }
  } as any;
});

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

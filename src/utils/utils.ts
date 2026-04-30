import { isPagoPaUser } from '@pagopa/selfcare-common-frontend/lib/utils/storage';

export const isPnpgOrImprese = () =>
  window.location.hostname.startsWith('pnpg.') || window.location.hostname.startsWith('imprese.');

type AppArea = 'imprese' | 'ar_backstage' | 'area_riservata';

export const getAppArea = (): AppArea => {
  if (isPnpgOrImprese()) {
    return 'imprese';
  }

  if (isPagoPaUser()) {
    return 'ar_backstage';
  }

  return 'area_riservata';
};

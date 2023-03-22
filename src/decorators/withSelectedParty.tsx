import { useErrorDispatcher } from '@pagopa/selfcare-common-frontend';
import { useEffect } from 'react';
import { useParams } from 'react-router';
import { useTranslation } from 'react-i18next';
import { useSelectedParty } from '../hooks/useSelectedParty';

type DashboardUrlParams = {
  partyId: string;
};

export default function withSelectedParty(
  WrappedComponent: React.ComponentType<any>
): React.ComponentType<any> {
  const displayName = WrappedComponent.displayName || WrappedComponent.name || 'Component';

  const ComponentWithSelectedParty = (props: any) => {
    const { fetchSelectedParty } = useSelectedParty();
    const { partyId } = useParams<DashboardUrlParams>();
    const { t } = useTranslation();
    const addError = useErrorDispatcher();

    const doFetch = (): void => {
      fetchSelectedParty(partyId).catch((reason) => {
        addError({
          id: 'FETCH_SELECTED_PARTY_ERROR',
          blocking: false,
          error: reason,
          displayableDescription: t('unmanageableBusiness'),
          techDescription: `An error occurred while retrieving selected party with ${partyId}`,
          toNotify: true,
        });
      });
    };

    useEffect(() => {
      doFetch();
    }, [partyId]);
    return <WrappedComponent {...props} />;
  };

  // eslint-disable-next-line functional/immutable-data
  ComponentWithSelectedParty.displayName = `withSelectedParty(${displayName})`;

  return ComponentWithSelectedParty;
}

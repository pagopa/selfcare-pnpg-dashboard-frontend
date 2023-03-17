import { useEffect } from 'react';
import { useParams } from 'react-router';
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

    const doFetch = (): void => {
      fetchSelectedParty(partyId);
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

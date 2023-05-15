import { PartySwitchItem } from '@pagopa/mui-italia/dist/components/PartySwitch';
import { Header } from '@pagopa/selfcare-common-frontend';
import { User } from '@pagopa/selfcare-common-frontend/model/User';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { useMemo, useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ProductSwitchItem } from '@pagopa/mui-italia';
import { pnpgRoleLabels } from '@pagopa/selfcare-common-frontend/utils/constants';
import withParties, { WithPartiesProps } from '../decorators/withParties';
import { useTokenExchange } from '../hooks/useTokenExchange';
import { Product } from '../model/Product';
import { useAppSelector } from '../redux/hooks';
import { partiesSelectors } from '../redux/slices/partiesSlice';
import ROUTES, { DASHBOARD_ROUTES } from '../routes';
import { PartyPnpg } from '../model/PartyPnpg';
import { ENV } from './../utils/env';

type Props = WithPartiesProps & {
  onExit: (exitAction: () => void) => void;
  loggedUser?: User;
};

const DashboardHeader = ({ onExit, loggedUser, parties }: Props) => {
  const { invokeProductBo } = useTokenExchange();
  const { t } = useTranslation();
  const history = useHistory();

  const party = useAppSelector(partiesSelectors.selectPartySelected);
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);
  const selectedParty = useAppSelector(partiesSelectors.selectPartySelected);

  const [_productSelected, setProductSelected] = useState<Product>();
  const actualActiveProducts = useRef<Array<Product>>([]);
  const actualSelectedParty = useRef<PartyPnpg>();

  const activeProducts: Array<Product> = useMemo(
    () => products?.filter((p) => p.productOnBoardingStatus === 'ACTIVE' && p.authorized) ?? [],
    [products]
  );

  // eslint-disable-next-line functional/immutable-data
  actualActiveProducts.current = activeProducts;
  // eslint-disable-next-line functional/immutable-data
  actualSelectedParty.current = selectedParty;

  return (
    <div tabIndex={0}>
      <Header
        onExit={onExit}
        withSecondHeader={!!party}
        addSelfcareProduct={false}
        selectedPartyId={selectedParty?.partyId}
        productsList={
          products
            ?.filter((p) => p.status === 'ACTIVE' && p.productOnBoardingStatus === 'ACTIVE')
            ?.map((p) => ({
              id: p.id,
              title: p.id === 'prod-pn-pg' ? t('productsList.digitalNotifications') : p.title,
              linkType: 'external',
              productUrl: p.urlPublic,
            }))
            .concat({
              id: 'dashboard-pn-pg',
              title: t('productsList.yourBusiness'),
              linkType: 'external',
              productUrl: resolvePathVariables(DASHBOARD_ROUTES.OVERVIEW.path, {
                partyId: selectedParty?.partyId ?? '',
              }),
            })
            .reverse() as Array<ProductSwitchItem>
        }
        partyList={parties.map((p) => ({
          logoUrl: p.urlLogo ?? '',
          id: p.partyId ?? '',
          name: p.description ?? '',
          productRole: p.userRole ? t(pnpgRoleLabels[p.userRole].longLabelKey) : '',
        }))}
        loggedUser={
          loggedUser
            ? {
                id: loggedUser ? loggedUser.uid : '',
                name: loggedUser?.name,
                surname: loggedUser?.surname,
                email: loggedUser?.email,
              }
            : false
        }
        assistanceEmail={ENV.ASSISTANCE.EMAIL}
        enableLogin={true}
        onSelectedProduct={(p) => {
          onExit(() => {
            const selectedProduct = actualActiveProducts.current.find((ap) => ap.id === p.id);
            setProductSelected(selectedProduct);
            if (selectedProduct && selectedProduct.id !== 'prod-selfcare') {
              void invokeProductBo(
                selectedProduct as Product,
                actualSelectedParty.current as PartyPnpg
              );
            }
          });
        }}
        selectedProductId={'dashboard-pn-pg'}
        onSelectedParty={(selectedParty: PartySwitchItem) => {
          trackEvent('DASHBOARD_PARTY_SELECTION', {
            party_id: selectedParty.id,
          });
          onExit(() =>
            history.push(
              resolvePathVariables(ROUTES.PARTY_DASHBOARD.path, {
                partyId: selectedParty.id,
              })
            )
          );
        }}
        maxCharactersNumberMultiLineItem={25}
      />
    </div>
  );
};
export default withParties(DashboardHeader);

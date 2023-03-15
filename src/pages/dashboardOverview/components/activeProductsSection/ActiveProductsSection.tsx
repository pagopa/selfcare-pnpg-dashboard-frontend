import React from 'react';
import { Grid } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { Product } from '../../../../model/Product';
import { PartyPnpg } from '../../../../model/PartyPnpg';
import ActiveProductCardContainer from './components/ActiveProductCardContainer';

type Props = {
  party: PartyPnpg;
  products: Array<Product>;
};

export default function ActiveProductsSection({ party, products }: Props) {
  const { t } = useTranslation();
  return (
    <React.Fragment>
      <TitleBox title={t('overview.activeProductsSection.title')} mbTitle={2} variantTitle="h5" />
      <Grid container spacing={3}>
        {products &&
          products
            .filter((p) => p.productOnBoardingStatus === 'ACTIVE')
            .map((product) => (
              <ActiveProductCardContainer key={product.id} party={party} product={product} />
            ))}
      </Grid>
    </React.Fragment>
  );
}

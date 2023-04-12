import { Grid } from '@mui/material';
import { useTokenExchange } from '../../../../../hooks/useTokenExchange';
import { PartyPnpg } from '../../../../../model/PartyPnpg';
import { Product } from '../../../../../model/Product';
import ActiveProductCard from './DigitalNotificationCard';

type Props = {
  party: PartyPnpg;
  product: Product;
};

export default function DigitalNotificationCardContainer({ party, product }: Props) {
  const { invokeProductBo } = useTokenExchange();

  return (
    <>
      <Grid item xs={6} lg={4} xl={3}>
        <ActiveProductCard
          cardTitle={product.title}
          urlLogo={product.logo}
          btnAction={() => invokeProductBo(product, party)}
        />
      </Grid>
    </>
  );
}

import { Grid, Box } from '@mui/material';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { theme } from '@pagopa/mui-italia';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { useAppSelector } from '../../redux/hooks';
import { useTokenExchange } from '../../hooks/useTokenExchange';
import { useIsMobile } from '../../hooks/useIsMobile';
import { Party } from '../../model/Party';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';
import PartyCard from './components/partyCard/PartyCard';
import { PartyLogoUploader } from './components/partyCard/components/partyLogoUploader/PartyLogoUploader';
import DigitalNotificationCard from './components/activeProductsSection/components/DigitalNotificationCard';

type Props = {
  party: Party;
};

const DashboardOverview = ({ party }: Props) => {
  const { t } = useTranslation();
  const { invokeProductBo } = useTokenExchange();
  const isMobile = useIsMobile('md');
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);

  const isAdmin = party && party.userRole === 'ADMIN';

  return (
    <Grid p={3} xs={12}>
      <WelcomeDashboard businessName={party?.description} />
      <Grid container direction="row" alignItems="center" mb={2}>
        <Grid
          item
          sx={{
            display: 'flex',
            width: 'auto',
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              flexDirection: 'column',
              width: '100%',
            },
          }}
        >
          {isAdmin && <PartyLogoUploader partyId={party.partyId} />}
          <Grid item xs={12} md={8} mt={isAdmin && isMobile ? 4 : 0}>
            <PartyCard party={party} />
          </Grid>
        </Grid>
      </Grid>
      <Grid item container ml={1} mt={5}>
        <TitleBox
          title={t('overview.notificationAreaProduct.title')}
          mbTitle={3}
          variantTitle="h4"
          titleFontSize="28px"
        />
        <Grid container spacing={3} mb={44}>
          {products &&
            products
              .filter(
                (p) =>
                  p.status === 'ACTIVE' &&
                  party?.products?.some(
                    (pp) => pp.productId === p.id && pp.productOnBoardingStatus === 'ACTIVE'
                  )
              )
              .map((p) => (
                <Box key={p.id} marginTop={3} marginLeft={3}>
                  <DigitalNotificationCard
                    cardTitle={
                      p.id === 'prod-pn-pg'
                        ? t('overview.notificationAreaProduct.card.title')
                        : p.title
                    }
                    urlLogo={p.logo}
                    btnAction={() => (party ? invokeProductBo(p, party) : undefined)}
                  />
                </Box>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;

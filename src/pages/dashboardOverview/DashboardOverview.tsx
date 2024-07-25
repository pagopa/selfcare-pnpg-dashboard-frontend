import { Box, Grid } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { usePermissions } from '@pagopa/selfcare-common-frontend/lib';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import i18n from '@pagopa/selfcare-common-frontend/lib/locale/locale-utils';
import { Actions } from '@pagopa/selfcare-common-frontend/lib/utils/constants';
import { useTranslation } from 'react-i18next';
import { useIsMobile } from '../../hooks/useIsMobile';
import { useTokenExchange } from '../../hooks/useTokenExchange';
import { Party } from '../../model/Party';
import { useAppSelector } from '../../redux/hooks';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import DigitalNotificationCard from './components/activeProductsSection/components/DigitalNotificationCard';
import PartyCard from './components/partyCard/PartyCard';
import { PartyLogoUploader } from './components/partyCard/components/partyLogoUploader/PartyLogoUploader';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';

type Props = {
  party: Party;
};

const DashboardOverview = ({ party }: Props) => {
  const { t } = useTranslation();
  const { invokeProductBo } = useTokenExchange();
  const isMobile = useIsMobile('md');
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);
  const { getAllProductsWithPermission } = usePermissions();
  const lang = i18n.language;

  const canUploadLogo = getAllProductsWithPermission(Actions.UploadLogo).length > 0;

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
          {canUploadLogo && <PartyLogoUploader partyId={party.partyId} />}
          <Grid item xs={12} md={8} mt={canUploadLogo && isMobile ? 4 : 0}>
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
                    btnAction={() => (party ? invokeProductBo(p, party, lang) : undefined)}
                  />
                </Box>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;

import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { theme } from '@pagopa/mui-italia';
import { Party } from '../../model/Party';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { useAppSelector } from '../../redux/hooks';
import { useTokenExchange } from '../../hooks/useTokenExchange';
import { useIsMobile } from '../../hooks/useIsMobile';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';
import PartyCard from './components/partyCard/PartyCard';
import { PartyLogoUploader } from './components/partyCard/components/partyLogoUploader/PartyLogoUploader';
import DigitalNotificationCard from './components/activeProductsSection/components/DigitalNotificationCard';

type UrlParams = {
  partyId: string;
};

const DashboardOverview = () => {
  const { t } = useTranslation();
  const { partyId } = useParams<UrlParams>();
  const { invokeProductBo } = useTokenExchange();
  const isMobile = useIsMobile('md');
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);

  const [selectedParty, setSelectedParty] = useState<Party>();

  useEffect(() => {
    const chosenParty = parties?.find((p) => p.externalId === partyId || p.partyId === partyId);
    setSelectedParty(chosenParty);
  }, [partyId]);

  const isAdmin = selectedParty && selectedParty.userRole === 'ADMIN';

  return (
    <Grid p={3} xs={12}>
      <WelcomeDashboard businessName={selectedParty?.description} />
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
          {isAdmin && <PartyLogoUploader partyId={selectedParty.partyId} />}
          <Grid item xs={12} md={8} mt={isAdmin && isMobile ? 4 : 0}>
            <PartyCard party={selectedParty} />
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
              .filter((p) => p.status === 'ACTIVE' && p.productOnBoardingStatus === 'ACTIVE')
              .map((p) => (
                <Box key={p.id} marginTop={3} marginLeft={3}>
                  <DigitalNotificationCard
                    cardTitle={
                      p.id === 'prod-pn-pg'
                        ? t('overview.notificationAreaProduct.card.title')
                        : p.title
                    }
                    urlLogo={p.logo}
                    btnAction={() =>
                      selectedParty ? invokeProductBo(p, selectedParty) : undefined
                    }
                  />
                </Box>
              ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default DashboardOverview;

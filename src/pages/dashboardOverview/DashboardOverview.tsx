import { Grid, Box } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation } from 'react-i18next';
import { PartyPnpg } from '../../model/PartyPnpg';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { useAppSelector } from '../../redux/hooks';
import SendIcon from '../../assets/send.svg';
import { useTokenExchange } from '../../hooks/useTokenExchange';
import ActiveProductCard from './components/activeProductsSection/components/DigitalNotificationCard';
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
  const parties = useAppSelector(partiesSelectors.selectPartiesList);
  const products = useAppSelector(partiesSelectors.selectPartySelectedProducts);

  const [selectedParty, setSelectedParty] = useState<PartyPnpg>();

  useEffect(() => {
    const chosenParty = parties?.find((p) => p.externalId === partyId || p.partyId === partyId);
    setSelectedParty(chosenParty);
  }, [partyId]);

  const prodPnpg = products?.find((p) => p.id === 'prod-pn-pg');

  return (
    <Box p={3} sx={{ width: '100%' }}>
      <WelcomeDashboard businessName={selectedParty?.description} />
      <Grid container direction="row" justifyContent={'center'} alignItems="center" mb={2}>
        {selectedParty && (
          <Grid item xs={6}>
            <PartyLogoUploader partyId={selectedParty.partyId} />
          </Grid>
        )}
        <Grid item xs={6}>
          <PartyCard party={selectedParty} />
        </Grid>
      </Grid>
      <Grid item container ml={1} mt={5}>
        <TitleBox
          title={t('overview.notificationAreaProduct.title')}
          mbTitle={3}
          variantTitle="h4"
          titleFontSize="28px"
        />
        <Grid container mb={44}>
          {prodPnpg && (
            <DigitalNotificationCard
              cardTitle={t('overview.notificationAreaProduct.card.title')}
              urlLogo={SendIcon}
              btnAction={() =>
                prodPnpg && selectedParty ? invokeProductBo(prodPnpg, selectedParty) : undefined
              }
            />
          )}
          {products &&
            products
              .filter(
                (p) =>
                  p.status === 'ACTIVE' &&
                  p.productOnBoardingStatus === 'ACTIVE' &&
                  p.id !== 'prod-pn-pg'
              )
              .map((p) => (
                <Box key={p.id} marginLeft={3}>
                  <ActiveProductCard
                    cardTitle={p.title}
                    urlLogo={p.logo}
                    btnAction={() =>
                      selectedParty ? invokeProductBo(p, selectedParty) : undefined
                    }
                  />
                </Box>
              ))}
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;

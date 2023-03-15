import { Grid, Box, Typography } from '@mui/material';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { storageTokenOps } from '@pagopa/selfcare-common-frontend/utils/storage';
import { useErrorDispatcher } from '@pagopa/selfcare-common-frontend';
import { useTranslation } from 'react-i18next';
import { PartyPnpg } from '../../model/PartyPnpg';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import { useAppSelector } from '../../redux/hooks';
import { retrieveProductBackoffice } from '../../services/partyService';
import PnIcon from '../../assets/pn.svg';
import WelcomeDashboard from './components/welcomeDashboard/WelcomeDashboard';
import PartyCard from './components/partyCard/PartyCard';
import { PartyLogoUploader } from './components/partyCard/components/partyLogoUploader/PartyLogoUploader';
import ActiveProductCard from './components/activeProductsSection/components/ActiveProductCard';
/*
type Props = {
  party: PartyPnpg;
  products?: Array<Product>;
}; */

type UrlParams = {
  partyId: string;
};

const DashboardOverview = () => {
  const { t } = useTranslation();
  const { partyId } = useParams<UrlParams>();
  const addError = useErrorDispatcher();
  const parties = useAppSelector(partiesSelectors.selectPartiesList);

  const [_loading, setLoading] = useState<boolean>(false);
  const [selectedParty, setSelectedParty] = useState<PartyPnpg>();

  useEffect(() => {
    const chosenParty = parties?.find((p) => p.externalId === partyId);
    setSelectedParty(chosenParty);
  }, [partyId]);

  const handleClick = async (productId: string, institutionId: string) => {
    storageTokenOps.write(
      'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6Imp3dF84Njo3NDoxZTozNTphZTphNjpkODo0YjpkYzplOTpmYzo4ZTphMDozNTo2ODpiNSJ9.eyJlbWFpbCI6ImZ1cmlvdml0YWxlQG1hcnRpbm8uaXQiLCJmYW1pbHlfbmFtZSI6IlNhcnRvcmkiLCJmaXNjYWxfbnVtYmVyIjoiU1JUTkxNMDlUMDZHNjM1UyIsIm5hbWUiOiJBbnNlbG1vIiwiZnJvbV9hYSI6ZmFsc2UsInVpZCI6IjUwOTZlNGM2LTI1YTEtNDVkNS05YmRmLTJmYjk3NGE3YzFjOCIsImxldmVsIjoiTDIiLCJpYXQiOjE2NzU0MTcxMTYsImV4cCI6MTY3NTQ0OTUxNiwiYXVkIjoiYXBpLmRldi5zZWxmY2FyZS5wYWdvcGEuaXQiLCJpc3MiOiJTUElEIiwianRpIjoiMDFHUkJBOFFKMDdKN0U3RDIySFo3NFo0TTYifQ.fZJ4b7Au6oRjxd9WqivcWeVz8KO2IKx6rDTZNNyEcXQ6zKuJDz27CWBwJ635_3WlhbYynPVXlvp4FrDQEGch1eeEfmkSCyKVFd38BlUBRYeuPYL-g79jzu_fdVOj6TzVF9y1cumC_3Z3wagxcryjEtzpD-0qPVZrGyrBAyGiM6qc6PxzY49kMYefz8l17n59GDUf72xHAWQPRXqKomgJTeTd_-dV_5h_R7PfrocJgg6InywYl87dr_c7G7Neg4-zIHa74rijh7nuTVNgdUzitJlZLlLoOHZG93yFtQeGzXdPbX6CvsP2lqCCTsXs5JSgwNofZ3NilDTFwIxd1lLaBA'
    );
    setLoading(true);
    retrieveProductBackoffice(productId, institutionId)
      .then((backOfficeUrl) => window.location.assign(backOfficeUrl))
      .catch((reason) => {
        addError({
          id: 'RETRIEVE_PRODUCT_BACK_OFFICE_ERROR',
          blocking: false,
          error: reason,
          techDescription: `An error occurred while retrieving product back office for institutionId ${institutionId}`,
          toNotify: true,
        });
      })
      .finally(() => setLoading(false));
  };

  return (
    <Box p={3} sx={{ width: '100%' }}>
      <WelcomeDashboard businessName={selectedParty?.name} />
      <Grid container direction="row" justifyContent={'center'} alignItems="center" mb={2}>
        <Grid item xs={6} display="flex" alignItems="center">
          <Typography variant="h6" sx={{ fontWeight: '700' }}>
            {selectedParty?.name}
          </Typography>
        </Grid>
        {selectedParty && (
          <Grid item xs={6}>
            <PartyLogoUploader partyId={selectedParty.id} />
          </Grid>
        )}
      </Grid>
      <Grid item xs={12}>
        <PartyCard party={selectedParty} />
      </Grid>
      <Grid item container ml={1} mt={5}>
        <TitleBox
          title={t('overview.notificationAreaProduct.title')}
          mbTitle={3}
          variantTitle="h4"
          titleFontSize="28px"
        />
        <Grid container mb={44}>
          <ActiveProductCard
            cardTitle={t('overview.notificationAreaProduct.card.title')}
            urlLogo={PnIcon}
            btnAction={() =>
              selectedParty ? handleClick('prod-pnpg', selectedParty.id) : undefined
            }
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default DashboardOverview;

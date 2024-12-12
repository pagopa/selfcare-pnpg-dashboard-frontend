import { Alert, Button, Grid } from '@mui/material';
import { ButtonNaked } from '@pagopa/mui-italia';
import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/lib/utils/routes-utils';
import { storageUserOps } from '@pagopa/selfcare-common-frontend/lib/utils/storage';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { Party } from '../../../../model/Party';
import { ENV } from '../../../../utils/env';

type Props = {
  party: Party;
  businessName?: string;
};

export default function WelcomeDashboard({ businessName, party }: Readonly<Props>) {
  const { t } = useTranslation();
  const history = useHistory();

  const title = t('overview.title');
  const subTitle = t('overview.subTitle', { businessName });

  return (
    <>
      <TitleBox
        title={title}
        subTitle={subTitle}
        mbTitle={2}
        mbSubTitle={5}
        variantTitle="h4"
        variantSubTitle="body1"
      />

      {party?.userRole === 'ADMIN' && (
        <Grid item xs={12} mb={2}>
          <Alert
            sx={{ mt: 5 }}
            severity="info"
            variant="standard"
            action={
              <ButtonNaked
                component={Button}
                onClick={() =>
                  history.push(
                    resolvePathVariables(`${ENV.ROUTES.USERS}/:userId/edit`, {
                      partyId: party.partyId,
                      userId: storageUserOps.read()?.uid ?? '',
                    }) + '?activeField=mobilePhone'
                  )
                }
                color="primary"
                sx={{ fontSize: 'fontSize', fontWeight: 'fontWeightBold' }}
              >
                {t('customAlert.button')}
              </ButtonNaked>
            }
          >
            {t('customAlert.message')}
          </Alert>
        </Grid>
      )}
    </>
  );
}

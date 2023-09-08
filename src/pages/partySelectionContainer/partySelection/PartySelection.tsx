import React, { useEffect } from 'react';
import { Grid, Button, Paper, useTheme, Typography, Stack, Link } from '@mui/material';
import { useHistory } from 'react-router';
import { resolvePathVariables } from '@pagopa/selfcare-common-frontend/utils/routes-utils';
import { trackEvent } from '@pagopa/selfcare-common-frontend/services/analyticsService';
import { useTranslation, Trans } from 'react-i18next';
import ROUTES from '../../../routes';
import { useAppDispatch } from '../../../redux/hooks';
import { partiesActions } from '../../../redux/slices/partiesSlice';
import { BaseParty } from '../../../model/Party';
import PartySelectionSearch from '../../../components/partySelectionSearch/PartySelectionSearch';
import { ENV } from '../../../utils/env';

type Props = {
  parties: Array<BaseParty>;
};

export default function PartySelection({ parties }: Props) {
  const { t } = useTranslation();
  const bodyTitle = t('businessSelection.title');
  const theme = useTheme();
  const [selectedParty, setSelectedParty] = React.useState<BaseParty | null>(
    parties.length === 1 ? parties[0] : null
  );
  const [disableBtn, setBtnDisable] = React.useState(true);
  const history = useHistory();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(partiesActions.setPartySelected(undefined));
    dispatch(partiesActions.setPartySelectedProducts(undefined));
  }, []);

  useEffect(() => {
    setBtnDisable(!selectedParty);
  }, [selectedParty]);

  return (
    <Grid
      direction="column"
      container
      display="flex"
      justifyContent="center"
      spacing={2}
      my={'auto'}
    >
      <Grid item container mb={3} xs={12} textAlign="center">
        <Grid item xs={12} mb={1} display="flex" justifyContent="center">
          <Typography
            variant="h3"
            sx={{
              [theme.breakpoints.down('md')]: {
                maxWidth: '480px',
                width: '100%',
              },
            }}
          >
            {bodyTitle}
          </Typography>
        </Grid>
        <Grid item xs={12} display="flex" justifyContent="center">
          <Typography
            variant="body1"
            align="center"
            sx={{
              [theme.breakpoints.down('md')]: {
                maxWidth: '480px',
                width: '100%',
              },
            }}
          >
            {t('businessSelection.subTitle')}
          </Typography>
        </Grid>
      </Grid>

      <Grid item display="flex" justifyContent="center" xs={12}>
        <Paper
          elevation={8}
          sx={{
            maxWidth: '480px',
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: theme.spacing(2),
          }}
        >
          <Grid container item xs={12} sx={{ p: 2 }}>
            <PartySelectionSearch
              iconColor={'#17324D'}
              label={t('businessSelection.search')}
              parties={parties}
              selectedParty={selectedParty}
              onPartySelectionChange={(selectedParty: BaseParty | null) => {
                setSelectedParty(selectedParty);
              }}
            />
          </Grid>
        </Paper>
      </Grid>
      <Grid
        item
        container
        xs={12}
        display="flex"
        justifyContent="center"
        mt={4}
        sx={{ flexDirection: 'column', alignItems: 'center' }}
      >
        <Stack>
          <Button
            variant="contained"
            disabled={disableBtn}
            onClick={() => {
              trackEvent('DASHBOARD_BUSINESS_SELECTION', { party_id: selectedParty?.partyId });
              history.push(
                resolvePathVariables(ROUTES.PARTY_DASHBOARD.path, {
                  partyId: selectedParty?.partyId ?? '',
                })
              );
            }}
            sx={{ width: '100%', maxWidth: '480px' }}
          >
            {t('businessSelection.signIn')}
          </Button>
        </Stack>
        <Typography
          sx={{
            textAlign: 'center',
            marginTop: 6,
          }}
          variant="caption"
          color={theme.palette.text.primary}
        >
          <Trans i18nKey="businessSelection.onboardAnotherBusiness">
            {'Sei un Legale Rappresentante? '}
            <Link
              onClick={() => window.location.assign(ENV.URL_FE.ONBOARDING)}
              sx={{
                textDecoration: 'underline',
                cursor: 'pointer',
                color: theme.palette.primary.main,
              }}
            >
              {'Registra una nuova impresa'}
            </Link>
          </Trans>
        </Typography>
      </Grid>
    </Grid>
  );
}

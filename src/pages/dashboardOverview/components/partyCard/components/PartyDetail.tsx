import { Grid, Typography } from '@mui/material';
import { theme } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import { PartyPnpg } from '../../../../../model/PartyPnpg';

type Props = {
  party?: PartyPnpg;
};

export default function PartyDetail({ party }: Props) {
  const { t } = useTranslation();
  const infoStyles = {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  };

  return (
    <Grid container alignItems={'flex-start'} wrap="nowrap" marginLeft={2}>
      <Grid container item xs={6} alignItems={'flex-start'} spacing={1} pr={2}>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.typology')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.institutionType}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.category')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.fiscalCode}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.businessName')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.description}
          </Typography>
        </Grid>
      </Grid>
      <Grid container item xs={6} alignItems={'flex-start'} spacing={1} pr={2}>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.fiscalCode')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.fiscalCode}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.primaryPecEmail')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {'-'}
          </Typography>
        </Grid>
        <Grid item xs={4}>
          <Typography variant="body2">{t('overview.partyDetail.registeredOffice')}</Typography>
        </Grid>
        <Grid item xs={8}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.address ?? '-'}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

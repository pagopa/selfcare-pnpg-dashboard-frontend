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
      <Grid container item xs={10} alignItems={'flex-start'} spacing={1} pr={2}>
        <Grid item xs={6}>
          <Typography variant="body2">{t('overview.partyDetail.businessName')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.description}
          </Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography variant="body2">{t('overview.partyDetail.fiscalCode')}</Typography>
        </Grid>
        <Grid item xs={6}>
          <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
            {party?.fiscalCode}
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

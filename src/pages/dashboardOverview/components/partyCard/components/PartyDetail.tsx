import { Box, Grid, TextField, Typography } from '@mui/material';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { SessionModal } from '@pagopa/selfcare-common-frontend';
import { useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { PartyPnpg } from '../../../../../model/PartyPnpg';

type Props = {
  party?: PartyPnpg;
};

export default function PartyDetail({ party }: Props) {
  const { t } = useTranslation();

  const [openBusinessNameEditModal, setOpenBusinessNameEditModal] = useState<boolean>(false);

  const infoStyles = {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  };

  return (
    <>
      <Grid container alignItems={'flex-start'} wrap="nowrap" marginLeft={2}>
        <Grid container item xs={10} alignItems={'flex-start'} spacing={1} pr={2}>
          <Grid item xs={6}>
            <Typography variant="body2">{t('overview.partyDetail.businessName')}</Typography>
          </Grid>
          <Grid item xs={6} sx={{ display: 'flex', flexDirection: 'row' }}>
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
              {party?.description}
            </Typography>
            {party?.origin === 'ADE' && (
              <ButtonNaked
                component="button"
                onClick={() => setOpenBusinessNameEditModal(true)}
                startIcon={<EditIcon />}
                sx={{ color: 'primary.main', flexDirection: 'row', marginLeft: 2 }}
                weight="default"
              >
                {t('overview.partyDetail.editBusinessName')}
              </ButtonNaked>
            )}
          </Grid>
          <Grid item xs={6}>
            <Typography variant="body2">{t('overview.partyDetail.mailAddress')}</Typography>
          </Grid>
          <Grid item xs={6}>
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
              {party?.mailAddress}
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
      <SessionModal
        open={openBusinessNameEditModal}
        title={t('overview.partyDetail.editBusinessNameModal.title')}
        message={
          <>
            {t('overview.partyDetail.editBusinessNameModal.subTitle')}
            <TextField
              id="businessname-textfield"
              size="small"
              label={t('overview.partyDetail.editBusinessNameModal.textFieldLabel')}
              variant="outlined"
              onChange={() => {}}
              sx={{ width: '100%', marginY: 2 }}
            />
            <Box
              display="flex"
              alignItems="center"
              height="48px"
              sx={{
                borderRadius: theme.shape,
                borderLeft: '4px solid #6BCFFB',
                backgroundColor: 'background.paper',
                boxShadow: '0px 12px 40px rgba(0, 0, 0, 0.06)',
              }}
            >
              <InfoOutlined
                sx={{ width: '20px', height: '20spx', mx: 1, color: '#6BCFFB', marginX: 2 }}
              />
              <Typography variant="body2">
                {t('overview.partyDetail.editBusinessNameModal.disclaimer')}
              </Typography>
            </Box>
          </>
        }
        onCloseLabel={t('overview.partyDetail.editBusinessNameModal.cancel')}
        handleClose={() => setOpenBusinessNameEditModal(false)}
        onConfirmLabel={t('overview.partyDetail.editBusinessNameModal.confirm')}
        onConfirm={() => {}}
      />
    </>
  );
}

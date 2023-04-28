import { Box, Grid, TextField, Typography } from '@mui/material';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { SessionModal, useErrorDispatcher, useUserNotify } from '@pagopa/selfcare-common-frontend';
import { useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { PartyPnpg } from '../../../../../model/PartyPnpg';
import { updateBusinessName } from '../../../../../services/partyService';

type Props = {
  party?: PartyPnpg;
};

export default function PartyDetail({ party }: Props) {
  const { t } = useTranslation();

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();

  const [_loading, setLoading] = useState<boolean>(false);
  const [openBusinessNameEditModal, setOpenBusinessNameEditModal] = useState<boolean>(false);
  const [openBusinessEmailEditModal, setOpenBusinessEmailEditModal] = useState<boolean>(false);
  const [insertedBusinessName, setInsertedBusinessName] = useState<string>();

  const updateBusinessData = (institutionId: string, businessName: string) => {
    setLoading(true);
    updateBusinessName(institutionId, businessName)
      .then(() =>
        addNotify({
          component: 'Toast',
          id: 'UPDATE_BUSINESS_NAME',
          title: '',
          message: t('overview.partyDetail.editBusinessNameModal.success.description'),
        })
      )
      .catch((reason) =>
        addError({
          component: 'Toast',
          id: 'UPDATE_BUSINESS_NAME_ERROR',
          displayableDescription: t('overview.partyDetail.editBusinessNameModal.error.description'),
          error: reason,
          blocking: false,
          toNotify: true,
          techDescription: `An error occurred while changing the business name for the party with institutionId: ${institutionId}`,
        })
      )
      .finally(() => {
        setLoading(false);
        setOpenBusinessNameEditModal(false);
        setOpenBusinessEmailEditModal(false);
      });
  };

  const infoStyles = {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  };

  return (
    <>
      <Grid container alignItems={'flex-start'} wrap="nowrap" marginLeft={2}>
        <Grid container item xs={12} alignItems={'flex-start'} spacing={1} pr={2}>
          <Grid item xs={4}>
            <Typography variant="body2">{t('overview.partyDetail.businessName')}</Typography>
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex' }}>
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
              {party?.description}
            </Typography>
            {party?.origin === 'ADE' && (
              <ButtonNaked
                component="button"
                onClick={() => setOpenBusinessNameEditModal(true)}
                startIcon={<EditIcon />}
                sx={{ color: 'primary.main', marginLeft: 2 }}
                weight="default"
              >
                {t('overview.partyDetail.editBusinessName')}
              </ButtonNaked>
            )}
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{t('overview.partyDetail.mailAddress')}</Typography>
          </Grid>
          <Grid item xs={8} sx={{ display: 'flex' }}>
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }} className="ShowDots">
              {party?.mailAddress}
            </Typography>
            <ButtonNaked
              component="button"
              onClick={() => setOpenBusinessEmailEditModal(true)}
              startIcon={<EditIcon />}
              sx={{ color: 'primary.main', flexDirection: 'row', marginLeft: 2 }}
              weight="default"
            >
              {t('overview.partyDetail.editBusinessEmail')}
            </ButtonNaked>
          </Grid>
          <Grid item xs={4}>
            <Typography variant="body2">{t('overview.partyDetail.fiscalCode')}</Typography>
          </Grid>
          <Grid item xs={8}>
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important' }}>
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
              onChange={(e) => setInsertedBusinessName(e.target.value)}
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
        onConfirm={() =>
          party && insertedBusinessName
            ? updateBusinessData(party.partyId, insertedBusinessName)
            : undefined
        }
      />
      <SessionModal
        open={openBusinessEmailEditModal}
        title={t('overview.partyDetail.editBusinessEmailModal.title')}
        message={
          <>
            {t('overview.partyDetail.editBusinessEmailModal.subTitle')}
            <TextField
              id="email-textfield"
              size="small"
              label={t('overview.partyDetail.editBusinessEmailModal.textFieldLabel')}
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
                {t('overview.partyDetail.editBusinessEmailModal.disclaimer')}
              </Typography>
            </Box>
          </>
        }
        onCloseLabel={t('overview.partyDetail.editBusinessEmailModal.cancel')}
        handleClose={() => setOpenBusinessEmailEditModal(false)}
        onConfirmLabel={t('overview.partyDetail.editBusinessEmailModal.confirm')}
        onConfirm={() => {}}
      />
    </>
  );
}

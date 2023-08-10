import { Box, Grid, TextField, Typography } from '@mui/material';
import { ButtonNaked, theme } from '@pagopa/mui-italia';
import { useTranslation } from 'react-i18next';
import EditIcon from '@mui/icons-material/Edit';
import { SessionModal, useErrorDispatcher, useUserNotify } from '@pagopa/selfcare-common-frontend';
import { useState } from 'react';
import { InfoOutlined } from '@mui/icons-material';
import { Party } from '../../../../../model/Party';
import { updateBusinessData } from '../../../../../services/partyService';
import { partiesActions, partiesSelectors } from '../../../../../redux/slices/partiesSlice';
import { useAppDispatch, useAppSelector } from '../../../../../redux/hooks';

const emailRegexp = new RegExp('^[\\w-\\.]+@([\\w-]+\\.)+[\\w-]{2,5}$');

type Props = {
  party?: Party;
};

// eslint-disable-next-line complexity, sonarjs/cognitive-complexity
export default function PartyDetail({ party }: Props) {
  const { t } = useTranslation();

  const addError = useErrorDispatcher();
  const addNotify = useUserNotify();
  const dispatch = useAppDispatch();

  const setBusinessData = (businessData?: Party) =>
    dispatch(partiesActions.setPartySelected(businessData));
  const business = useAppSelector(partiesSelectors.selectPartySelected);

  const [_loading, setLoading] = useState<boolean>(false);
  const [openBusinessNameEditModal, setOpenBusinessNameEditModal] = useState<boolean>(false);
  const [openBusinessEmailEditModal, setOpenBusinessEmailEditModal] = useState<boolean>(false);
  const [insertedBusinessName, setInsertedBusinessName] = useState<string>();
  const [insertedBusinessEmail, setInsertedBusinessEmail] = useState<string>();

  const [isBusinessEmailEqualToSavedValue, setIsBusinessEmailEqualToSavedValue] =
    useState<boolean>(false);
  const [isBusinessNameEqualToSavedValue, setIsBusinessNameEqualToSavedValue] =
    useState<boolean>(false);

  const handleInputChange = (e: any, isBusinessEmail: boolean) => {
    const input = e.target.value;
    if (isBusinessEmail) {
      if (input === business?.mailAddress) {
        setIsBusinessEmailEqualToSavedValue(true);
      } else {
        setInsertedBusinessEmail(input);
        setIsBusinessEmailEqualToSavedValue(false);
      }
    } else {
      if (input === business?.description) {
        setIsBusinessNameEqualToSavedValue(true);
      } else {
        setInsertedBusinessName(input);
        setIsBusinessNameEqualToSavedValue(false);
      }
    }
  };

  // eslint-disable-next-line sonarjs/cognitive-complexity
  const updateBusiness = (institutionId: string, businessEmail?: string, businessName?: string) => {
    if (party) {
      setLoading(true);
      (businessEmail
        ? updateBusinessData(institutionId, businessEmail)
        : updateBusinessData(institutionId, undefined, businessName)
      )
        .then(() => {
          if (businessEmail) {
            setBusinessData({ ...party, mailAddress: businessEmail });
          } else {
            setBusinessData({ ...party, description: businessName });
          }
          addNotify({
            component: 'Toast',
            id: businessEmail ? 'UPDATE_BUSINESS_EMAIL' : 'UPDATE_BUSINESS_NAME',
            title: '',
            message: businessEmail
              ? t('overview.partyDetail.editBusinessEmailModal.success.description')
              : t('overview.partyDetail.editBusinessNameModal.success.description'),
          });
        })
        .catch((reason) =>
          addError({
            component: 'Toast',
            id: businessEmail ? 'UPDATE_BUSINESS_EMAIL_ERROR' : 'UPDATE_BUSINESS_NAME_ERROR',
            displayableDescription: businessEmail
              ? t('overview.partyDetail.editBusinessEmailModal.error.description')
              : t('overview.partyDetail.editBusinessNameModal.error.description'),
            error: reason,
            blocking: false,
            toNotify: true,
            techDescription: `An error occurred while changing the business data for the party with institutionId: ${institutionId}`,
          })
        )
        .finally(() => {
          setLoading(false);
          setOpenBusinessEmailEditModal(false);
          setOpenBusinessNameEditModal(false);
        });
    }
  };

  const infoStyles = {
    fontWeight: theme.typography.fontWeightMedium,
    fontSize: theme.typography.fontSize,
  };

  const notValidBusinessEmail = !!insertedBusinessEmail && !emailRegexp.test(insertedBusinessEmail);
  const notValidBusinessName = !!insertedBusinessName && insertedBusinessName.trim().length === 0;

  return (
    <>
      <Grid
        container
        item
        xs={12}
        pr={3}
        ml={2}
        sx={{
          alignItems: 'flex-start',
          flexDirection: 'row',
          [theme.breakpoints.down('md')]: {
            alignItems: 'column',
          },
        }}
      >
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              alignItems: 'start',
              flexDirection: 'column',
            },
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body2" width="max-content">
              {t('overview.partyDetail.businessName')}
            </Typography>
          </Grid>
          <Grid
            item
            xs={8}
            display={'flex'}
            sx={{
              [theme.breakpoints.down('md')]: {
                marginBottom: 3,
                display: 'grid',
              },
            }}
          >
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important', whiteSpace: 'pre-wrap' }}>
              {business?.description}
            </Typography>
            {party?.origin === 'ADE' && party.userRole === 'ADMIN' && (
              <ButtonNaked
                component="button"
                onClick={() => setOpenBusinessNameEditModal(true)}
                startIcon={<EditIcon />}
                sx={{
                  color: 'primary.main',
                  marginLeft: 2,
                  [theme.breakpoints.down('md')]: {
                    marginTop: '4px',
                    marginLeft: 0,
                    justifyContent: 'start',
                  },
                }}
                weight="default"
              >
                {t('overview.partyDetail.editBusinessName')}
              </ButtonNaked>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            marginTop: '4px',
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              alignItems: 'start',
              flexDirection: 'column',
            },
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body2">{t('overview.partyDetail.mailAddress')}</Typography>
          </Grid>
          <Grid
            item
            xs={8}
            display="flex"
            sx={{
              [theme.breakpoints.down('md')]: {
                marginBottom: 3,
                display: 'grid',
              },
            }}
          >
            <Typography sx={{ ...infoStyles, maxWidth: '100% !important', whiteSpace: 'pre-wrap' }}>
              {business?.mailAddress}
            </Typography>
            {party?.userRole === 'ADMIN' && (
              <ButtonNaked
                component="button"
                onClick={() => setOpenBusinessEmailEditModal(true)}
                startIcon={<EditIcon />}
                sx={{
                  color: 'primary.main',
                  marginLeft: 2,
                  [theme.breakpoints.down('md')]: {
                    marginTop: '4px',
                    marginLeft: 0,
                    justifyContent: 'start',
                  },
                }}
                weight="default"
              >
                {t('overview.partyDetail.editBusinessEmail')}
              </ButtonNaked>
            )}
          </Grid>
        </Grid>
        <Grid
          container
          sx={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'row',
            [theme.breakpoints.down('md')]: {
              alignItems: 'start',
              flexDirection: 'column',
            },
            marginTop: '4px',
          }}
        >
          <Grid item xs={4}>
            <Typography variant="body2" width="max-content">
              {t('overview.partyDetail.fiscalCode')}
            </Typography>
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
              error={notValidBusinessName || isBusinessNameEqualToSavedValue}
              helperText={
                notValidBusinessName
                  ? t('overview.partyDetail.editBusinessNameModal.invalidBusinessName')
                  : isBusinessNameEqualToSavedValue
                  ? t('overview.partyDetail.editBusinessNameModal.notEqualBusinessName')
                  : undefined
              }
              onChange={(e) => handleInputChange(e, false)}
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
        handleClose={() => {
          setOpenBusinessNameEditModal(false);
          setIsBusinessNameEqualToSavedValue(false);
          setInsertedBusinessName(undefined);
        }}
        onConfirmLabel={t('overview.partyDetail.editBusinessNameModal.confirm')}
        onConfirm={() =>
          party ? updateBusiness(party.partyId, undefined, insertedBusinessName) : undefined
        }
        onConfirmEnabled={
          !notValidBusinessName &&
          !!insertedBusinessName &&
          insertedBusinessName.length > 0 &&
          !isBusinessNameEqualToSavedValue
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
              error={notValidBusinessEmail || isBusinessEmailEqualToSavedValue}
              helperText={
                notValidBusinessEmail
                  ? t('overview.partyDetail.editBusinessEmailModal.invalidEmail')
                  : isBusinessEmailEqualToSavedValue
                  ? t('overview.partyDetail.editBusinessEmailModal.notEqualBusinessEmail')
                  : undefined
              }
              label={t('overview.partyDetail.editBusinessEmailModal.textFieldLabel')}
              variant="outlined"
              onChange={(e) => handleInputChange(e, true)}
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
        handleClose={() => {
          setOpenBusinessEmailEditModal(false);
          setIsBusinessEmailEqualToSavedValue(false);
          setInsertedBusinessEmail(undefined);
        }}
        onConfirmLabel={t('overview.partyDetail.editBusinessEmailModal.confirm')}
        onConfirm={() => (party ? updateBusiness(party.partyId, insertedBusinessEmail) : undefined)}
        onConfirmEnabled={
          !notValidBusinessEmail &&
          !!insertedBusinessEmail &&
          insertedBusinessEmail.length > 0 &&
          !isBusinessEmailEqualToSavedValue
        }
      />
    </>
  );
}

import EditIcon from '@mui/icons-material/Edit';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import UploadIcon from '@mui/icons-material/Upload';
import { IconButton, Stack, Tooltip, Typography } from '@mui/material';
import { Box } from '@mui/system';
import { ButtonNaked } from '@pagopa/mui-italia';
import { MouseEventHandler } from 'react';
import { Trans, useTranslation } from 'react-i18next';

type Props = {
  labelLink: string;
  open: MouseEventHandler<HTMLButtonElement> | undefined;
  loading: boolean;
  files: Array<File>;
};

export function PartyDescription({ labelLink, open, loading }: Readonly<Props>) {
  const { t } = useTranslation();

  const isLogoNotPresent = document.querySelector('#businessLogo')?.children[0].tagName === 'svg';

  return (
    <Stack>
      <Box display="flex">
        <ButtonNaked
          onClick={open}
          startIcon={
            !loading && isLogoNotPresent ? (
              <UploadIcon sx={{ fontSize: '23px !important' }} />
            ) : (
              <EditIcon />
            )
          }
          sx={{ color: 'primary.main', width: 'max-content' }}
          weight="default"
        >
          {labelLink}
        </ButtonNaked>
        {isLogoNotPresent && (
          <Tooltip
            title={
              <Trans i18nKey={t('overview.businessLogo.size')}>
                Dimensione esatta 300 x <br /> 300px - Formato .png
              </Trans>
            }
            placement="top"
            arrow={true}
          >
            <IconButton
              size="small"
              sx={{ color: 'text.secondary', ml: 1, bgcolor: 'transparent !important' }}
              role="tooltip"
            >
              <InfoOutlinedIcon fontSize="small" />
            </IconButton>
          </Tooltip>
        )}
      </Box>
      <Typography
        mt={1}
        sx={{
          fontSize: '12px',
          fontWeight: 'fontWeightRegular',
          color: 'text.secondary',
          whiteSpace: 'pre-wrap',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
        }}
      >
        {isLogoNotPresent ? (
          <Trans i18nKey="overview.businessLogo.info">
            Inserisci solo il logo della tua impresa
            <br />
            Sarai responsabile dell’inserimento di immagini diverse da quella indicata.
          </Trans>
        ) : (
          <Trans i18nKey={t('overview.businessLogo.size')}>
            Dimensione esatta 300 x <br /> 300px - Formato .png
          </Trans>
        )}
      </Typography>
    </Stack>
  );
}

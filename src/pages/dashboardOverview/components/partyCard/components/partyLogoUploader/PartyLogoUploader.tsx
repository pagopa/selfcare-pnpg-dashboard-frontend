/* eslint-disable functional/immutable-data */
import { Box, Grid } from '@mui/material';
import { DropEvent, FileRejection, useDropzone } from 'react-dropzone';
import { useState, useEffect } from 'react';
import useErrorDispatcher from '@pagopa/selfcare-common-frontend/lib/hooks/useErrorDispatcher';
import { trackEvent } from '@pagopa/selfcare-common-frontend/lib/services/analyticsService';
import { uniqueId } from 'lodash';
import { useTranslation } from 'react-i18next';
import { TFunction } from 'i18next';
import { DashboardApi } from '../../../../../../api/DashboardApi';
import { useAppDispatch, useAppSelector } from '../../../../../../redux/hooks';
import { partiesActions, partiesSelectors } from '../../../../../../redux/slices/partiesSlice';
import { PartyDescription } from './components/PartyDescription';
import PartyLogo from './components/PartyLogo';

type Props = {
  partyId: string;
};

const getLabelLinkText = (t: TFunction<'translation', undefined>) =>
  document.querySelector('#businessLogo')?.children[0].tagName === 'svg'
    ? t('overview.businessLogo.upload')
    : t('overview.businessLogo.modify');

export function PartyLogoUploader({ partyId }: Props) {
  const { t } = useTranslation();
  const [loading, setLoading] = useState(false);
  const urlLogo = useAppSelector(partiesSelectors.selectPartySelectedLogo);
  const dispatch = useAppDispatch();
  const setUrlLogo = (urlLogo?: string) =>
    dispatch(partiesActions.setPartySelectedPartyLogo(urlLogo));

  const [labelLink, setLabelLink] = useState<string>(getLabelLinkText(t));
  const addError = useErrorDispatcher();
  const [uploadedFiles, setUploadedFiles] = useState<Array<File>>([]);

  useEffect(() => {
    if (urlLogo && partyId) {
      setTimeout(() => setLabelLink(getLabelLinkText(t)), 600);
    }
  }, [urlLogo, partyId]);

  const maxAllowedPx = 300;
  const minAllowedPx = 120;

  const onFileRejected = (files: Array<FileRejection>) => {
    addError({
      id: 'WRONG_FILE_EXTENSION',
      blocking: false,
      error: new Error(),
      techDescription: `Wrong File Extension : ${files[0]}`,
      displayableTitle: t('overview.businessLogo.uploadError.title'),
      displayableDescription: t('overview.businessLogo.uploadError.description'),
      toNotify: false,
      onRetry: open,
    });
  };

  const { getRootProps, getInputProps, open } = useDropzone({
    onDropAccepted: (files: Array<File>) => {
      setLoading(true);
      setUploadedFiles(files);
      setLabelLink(files[0].name);
      const requestId = uniqueId();
      trackEvent('DASHBOARD_BUSINESS_CHANGE_LOGO', { party_id: partyId, request_id: requestId });

      DashboardApi.saveInstitutionLogo(partyId, files[0])
        .then(() => {
          setUrlLogo(urlLogo);
          setLoading(false);
          setLabelLink(t('overview.businessLogo.modify'));
          trackEvent('DASHBOARD_BUSINESS_CHANGE_LOGO_SUCCESS', {
            party_id: partyId,
            request_id: requestId,
          });
        })
        .catch((reason) => {
          trackEvent('DASHBOARD_BUSINESS_CHANGE_LOGO_FAILURE', {
            party_id: partyId,
            request_id: requestId,
          });
          setLoading(false);
          addError({
            id: 'FILE_UPLOAD_ERROR',
            blocking: false,
            error: reason,
            techDescription: 'An error occurred while uploading new logo',
            displayableTitle: t('overview.businessLogo.modifyError.title'),
            displayableDescription: t('overview.businessLogo.modifyError.description'),
            toNotify: false,
            onRetry: open,
          });
          setLabelLink(t('overview.businessLogo.upload'));
        });
    },
    onDropRejected: onFileRejected,
    // Disable click and keydown behavior
    noClick: true,
    noKeyboard: true,
    accept: 'image/png',
    getFilesFromEvent: (event: DropEvent): Promise<Array<File | DataTransferItem>> => {
      const files = (event.target as any).files || (event as any).dataTransfer.files;
      const file = files[0];
      if (!file) {
        return Promise.resolve([]);
      }
      return new Promise((resolve, reject) => {
        if (file.type !== 'image/png') {
          reject();
          return;
        }
        const reader = new FileReader();
        reader.onload = function (e) {
          const img = new Image();
          img.onload = function () {
            file.width = img.width;

            file.height = img.height;
            resolve([file]);
          };

          img.onerror = reject;

          img.src = e.target?.result as string;
        };
        reader.onerror = reject;
        reader.readAsDataURL(file);
      }).catch((_reason) => {
        onFileRejected(files);
        return [];
      }) as Promise<Array<File | DataTransferItem>>;
    },
    validator: (file) => {
      if (
        (file as any).height > maxAllowedPx ||
        (file as any).width > maxAllowedPx ||
        (file as any).height < minAllowedPx ||
        (file as any).height !== (file as any).width
      ) {
        return {
          code: 'height-width',
          message: `Image width and height must be equal with a value betwenn 300-400`,
        };
      }
      return null;
    },
  });

  return (
    <Grid container xs={6}>
      <Box
        {...getRootProps({ className: 'dropzone' })}
        display="flex"
        justifyItems={'center'}
        alignItems={'center'}
        data-testid="dropzone"
      >
        <>
          <Box>
            <input {...getInputProps()} />
            <PartyLogo loading={loading} urlLogo={urlLogo} />
          </Box>
          <Box>
            <PartyDescription
              labelLink={labelLink}
              open={open}
              loading={loading}
              files={uploadedFiles}
            />
          </Box>
        </>
      </Box>
    </Grid>
  );
}

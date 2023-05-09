import TitleBox from '@pagopa/selfcare-common-frontend/components/TitleBox';
import { useTranslation, Trans } from 'react-i18next';

type Props = {
  businessName?: string;
};

export default function WelcomeDashboard({ businessName }: Props) {
  const { t } = useTranslation();

  const title = t('overview.title');
  const subTitle = (
    <Trans i18nkey="overview.subTitle">
      Visualizza il riepilogo dei dati e leggi le notifiche di {{ businessName }}.
    </Trans>
  );

  return (
    <TitleBox
      title={title}
      subTitle={subTitle as unknown as string}
      mbTitle={2}
      mbSubTitle={5}
      variantTitle="h4"
      variantSubTitle="body1"
    />
  );
}

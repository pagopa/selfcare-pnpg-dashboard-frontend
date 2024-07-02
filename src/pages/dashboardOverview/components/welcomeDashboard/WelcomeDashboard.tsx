import TitleBox from '@pagopa/selfcare-common-frontend/lib/components/TitleBox';
import { useTranslation } from 'react-i18next';

type Props = {
  businessName?: string;
};

export default function WelcomeDashboard({ businessName }: Props) {
  const { t } = useTranslation();

  const title = t('overview.title');
  const subTitle = t('overview.subTitle', { businessName });

  return (
    <TitleBox
      title={title}
      subTitle={subTitle}
      mbTitle={2}
      mbSubTitle={5}
      variantTitle="h4"
      variantSubTitle="body1"
    />
  );
}

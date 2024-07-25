import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard-pnpg/GeographicTaxonomyResource';
import { InstitutionBaseResource } from '../api/generated/b4f-dashboard-pnpg/InstitutionBaseResource';
import { InstitutionResource } from '../api/generated/b4f-dashboard-pnpg/InstitutionResource';
import { ProductOnBoardingStatusEnum } from '../api/generated/b4f-dashboard-pnpg/OnboardedProductResource';
import { ENV } from '../utils/env';

export type UserRole = 'ADMIN' | 'LIMITED';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'TOBEVALIDATED';

export type GeographicTaxonomy = {
  code: string;
  desc: string;
};

type OnboardedProduct = {
  authorized?: boolean;
  billing?: {
      publicServices?: boolean;
      recipientCode?: string;
      vatNumber?: string;
  };
  productId?: string;
  productOnBoardingStatus?: ProductOnBoardingStatusEnum;
  userProductActions?: Array<string>;
  userRole?: string;
};

export type Party = {
  partyId: string;
  products: Array<OnboardedProduct>;
  externalId?: string;
  originId?: string;
  origin?: string;
  description: string;
  digitalAddress?: string;
  category?: string;
  urlLogo?: string;
  fiscalCode?: string;
  registeredOffice?: string;
  zipCode?: string;
  typology?: string;
  institutionType?: string;
  recipientCode?: string;
  geographicTaxonomies?: Array<GeographicTaxonomyResource>;
  vatNumberGroup?: boolean;
  supportEmail?: string;
  vatNumber?: string;
  subunitCode?: string;
  subunitType?: string;
  aooParentCode?: string;
  parentDescription?: string;
  userRole?: UserRole;
  status?: UserStatus;
};

export type BaseParty = {
  partyId: string;
  description?: string;
  status?: UserStatus;
  userRole?: UserRole;
  urlLogo?: string;
  parentDescription?: string;
};

const buildUrlLog = (partyId: string) =>
  `${ENV.URL_INSTITUTION_LOGO.PREFIX}${partyId}${ENV.URL_INSTITUTION_LOGO.SUFFIX}`;

export const institutionResource2Party = (institutionResource: InstitutionResource): Party => {
  const urlLogo = institutionResource.id && buildUrlLog(institutionResource.id);
  return {
    partyId: institutionResource.id ?? '',
    externalId: institutionResource.externalId ?? '',
    originId: institutionResource?.originId,
    origin: institutionResource?.origin,
    description: institutionResource.name ?? '',
    digitalAddress: institutionResource.mailAddress,
    category: institutionResource.category,
    urlLogo,
    fiscalCode: institutionResource.fiscalCode,
    registeredOffice: institutionResource.address ?? '',
    zipCode: institutionResource.zipCode ?? '',
    typology: 'TODO', // it will represent the taxonomy of the party
    institutionType: institutionResource.institutionType,
    recipientCode: institutionResource.recipientCode,
    geographicTaxonomies:
      institutionResource.geographicTaxonomies as Array<GeographicTaxonomyResource>,
    vatNumberGroup: institutionResource.vatNumberGroup,
    supportEmail: institutionResource.supportContact?.supportEmail,
    vatNumber: institutionResource.vatNumber,
    subunitCode: institutionResource.subunitCode,
    subunitType: institutionResource.subunitType,
    aooParentCode: institutionResource.aooParentCode,
    parentDescription: institutionResource.parentDescription,
    products: institutionResource.products as Array<OnboardedProduct>,
  };
};

export const institutionBaseResource2BaseParty = (
  institutionResource: InstitutionBaseResource
): BaseParty => {
  const urlLogo = institutionResource.id && buildUrlLog(institutionResource.id);
  return {
    partyId: institutionResource.id ?? '',
    description: institutionResource.name ?? '',
    status: institutionResource.status as UserStatus,
    userRole: institutionResource.userRole as UserRole,
    parentDescription: institutionResource.parentDescription,
    urlLogo,
  };
};

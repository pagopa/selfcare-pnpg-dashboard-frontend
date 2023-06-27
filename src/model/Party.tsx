import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard-pnpg/GeographicTaxonomyResource';
import { PnPGInstitutionResource } from '../api/generated/b4f-dashboard-pnpg/PnPGInstitutionResource';
import { ENV } from '../utils/env';

export type UserRole = 'ADMIN' | 'LIMITED';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'TOBEVALIDATED';

export type GeographicTaxonomy = {
  code: string;
  desc: string;
};

export type Business = { businessName: string; businessTaxId: string };

export type Institutions = {
  businesses: Array<Business>;
  legalTaxId: string;
  requestDateTime: string;
};

export type Party = {
  externalId: string;
  partyId: string;
  fiscalCode: string;
  status: string;
  description?: string;
  urlLogo?: string;
  address?: string;
  category?: string;
  geographicTaxonomies?: Array<GeographicTaxonomyResource>;
  institutionType?: string;
  mailAddress?: string;
  origin?: string;
  originId?: string;
  recipientCode?: string;
  userRole?: UserRole;
  zipCode?: string;
};

const buildUrlLogo = (partyId: string) =>
  `${ENV.URL_INSTITUTION_LOGO.PREFIX}${partyId}${ENV.URL_INSTITUTION_LOGO.SUFFIX}`;

export const institutionResource2Party = (institutionResource: PnPGInstitutionResource): Party => {
  const urlLogo = institutionResource.id && buildUrlLogo(institutionResource.id);
  return {
    address: institutionResource.address,
    externalId: institutionResource.externalId,
    fiscalCode: institutionResource.fiscalCode,
    partyId: institutionResource.id,
    description: institutionResource.name,
    status: institutionResource.status,
    urlLogo,
    category: institutionResource.category,
    geographicTaxonomies:
      institutionResource.geographicTaxonomies as Array<GeographicTaxonomyResource>,
    institutionType: institutionResource.institutionType,
    mailAddress: institutionResource.mailAddress,
    origin: institutionResource.origin,
    originId: institutionResource.originId,
    recipientCode: institutionResource.recipientCode,
    userRole: institutionResource.userRole as UserRole,
    zipCode: institutionResource.zipCode,
  };
};

import { PnPGInstitutionResource } from '../api/generated/b4f-dashboard-pnpg/PnPGInstitutionResource';
import { GeographicTaxonomyResource } from '../api/generated/b4f-dashboard-pnpg/GeographicTaxonomyResource';
import { ENV } from '../utils/env';

export type UserRole = 'ADMIN' | 'LIMITED';
export type PartyRole = 'DELEGATE' | 'MANAGER' | 'OPERATOR' | 'SUB_DELEGATE';
export type UserStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'TOBEVALIDATED';

export type GeographicTaxonomy = {
  code: string;
  desc: string;
};

export type BusinessPnpg = { businessName: string; businessTaxId: string };

export type InstitutionsPnpg = {
  businesses: Array<BusinessPnpg>;
  legalTaxId: string;
  requestDateTime: string;
};

export type PnpgInstitutionLegalAddressResource = {
  externalInstitutionId: string;
  address: string;
  zipCode: string;
};

export type PartyPnpg = {
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
  digitalAddress?: string;
  origin?: string;
  originId?: string;
  recipientCode?: string;
  userRole?: string;
  zipCode?: string;
};

const buildUrlLogo = (partyId: string) =>
  `${ENV.URL_INSTITUTION_LOGO.PREFIX}${partyId}${ENV.URL_INSTITUTION_LOGO.SUFFIX}`;

export const institutionPnPGResource2PartyPnpg = (
  institutionResourcePnpg: PnPGInstitutionResource
): PartyPnpg => {
  const urlLogo = institutionResourcePnpg.id && buildUrlLogo(institutionResourcePnpg.id);
  return {
    address: institutionResourcePnpg.address,
    externalId: institutionResourcePnpg.externalId,
    fiscalCode: institutionResourcePnpg.fiscalCode,
    partyId: institutionResourcePnpg.id,
    description: institutionResourcePnpg.name,
    status: institutionResourcePnpg.status,
    urlLogo,
    category: institutionResourcePnpg.category,
    geographicTaxonomies:
      institutionResourcePnpg.geographicTaxonomies as Array<GeographicTaxonomyResource>,
    institutionType: institutionResourcePnpg.institutionType,
    digitalAddress: institutionResourcePnpg.mailAddress,
    origin: institutionResourcePnpg.origin,
    originId: institutionResourcePnpg.originId,
    recipientCode: institutionResourcePnpg.recipientCode,
    userRole: institutionResourcePnpg.userRole,
    zipCode: institutionResourcePnpg.zipCode,
  };
};

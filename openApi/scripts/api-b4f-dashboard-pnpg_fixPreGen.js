const regexReplace = require('regex-replace');

regexReplace(
  /("format": *"uri",[\s]*"type": "string")/gi,
  '"$ref": "#/definitions/STRINGWrapper"',
  'openApi/generated-dashboard-pnpg/dashboard-pnpg-swagger20.json',
  { fileContentsOnly: true }
);

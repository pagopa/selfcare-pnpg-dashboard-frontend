import { PartyAccountItem } from '@pagopa/mui-italia';
import { Box, IconButton } from '@mui/material';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import { PartyPnpg } from '../../model/PartyPnpg';

type Props = {
  selectedParty: PartyPnpg | null;
  clearField: () => void;
};

export default function PartyAccountItemSelection({ selectedParty, clearField }: Props) {
  return (
    <Box display="flex" p={2}>
      <Box width="100%">
        <PartyAccountItem
          partyName={selectedParty ? selectedParty.description : ''}
          image={selectedParty?.urlLogo}
          maxCharactersNumberMultiLine={20}
          noWrap={false}
        />
      </Box>
      <Box display="flex" alignItems="center">
        <IconButton onClick={clearField} id="clearIcon" aria-label="removeSelectionIcon">
          <ClearOutlinedIcon />
        </IconButton>
      </Box>
    </Box>
  );
}

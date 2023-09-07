import React, { useState } from 'react';
import { Grid, Typography, Box, useTheme } from '@mui/material';
import { styled } from '@mui/material/styles';
import { BaseParty } from '../../model/Party';
import PartySelectionSearchInput from './PartySelectionSearchInput';
import PartyItemContainer from './PartyItemContainer';
import PartyAccountItemSelection from './PartyAccountItemSelection';

type Props = {
  parties: Array<BaseParty>;
  selectedParty: BaseParty | null;
  onPartySelectionChange: (selectedParty: BaseParty | null) => void;
  label?: string;
  iconColor?: string;
  iconMarginRight?: string;
  partyTitle?: string;
};

const verifyPartyFilter = (party: BaseParty, filter: string) =>
  party.description && party.description.toUpperCase().indexOf(filter.toUpperCase()) >= 0;
const CustomBox = styled(Box)({
  '&::-webkit-scrollbar': {
    width: 4,
  },
  '&::-webkit-scrollbar-track': {
    boxShadow: `inset 10px 10px  #E6E9F2`,
  },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: '#0073E6',
    borderRadius: '16px',
  },
  overflowY: 'auto',
  height: '100%',
});

export default function PartySelectionSearch({
  parties,
  selectedParty,
  onPartySelectionChange,
  label,
  iconColor,
  iconMarginRight,
  partyTitle,
}: Props) {
  const [input, setInput] = useState('');
  const [filteredParties, setFilteredParties] = useState<Array<BaseParty>>(parties);

  const theme = useTheme();

  const onFilterChange = (value: string) => {
    setInput(value);
    if (!value) {
      setFilteredParties(parties);
    } else {
      setFilteredParties(parties?.filter((e) => verifyPartyFilter(e, value)));
    }
    if (value && selectedParty && !verifyPartyFilter(selectedParty, value)) {
      onPartySelectionChange(null);
    }
  };

  const handleListItemClick = (
    _event: React.MouseEvent<HTMLDivElement, MouseEvent>,
    party: BaseParty
  ) => {
    onPartySelectionChange(party);
  };

  const moreThan3Parties = parties.length > 3;

  return (
    <React.Fragment>
      {parties.length >= 1 && (
        <Grid container item direction="column">
          {(partyTitle || moreThan3Parties) && !selectedParty && (
            <Grid item my={2}>
              {moreThan3Parties ? (
                <PartySelectionSearchInput
                  label={label}
                  iconMarginRight={iconMarginRight}
                  onChange={(e) => onFilterChange(e.target.value)}
                  input={input}
                  clearField={() => onFilterChange('')}
                  iconColor={iconColor}
                />
              ) : (
                parties.length >= 1 && (
                  <Typography
                    variant="body2"
                    sx={{ fontWeight: theme.typography.fontWeightBold, color: 'text.disabled' }}
                  >
                    {partyTitle}
                  </Typography>
                )
              )}
            </Grid>
          )}

          <Grid
            item
            sx={{
              overflow: 'auto',
              height: 'auto',
              maxHeight: moreThan3Parties ? '220px' : '270px',
            }}
          >
            {selectedParty && moreThan3Parties ? (
              <PartyAccountItemSelection
                selectedParty={selectedParty}
                clearField={() => onPartySelectionChange(null)}
              />
            ) : (
              <CustomBox sx={{ pointerEvents: parties.length !== 1 ? 'auto' : 'none' }}>
                {filteredParties &&
                  filteredParties.map((party) => (
                    <PartyItemContainer
                      moreThan3Parties={moreThan3Parties}
                      key={party.partyId}
                      selectedItem={parties.length !== 1 ? selectedParty === party : false}
                      title={party.description}
                      subTitle={''}
                      image={party.urlLogo}
                      action={(event: React.MouseEvent<HTMLDivElement, MouseEvent>) =>
                        handleListItemClick(event, party)
                      }
                    />
                  ))}
              </CustomBox>
            )}
          </Grid>
        </Grid>
      )}
    </React.Fragment>
  );
}

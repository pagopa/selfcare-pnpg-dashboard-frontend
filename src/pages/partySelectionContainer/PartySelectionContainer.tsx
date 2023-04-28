import { Grid } from '@mui/material';
import withParties from '../../decorators/withParties';
import { useAppSelector } from '../../redux/hooks';
import { partiesSelectors } from '../../redux/slices/partiesSlice';
import NoParty from './NoParty';
import PartySelection from './partySelection/PartySelection';

const PartySelectionContainer = () => {
  const parties = useAppSelector(partiesSelectors.selectPartiesList);

  return !parties ? (
    <></>
  ) : (
    <Grid item xs={12} py={11} display={'flex'}>
      {parties.filter((party) => party.status === 'ACTIVE').length >= 1 ? (
        <PartySelection parties={parties} />
      ) : (
        parties.length === 0 && <NoParty />
      )}
    </Grid>
  );
};

export default withParties(PartySelectionContainer);

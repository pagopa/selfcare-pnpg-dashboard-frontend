import { Card } from '@mui/material';
import { Party } from '../../../../model/Party';
import PartyDetail from './components/PartyDetail';

type Props = {
  party?: Party;
};

export default function PartyCard({ party }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        py: 3,
        px: 1,
        backgroundColor: '#EEEEEE',
        border: 'none',
      }}
    >
      <PartyDetail party={party} />
    </Card>
  );
}

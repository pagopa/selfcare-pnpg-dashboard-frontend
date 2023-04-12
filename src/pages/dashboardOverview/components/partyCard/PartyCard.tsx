import { Card } from '@mui/material';
import { PartyPnpg } from '../../../../model/PartyPnpg';
import PartyDetail from './components/PartyDetail';

type Props = {
  party?: PartyPnpg;
};

export default function PartyCard({ party }: Props) {
  return (
    <Card
      variant="outlined"
      sx={{
        width: '100%',
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

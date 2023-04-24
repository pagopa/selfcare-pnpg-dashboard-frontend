import React from 'react';
import { Grid } from '@mui/material';
import { PartyAccountItemButton } from '@pagopa/mui-italia/dist/components/PartyAccountItemButton';

type Props = {
  selectedItem?: boolean;
  title: string | undefined;
  subTitle: string | undefined;
  image: string | undefined;
  action?: React.Dispatch<React.MouseEvent<HTMLDivElement, MouseEvent>>;
  moreThan3Parties?: boolean;
};

export default function PartyItemContainer({
  selectedItem,
  title,
  subTitle,
  image,
  action,
  moreThan3Parties,
}: Props) {
  return (
    <Grid
      className={moreThan3Parties ? 'selectedMoreThen3' : 'selectedLessThen3'}
      container
      my={1}
      direction={'row'}
      role={'Institution'}
      data-testid={`PartyItemContainer: ${title}`}
      onKeyDownCapture={(e) => {
        if (action && (e.key === 'Enter' || e.key === ' ')) {
          action(e as any);
        }
      }}
    >
      <PartyAccountItemButton
        partyName={title as string}
        partyRole={subTitle as string}
        image={image}
        selectedItem={moreThan3Parties ? false : selectedItem}
        action={action}
        maxCharactersNumberMultiLine={20}
      />
    </Grid>
  );
}

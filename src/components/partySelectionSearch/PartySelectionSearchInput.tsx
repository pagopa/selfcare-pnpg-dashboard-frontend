import { Grid, TextField, IconButton, styled } from '@mui/material';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';
import ClearOutlinedIcon from '@mui/icons-material/ClearOutlined';
import InputAdornment from '@mui/material/InputAdornment';
import React, { ChangeEventHandler } from 'react';

const CustomTextField = styled(TextField)({
  label: { fontSize: '14px', fontWeight: 'fontWeightMedium', color: '#475A6D', paddingLeft: '8px' },
  input: { cursor: 'pointer' },
  '& .MuiOutlinedInput-root.MuiInputBase-adornedStart.MuiInputBase-adornedEnd': {
    height: '48px',
    paddingLeft: '16px',
  },
});
type Props = {
  onChange: ChangeEventHandler<HTMLInputElement>;
  input: string;
  clearField?: React.MouseEventHandler<HTMLButtonElement> | undefined;
  label?: string;
};

export default function PartySelectionSearchInput({ onChange, input, clearField, label }: Props) {
  const inputRef = React.useRef<HTMLInputElement>();

  const focusTextInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  return (
    <Grid item display="flex" justifyContent="center" xs={12}>
      <CustomTextField
        inputRef={inputRef}
        label={label}
        name="partySearchInput"
        sx={{ width: '100%' }}
        value={input}
        onChange={onChange}
        id="search"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              {
                <IconButton disableRipple={true} onClick={focusTextInput}>
                  <SearchOutlinedIcon />
                </IconButton>
              }
            </InputAdornment>
          ),
          endAdornment: (
            <IconButton
              disableRipple={true}
              onClick={clearField}
              aria-label="removeSelectionIcon"
              id="remove"
            >
              <ClearOutlinedIcon />
            </IconButton>
          ),
        }}
      />
    </Grid>
  );
}

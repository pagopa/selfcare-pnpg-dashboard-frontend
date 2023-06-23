import { Typography, Box, Grid, Card, useTheme, Tooltip, Fab } from '@mui/material';
import ArrowForward from '@mui/icons-material/ArrowForward';

type Props = {
  cardTitle: React.ReactNode;
  urlLogo: string;
  btnAction?: () => void;
};

export default function DigitalNotificationCard({ cardTitle, urlLogo, btnAction }: Props) {
  const theme = useTheme();

  return (
    <Card
      raised
      sx={{
        borderRadius: theme.spacing(2),
      }}
    >
      <Grid container p={2} pb={2}>
        <Grid item xs={12} display="flex" alignItems="flex-start">
          <Box display="flex" flexDirection="column" justifyContent="center" mr={2}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                width: '64px',
                height: '64px',
                padding: 1,
                backgroundColor: '#0B3EE3',
                boxSizing: 'border-box',
                borderRadius: theme.spacing(1),
              }}
            >
              <img
                src={urlLogo}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  objectPosition: 'center',
                }}
              />
            </Box>
          </Box>
          <Box display="flex" flexDirection="row" justifyContent="center">
            {cardTitle && (
              <Grid sx={{ width: 'fit-content' }} display="flex" alignItems={'center'} mt={1}>
                <Tooltip title={cardTitle} placement="top" arrow={true}>
                  <Typography
                    variant="h6"
                    sx={{
                      fontSize: '24px',
                      fontWeight: '600',
                      height: '100%',
                      width: '100%',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      display: '-webkit-box',
                      WebkitBoxOrient: 'vertical' as const,
                      WebkitLineClamp: 2,
                      marginTop: 2,
                    }}
                  >
                    {cardTitle}
                  </Typography>
                </Tooltip>
              </Grid>
            )}
          </Box>
          <Grid item sx={{ paddingTop: 4 }}>
            <Fab
              sx={{ alignSelf: 'end', marginLeft: 2 }}
              size="small"
              color="primary"
              onClick={btnAction}
            >
              <ArrowForward />
            </Fab>
          </Grid>
        </Grid>
      </Grid>
    </Card>
  );
}

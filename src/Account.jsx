import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';


export function Account() {

    return (
        <Grid2 container spacing={2}>
            <Grid2 xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Your Bookings
                </Typography>
                <List >
                    <ListItem>
                        <ListItemText
                            primary="First Booking"
                            secondary="Date: 12.01.2023"
                        />
                    </ListItem>
                </List>
            </Grid2>
            <Grid2 xs={12} md={6}>
                <Typography sx={{ mt: 4, mb: 2 }} variant="h6" component="div">
                    Personal Information
                </Typography>
                <List >
                    <ListItem>
                        <ListItemText
                            primary="Single-line item"
                        />
                    </ListItem>
                </List>
            </Grid2>
        </Grid2>
    )
}
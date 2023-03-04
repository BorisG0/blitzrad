import Grid2 from '@mui/material/Unstable_Grid2'; // Grid version 2
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import ListItemText from '@mui/material/ListItemText';
import { styled } from '@mui/material/styles';
import TextField from '@mui/material/TextField';
import firebase from 'firebase/compat/app';
import { useAuthState } from 'react-firebase-hooks/auth';


const auth = firebase.auth();

export function Account() {
    const [user] = useAuthState(auth);

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
                    <ListItem >
                        <TextField
                            disabled
                            id="filled-disabled"
                            label="Name"
                            defaultValue={user.displayName}
                            variant="filled"
                        />
                    </ListItem>
                    <ListItem >
                        <TextField
                            id="adress"
                            label="Adress"
                            defaultValue="Hello World"
                            variant="filled"
                        />
                    </ListItem>
                </List>
            </Grid2>
        </Grid2>
    )
}
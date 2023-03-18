import { Autocomplete } from '@mui/material';
import { TextField } from '@mui/material';

export function RegionSelection() {
    return (
            <Autocomplete
                disablePortal
                id="combo-box-demo"
                options={['Mannheim', 'Berlin', 'München']}
                sx={{ width: 300 }}
                renderInput={(params) => <TextField {...params} label="Region" />}
            />
    )
}
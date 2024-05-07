import React, { useState } from 'react'
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Select from 'react-select';
import Grid from '@mui/material/Grid';

const options = [
    { value: 'chocolate', label: 'Chocolate' },
    { value: 'strawberry', label: 'Strawberry' },
    { value: 'vanilla', label: 'Vanilla' },
];

const JobSection = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '', height: '100vh' }} >
                    <Grid container spacing={2}>
                        <Grid item xs={3}>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <Select
                                defaultValue={selectedOption}
                                onChange={setSelectedOption}
                                options={options}
                            />
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </React.Fragment>
    )
}

export default JobSection

import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AnimatedMulti from './reusable/Select';
import BasicCard from './BasicCard';

const JobSection = () => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const myHeaders = new Headers();
                myHeaders.append("Content-Type", "application/json");
                const body = JSON.stringify({
                    "limit": 100,
                    "offset": 0
                });

                const requestOptions = {
                    method: "POST",
                    headers: myHeaders,
                    body
                };

                const response = await fetch("https://api.weekday.technology/adhoc/getSampleJdJSON", requestOptions);
                if (!response.ok) {
                    throw new Error('Failed to fetch data');
                }
                const data = await response.json();
                setApiData(data);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    const renderAnimatedMulti = () => {
        return Array.from({ length: 6 }, (_, i) => (
            <Grid item xs={2} key={i}>
                <AnimatedMulti />
            </Grid>
        ));
    };

    return (
        <React.Fragment>
            <CssBaseline />
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '', height: '100vh', marginBottom: '1rem' }} >
                    {/* <Grid container spacing={2}>
                        {renderAnimatedMulti()}
                    </Grid> */}
                    {loading ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography>Error: {error}</Typography>
                    ) : (
                        <BasicCard data={apiData} />
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default JobSection;

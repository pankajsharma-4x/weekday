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
    const [page, setPage] = useState(1);

    useEffect(() => {
        fetchData();
    }, [page]);

    const fetchData = async () => {
        try {
            setLoading(true);
            const myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            const body = JSON.stringify({
                "limit": 10,
                "offset": (page - 1) * 10
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
            setApiData((prevData) => {
                if (prevData && Array.isArray(prevData)) {
                    return [...prevData, ...data];
                } else {
                    return data;
                }
            });
            
            

        } catch (error) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    const handleScroll = () => {
        if (
            window.innerHeight + document.documentElement.scrollTop !==
                document.documentElement.offsetHeight ||
            loading
        )
            return;
        setPage((prevPage) => prevPage + 1);
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [loading]);

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
                    {loading && !apiData ? (
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

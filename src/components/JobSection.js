import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AnimatedMulti from './reusable/Select';
import BasicCard from './BasicCard';
import ResponsiveAppBar from './ResponsiveAppBar';

const roles = [
    { value: 'frontend', label: 'Frontend' },
    { value: 'backend', label: 'Backend' },
    { value: 'fullStack', label: 'FullStack' },
    { value: 'ios', label: 'IOS ' },
    { value: 'flutter', label: 'Flutter' },
    { value: 'reactNative', label: 'ReactNative' },
    { value: 'android', label: 'Android' },
    { value: 'techlead', label: 'Tech lead' },
    { value: 'devops', label: 'Dev Ops' },
    { value: 'dataengineer', label: 'Data Engineer ' },
];

const noofemployee = [
    { value: '1-10', label: '1-10' },
    { value: '11-20', label: '11-20' },
    { value: '21-50', label: '21-50' },
    { value: '51-100', label: '51-100 ' },
    { value: '101-200', label: '101-200' },
    { value: '201-500', label: '201-500' },
    { value: '500+', label: '500+' },
];


const JobSection = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState([]);
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

    const handleChangeRoles = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setSelectedValues(values);
        console.log(values);
    };

    const handleChangeEmployeeCount = (selectedOptions) => {
        const values = selectedOptions.map(option => option.value);
        setSelectedEmp(values);
        console.log(values);
    };
    
    const renderAnimatedMulti = () => {
        return (
            // <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            //     <AnimatedMulti roles={roles} onChange={handleChange} />
            // </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <AnimatedMulti label={"Job Roles"} options={roles} onChange={handleChangeRoles} />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                <AnimatedMulti label={"Number of Employees"} options={noofemployee} onChange={handleChangeEmployeeCount} />
            </Grid>
        </Grid>
        );
    };

    console.log("selectedValues",selectedValues)
    console.log("selectedEmp",selectedEmp)

    return (
        <React.Fragment>
            <CssBaseline />
            <ResponsiveAppBar />
            <Container maxWidth="xl">
                <Box sx={{ bgcolor: '', height: '100vh', marginBottom: '1rem' }}>
                    <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                        {renderAnimatedMulti()}
                    </Grid>
                    {loading && !apiData ? (
                        <Typography>Loading...</Typography>
                    ) : error ? (
                        <Typography>Error: {error}</Typography>
                    ) : (
                        <BasicCard data={apiData} selectedValues={selectedValues} selectedEmp= {selectedEmp} />
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default JobSection;

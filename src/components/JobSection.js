import React, { useState, useEffect } from 'react';
import CssBaseline from '@mui/material/CssBaseline';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import AnimatedMulti from './reusable/Select';
import BasicCard from './BasicCard';
import ResponsiveAppBar from './ResponsiveAppBar';
import { TextField } from '@mui/material';

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

const minexp = [
    { value: '1', label: '1' },
    { value: '2', label: '2' },
    { value: '3', label: '3' },
    { value: '4', label: '4' },
    { value: '5', label: '5' },
    { value: '6', label: '6' },
    { value: '7', label: '7' },
    { value: '8', label: '8' },
    { value: '9', label: '9' },
    { value: '10', label: '10' },
];


const JobSection = () => {
    const [selectedValues, setSelectedValues] = useState([]);
    const [selectedEmp, setSelectedEmp] = useState();
    const [apiData, setApiData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [page, setPage] = useState(1);
    const [compName,setCompName] =  useState('')
    const [loc, setLoc] = useState('')

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

    const handleminExpCount = (selectedOption) => {
        setSelectedEmp(selectedOption ? selectedOption.value : null);
    };

    const handleCompanyName = (event) => {
        setCompName(event.target.value)
    }

    const handleLocation = (event) => {
        setLoc(event.target.value)
    }


    const renderAnimatedMulti = () => {
        return (
            // <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
            //     <AnimatedMulti roles={roles} onChange={handleChange} />
            // </Grid>
            <Grid container spacing={2} sx={{ marginBottom: '1rem' }}>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <AnimatedMulti isMulti={true} label={"Job Roles"} options={roles} onChange={handleChangeRoles} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <AnimatedMulti isClearable={true} isMulti={false} label={"Min experience"} options={minexp} onChange={handleminExpCount} />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <TextField
                        label="Company name"
                        id="outlined-size-small"
                        //   defaultValue=""
                        size="small"
                        onChange={handleCompanyName}
                    />
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} xl={2}>
                    <TextField
                        label="Location"
                        id="outlined-size-small"
                        //   defaultValue=""
                        size="small"
                        onChange={handleLocation}
                    />
                </Grid>
            </Grid>
        );
    };

    console.log("selectedValues", selectedValues)
    console.log("selectedEmp>>>>>>>>", selectedEmp)

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
                        <BasicCard 
                           data={apiData} 
                           selectedValues={selectedValues} 
                           selectedEmp={selectedEmp} 
                           compName = {compName}
                           loc = {loc}
                           />
                    )}
                </Box>
            </Container>
        </React.Fragment>
    );
};

export default JobSection;

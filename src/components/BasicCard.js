import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActions, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';

export default function BasicCard({ data, selectedValues }) {
  const navigate = useNavigate();

  if (!data || !data.jdList || data.jdList.length === 0) {
    return null;
  }

  const handleViewJobDescription = (jobDescription) => {
    navigate('/home');
  };

  let filteredData = data.jdList;

  if (selectedValues && selectedValues.length > 0) {
    filteredData = data.jdList.filter(item => {
      // Check if the job role matches any of the selected values
      return selectedValues.includes(item.jobRole.toLowerCase());
    });
  }

  console.log("data>>>>>>>>" ,data)

  return (
    <Grid container spacing={2}>
      {filteredData.map((item) => (
        <Grid item key={item.jdUid} xs={12} sm={6} md={4} lg={4}>
          <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  <img src={item.logoUrl} alt="Company Logo" width={40} height={40} />
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h5" component="div">
                {item.companyName}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Job Role: {item.jobRole}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Location: {item.location}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Job Description: {item.jobDetailsFromCompany.split(' ').slice(0, 50).join(' ')}...
                <Button onClick={() => handleViewJobDescription(item.jobDetailsFromCompany)}>
                  View Job Description
                </Button>
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Salary: {item.minJdSalary ? `${item.minJdSalary} - ${item.maxJdSalary} ${item.salaryCurrencyCode}` : 'Not specified'}
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Max Experience: {item.maxExp} years
              </Typography>
            </CardContent>
            <CardActions >
              <Button sx={{width:"100%" , background:"rgb(85, 239, 196)", color:"black" , fontWeight:"500"}} size="small">Easy Apply</Button>
            </CardActions>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

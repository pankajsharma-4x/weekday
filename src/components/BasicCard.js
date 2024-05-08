import React, { useRef, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActions, CardHeader } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import './cards.css'; // Import CSS file for styling

export default function BasicCard({ data, selectedValues, selectedEmp, compName, loc, tecStack, onLoadMore }) {
  const navigate = useNavigate();
  const observer = useRef();

  const lastJobRef = useCallback(node => {
    if (observer.current) observer.current.disconnect();
    observer.current = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && onLoadMore) {
        onLoadMore();
      }
    });
    if (node) observer.current.observe(node);
  }, [onLoadMore]);

  if (!data || !data.jdList || data.jdList.length === 0) {
    return null;
  }

  const handleViewJobDescription = (jobDescription) => {
    navigate('/home');
  };

  let filteredData = data.jdList;

  if (selectedValues && selectedValues.length > 0) {
    filteredData = filteredData.filter(item => {
      // Check if the job role matches any of the selected values
      return selectedValues.includes(item.jobRole.toLowerCase());
    });
  }

  if (tecStack) {
    filteredData = filteredData.filter(item => {
      // Check if the base pay matches the selected value
      return item.basePay === tecStack;
    });
  }

  if (selectedEmp) {
    filteredData = filteredData.filter(item => {
      // Check if the minimum experience meets the selected value
      return item.minExp >= selectedEmp;
    });
  }

  if (compName) {
    filteredData = filteredData.filter(item => {
      // Check if the company name contains the user input (case insensitive)
      return item.companyName.toLowerCase().includes(compName.toLowerCase());
    });
  }

  if (tecStack) {
    filteredData = filteredData.filter(item => {
      // Check if the company name contains the user input (case insensitive)
      return item.minJdSalary.toLowerCase().includes(tecStack.toLowerCase());
    });
  }

  if (loc) {
    filteredData = filteredData.filter(item => {
      // Check if the location contains the user input (case insensitive)
      return item.location.toLowerCase().includes(loc.toLowerCase());
    });
  }

  console.log("data>>>>>>>>", data)

  return (
    <Grid container spacing={2} className="card-container"> {/* Add class for container */}
      {filteredData.map((item, index) => {
        if (filteredData.length === index + 1) {
          return (
            <Grid item key={item.jdUid} ref={lastJobRef} xs={12} sm={6} md={4} lg={4}>
              {/* Render last job with ref */}
              <JobCard item={item} handleViewJobDescription={handleViewJobDescription} />
            </Grid>
          );
        } else {
          return (
            <Grid item key={item.jdUid} xs={12} sm={6} md={4} lg={4}>
              <JobCard item={item} handleViewJobDescription={handleViewJobDescription} />
            </Grid>
          );
        }
      })}
    </Grid>
  );
}

function JobCard({ item, handleViewJobDescription }) {
  return (
    <Card className="custom-card"> {/* Add class for card */}
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
          Job Role: {item.jobRole.charAt(0).toUpperCase() + item.jobRole.slice(1)}
        </Typography>

        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Location: {item.location.replace(/\b(\w+)\b/, (match, word) => word.charAt(0).toUpperCase() + word.slice(1))}
        </Typography>


        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Job Description: {item.jobDetailsFromCompany.split(' ').slice(0, 50).join(' ')}...
          <Button sx={{textTransform:"capitalize"}} onClick={() => handleViewJobDescription(item.jobDetailsFromCompany)}>
            View Job Description
          </Button>
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Salary: {item.minJdSalary ? `${item.minJdSalary} - ${item.maxJdSalary} ${item.salaryCurrencyCode}` : 'Not specified'}
        </Typography>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Min Experience: {item.minExp} years
        </Typography>
      </CardContent>
      <CardActions >
        <Button sx={{ width: "100%", background: "rgb(85, 239, 196)", color: "black", fontWeight: "500",textTransform:"capitalize" }} size="small">Easy Apply</Button>
      </CardActions>
    </Card>
  );
}

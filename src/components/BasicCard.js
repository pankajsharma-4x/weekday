import * as React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import "./cards.css"
import { Avatar, CardHeader } from '@mui/material';

export default function BasicCard({ data }) {
  console.log(data)
  if (!data || !data.jdList || data.jdList.length === 0) {
    return null;
  }

  return (
    <Grid container spacing={2}>
      {data.jdList.map((item, index) => (
        <Grid item key={item.jdUid} xs={12} sm={6} md={4} lg={4}>
          <Card className='card_main'>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  <img src={item.logoUrl} width={40} height={40}/>
                </Avatar>
              }
  
              title="Shrimp and Chorizo Paella"
             
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
                Max Experience: {item.maxExp} years
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Salary: {item.minJdSalary ? `${item.minJdSalary} - ${item.maxJdSalary} ${item.salaryCurrencyCode}` : 'Not specified'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
}

import React from 'react';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Avatar, Button, CardActions, CardHeader } from '@mui/material';

const JobDesc = () => {
  return (
    <div>
        <Card>
            <CardHeader
              avatar={
                <Avatar aria-label="recipe">
                  {/* <img src={item.logoUrl} alt="Company Logo" width={40} height={40} /> */}
                </Avatar>
              }
            />
            <CardContent>
              <Typography variant="h5" component="div">
               
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Job Role: 
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Location: 
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Job Description: 
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Salary: 
              </Typography>
              <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
                Max Experience:
              </Typography>
            </CardContent>
            <CardActions >
              <Button sx={{width:"100%" , background:"rgb(85, 239, 196)", color:"black" , fontWeight:"500"}} size="small">Easy Apply</Button>
            </CardActions>
          </Card>
    </div>
  )
}

export default JobDesc

import React, { useState } from 'react';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Grid,
  Stepper,
  Step,
  StepLabel,
  CircularProgress
} from '@mui/material';

const steps = [
  'Application Submitted',
  'Document Verification',
  'Interview Scheduled',
  'Interview Completed',
  'Final Decision'
];

const AdmissionStatus = () => {
  const [email, setEmail] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await axios.get(`http://localhost:3001/api/admission/status/${email}`);
      setStatus(response.data);
    } catch (err) {
      setError(err.response?.data?.message || 'Error fetching application status');
      setStatus(null);
    } finally {
      setLoading(false);
    }
  };

  const getStepNumber = (statusName) => {
    switch (statusName) {
      case 'Pending':
        return 0;
      case 'Document Verification':
        return 1;
      case 'Interview Scheduled':
        return 2;
      case 'Interview Completed':
        return 3;
      case 'Approved':
      case 'Rejected':
      case 'Waitlisted':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Check Admission Status
        </Typography>

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2} alignItems="center">
            <Grid item xs={12} sm={8}>
              <TextField
                required
                fullWidth
                label="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                disabled={loading}
              >
                {loading ? <CircularProgress size={24} /> : 'Check Status'}
              </Button>
            </Grid>
          </Grid>
        </form>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }}>
            {error}
          </Alert>
        )}

        {status && (
          <Box sx={{ mt: 4 }}>
            <Stepper activeStep={getStepNumber(status.status_name)} alternativeLabel>
              {steps.map((label) => (
                <Step key={label}>
                  <StepLabel>{label}</StepLabel>
                </Step>
              ))}
            </Stepper>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Application Details
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Name</Typography>
                  <Typography>{status.applicant_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Email</Typography>
                  <Typography>{status.applicant_email}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Program</Typography>
                  <Typography>{status.program_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Department</Typography>
                  <Typography>{status.department_name}</Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Application Date</Typography>
                  <Typography>
                    {new Date(status.application_date).toLocaleDateString()}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Status</Typography>
                  <Typography color="primary" fontWeight="bold">
                    {status.status_name}
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="subtitle2">Documents Status</Typography>
                  <Typography>
                    {status.verified_documents} of {status.documents_count} verified
                  </Typography>
                </Grid>
                {status.remarks && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">Remarks</Typography>
                    <Typography>{status.remarks}</Typography>
                  </Grid>
                )}
              </Grid>
            </Box>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default AdmissionStatus;

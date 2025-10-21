import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Box,
  Stepper,
  Step,
  StepLabel,
  Alert,
} from '@mui/material';

const steps = ['Personal Information', 'Academic Details', 'Document Upload'];

const AdmissionForm = () => {
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [programs, setPrograms] = useState([]);
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const [formData, setFormData] = useState({
    applicant_name: '',
    applicant_email: '',
    applicant_phone: '',
    date_of_birth: '',
    gender: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    program_id: '',
    department_id: '',
    previous_school: '',
    previous_percentage: '',
    documents: []
  });

  useEffect(() => {
    // Set dummy data for programs
    setPrograms([
      { program_id: '1', program_name: 'Computer Engineering', department_name: 'Engineering', seats_available: 100, applications_count: 0, department_id: '1' },
      { program_id: '2', program_name: 'Information Technology', department_name: 'Engineering', seats_available: 100, applications_count: 0, department_id: '1' },
      { program_id: '3', program_name: 'Electronics & Computer Engineering', department_name: 'Engineering', seats_available: 100, applications_count: 0, department_id: '1' },
      { program_id: '4', program_name: 'Mechanical & Automation Engineering', department_name: 'Engineering', seats_available: 100, applications_count: 0, department_id: '1' }
    ]);

    // Fetch required documents
    const fetchDocuments = async () => {
      try {
        const documentsRes = await axios.get('http://localhost:3001/api/required-documents');
        setRequiredDocuments(documentsRes.data);
      } catch (err) {
        setError('Error fetching documents. Please try again.');
      }
    };
    fetchDocuments();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileChange = (e, documentId) => {
    const file = e.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: [
          ...prev.documents.filter(doc => doc.document_id !== documentId),
          { document_id: documentId, file }
        ]
      }));
    }
  };

  const handleNext = () => {
    setActiveStep(prev => prev + 1);
  };

  const handleBack = () => {
    setActiveStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.city) {
      setError('City is required.');
      return;
    }

    setSuccess('Application submitted successfully!');
    setTimeout(() => {
      navigate('/login');
    }, 2000);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return(
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Full Name"
                name="applicant_name"
                value={formData.applicant_name}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Email"
                name="applicant_email"
                type="email"
                value={formData.applicant_email}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Phone"
                name="applicant_phone"
                value={formData.applicant_phone}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                required
                fullWidth
                label="Date of Birth"
                name="date_of_birth"
                type="date"
                value={formData.date_of_birth}
                onChange={handleInputChange}
                InputLabelProps={{ shrink: true }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl fullWidth required>
                <InputLabel>Gender</InputLabel>
                <Select
                  name="gender"
                  value={formData.gender}
                  onChange={handleInputChange}
                  label="Gender"
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Address"
                name="address"
                multiline
                rows={3}
                value={formData.address}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="City"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="State"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField
                required
                fullWidth
                label="Pincode"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required>
                <InputLabel>Program</InputLabel>
                <Select
                  name="program_id"
                  value={formData.program_id}
                  onChange={(e) => {
                    const program = programs.find(p => p.program_id === e.target.value);
                    setFormData(prev => ({
                      ...prev,
                      program_id: e.target.value,
                      department_id: program?.department_id || ''
                    }));
                  }}
                  label="Program"
                >
                  {programs.map(program => (
                    <MenuItem key={program.program_id} value={program.program_id}>
                      {program.program_name} - {program.department_name} ({program.seats_available - program.applications_count} seats available)
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Previous School/College"
                name="previous_school"
                value={formData.previous_school}
                onChange={handleInputChange}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Previous Percentage"
                name="previous_percentage"
                type="number"
                inputProps={{ min: 0, max: 100, step: 0.01 }}
                value={formData.previous_percentage}
                onChange={handleInputChange}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {requiredDocuments.map(doc => (
              <Grid item xs={12} key={doc.document_id}>
                <Box display="flex" alignItems="center" gap={2}>
                  <Typography flex={1}>
                    {doc.document_name} {doc.is_mandatory && '*'}
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                  >
                    {formData.documents.find(d => d.document_id === doc.document_id)
                      ? 'Change File'
                      : 'Upload File'
                    }
                    <input
                      type="file"
                      hidden
                      onChange={(e) => handleFileChange(e, doc.document_id)}
                      accept=".pdf,.jpg,.jpeg,.png"
                    />
                  </Button>
                  {formData.documents.find(d => d.document_id === doc.document_id)?.file.name && (
                    <Typography variant="body2" color="textSecondary">
                      {formData.documents.find(d => d.document_id === doc.document_id).file.name}
                    </Typography>
                  )}
                </Box>
              </Grid>
            ))}
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom align="center">
          Admission Application
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {success && (
          <Alert severity="success" sx={{ mb: 2 }}>
            {success}
          </Alert>
        )}

        <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
          {steps.map(label => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>

        <form onSubmit={handleSubmit}>
          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep > 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep < steps.length - 1 ? (
              <Button variant="contained" onClick={handleNext}>
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
              >
                Submit Application
              </Button>
            )}
          </Box>
        </form>
      </Paper>
    </Container>
  );
};

export default AdmissionForm;

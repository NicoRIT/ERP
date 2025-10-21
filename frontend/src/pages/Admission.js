import React, { useState, useEffect } from 'react';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Reusable Form Field Component
const FormField = ({ label, name, type = "text", as = "input", options, ...props }) => (
  <div className="form-group mb-3">
    <label htmlFor={name}>{label}</label>
    {as === "select" ? (
      <Field as="select" id={name} name={name} className="form-control" {...props}>
        <option value="">Select {label}</option>
        {options?.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Field>
    ) : (
      <Field type={type} id={name} name={name} className="form-control" {...props} />
    )}
    <ErrorMessage name={name} component="div" className="text-danger small" />
  </div>
);

const StudentAdmissionForm = () => {
  const navigate = useNavigate();
  const [requiredDocuments, setRequiredDocuments] = useState([]);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const programOptions = [
    { value: 'Computer Engineering', label: 'Computer Engineering' },
    { value: 'Information Technology', label: 'Information Technology' },
    { value: 'Electronics & Computer Engineering', label: 'Electronics & Computer Engineering' },
    { value: 'Mechanical & Automation Engineering', label: 'Mechanical & Automation Engineering' },
  ];

  useEffect(() => {
    // Fetch required documents
    const fetchData = async () => {
      try {
        const documentsRes = await axios.get('http://localhost:3001/api/required-documents');
        setRequiredDocuments(documentsRes.data);
      } catch (err) {
        setError('Error fetching data. Please try again.');
      }
    };
    fetchData();
  }, []);

  const initialValues = {
    student_name: '',
    birth_date: '',
    birth_place: '',
    gender: '',
    permanent_address: '',
    mailing_address: '',
    city: '',
    pin: '',
    mobile_no: '',
    state: '',
    nationality: 'Indian',
    blood_group: '',
    category: '',
    caste: '',
    religion: '',
    birth_identification_mark: '',
    aadhar_number: '',
    student_email: '',
    ssc_board: '',
    ssc_school_name: '',
    ssc_marks_total: '',
    ssc_marks_obtained: '',
    ssc_result_percentage: '',
    x_passing_year: '',
    hssc_board: '',
    hssc_school_name: '',
    hssc_marks_total: '',
    hssc_marks_obtained: '',
    hssc_result_percentage: '',
    xii_passing_year: '',
    xii_phy: '',
    xii_maths: '',
    xii_chem_bio_cs: '',
    xii_pcm_bio_cs: '',
    xii_percentage: '',
    jee_roll_no: '',
    jee_phy_marks: '',
    jee_maths_marks: '',
    jee_total_pm_marks: '',
    jee_chem_marks: '',
    nta_score_total: '',
    crl_rank: '',
    gen_ews_rank: '',
    obc_ncl_rank: '',
    sc_rank: '',
    st_rank: '',
    pwd_rank: '',
    father_name: '',
    father_occupation: '',
    father_office_address: '',
    father_office_phone_no: '',
    father_annual_income: '',
    father_residence_address: '',
    mother_name: '',
    mother_occupation: '',
    mother_office_address: '',
    mother_office_phone_no: '',
    mother_annual_income: '',
    mother_residence_address: '',
    guardian_name: '',
    guardian_occupation: '',
    guardian_office_address: '',
    guardian_office_phone_no: '',
    guardian_annual_income: '',
    guardian_residence_address: '',
    program_id: '',
    documents: []
  };

  const validationSchema = Yup.object({
    student_name: Yup.string().required('Full Name is required'),
    birth_date: Yup.date().required('Date of Birth is required'),
    gender: Yup.string().required('Gender is required'),
    student_email: Yup.string().email('Invalid email address').required('Email is required'),
    mobile_no: Yup.string()
      .matches(/^[0-9]{10}$/, 'Mobile number must be 10 digits')
      .required('Mobile number is required'),
    aadhar_number: Yup.string()
      .matches(/^[0-9]{12}$/, 'Aadhar number must be 12 digits')
      .required('Aadhar number is required'),
    program_id: Yup.string().required('Program selection is required'),
    ssc_marks_total: Yup.number().min(0, 'Invalid total marks').required('Total marks are required'),
    ssc_marks_obtained: Yup.number()
      .min(0, 'Invalid marks obtained')
      .max(Yup.ref('ssc_marks_total'), 'Marks obtained cannot exceed total marks')
      .required('Marks obtained are required'),
    hssc_marks_total: Yup.number().min(0, 'Invalid total marks').required('Total marks are required'),
    hssc_marks_obtained: Yup.number()
      .min(0, 'Invalid marks obtained')
      .max(Yup.ref('hssc_marks_total'), 'Marks obtained cannot exceed total marks')
      .required('Marks obtained are required')
  });

  const handleFileChange = (setFieldValue, documentId, event) => {
    const file = event.target.files[0];
    if (file) {
      setFieldValue('documents', [
        ...initialValues.documents.filter(doc => doc.document_id !== documentId),
        { document_id: documentId, file }
      ]);
    }
  };

  const onSubmit = async (values, { setSubmitting }) => {
    try {
      setError('');
      setSuccess('');

      // Submit application
      const applicationRes = await axios.post('http://localhost:3001/api/admission/apply', values);

      // Upload documents
      if (values.documents.length > 0) {
        const formData = new FormData();
        formData.append('application_id', applicationRes.data.application_id);
        
        values.documents.forEach(doc => {
          formData.append('documents', doc.file);
        });

        await axios.post('http://localhost:3001/api/admission/upload-documents', formData, {
          headers: { 'Content-Type': 'multipart/form-data' }
        });
      }

      setSuccess('Admission form filled successfully!');
      setTimeout(() => {
        navigate('/login');
      }, 3000);
    } catch (err) {
      setError(err.response?.data?.message || 'Error submitting application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <Container className="py-4">
      <h1 className="text-center mb-4">Student Admission Form</h1>
      {error && <div className="alert alert-danger">{error}</div>}
      {success && <div className="alert alert-success">{success}</div>}
      
      <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={onSubmit}>
        {({ setFieldValue }) => (
          <Form>
            {/* Program Selection */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">Program Selection</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={12}>
                    <FormField
                      label="Program"
                      name="program_id"
                      as="select"
                      options={programOptions}
                    />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Personal Information */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">Personal Information</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <FormField label="Full Name" name="student_name" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Date of Birth" name="birth_date" type="date" />
                  </Col>
                  <Col md={3}>
                    <FormField
                      label="Gender"
                      name="gender"
                      as="select"
                      options={[
                        { value: 'M', label: 'Male' },
                        { value: 'F', label: 'Female' },
                        { value: 'O', label: 'Other' }
                      ]}
                    />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Email" name="student_email" type="email" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Mobile Number" name="mobile_no" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Place of Birth" name="birth_place" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Aadhar Number" name="aadhar_number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Permanent Address" name="permanent_address" as="textarea" />
                  </Col>
                  <Col md={6}>
                    <FormField label="Mailing Address" name="mailing_address" as="textarea" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="City" name="city" />
                  </Col>
                  <Col md={4}>
                    <FormField label="State" name="state" />
                  </Col>
                  <Col md={4}>
                    <FormField label="PIN Code" name="pin" />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormField label="Blood Group" name="blood_group" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Category" name="category" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Religion" name="religion" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Caste" name="caste" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Academic Performance */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">Academic Performance</Card.Header>
              <Card.Body>
                <h5 className="mb-3">SSC Details</h5>
                <Row>
                  <Col md={4}>
                    <FormField label="SSC Board" name="ssc_board" />
                  </Col>
                  <Col md={4}>
                    <FormField label="SSC School Name" name="ssc_school_name" />
                  </Col>
                  <Col md={2}>
                    <FormField label="Total Marks" name="ssc_marks_total" type="number" />
                  </Col>
                  <Col md={2}>
                    <FormField label="Marks Obtained" name="ssc_marks_obtained" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="Percentage" name="ssc_result_percentage" type="number" step="0.01" />
                  </Col>
                  <Col md={4}>
                    <FormField label="Passing Year" name="x_passing_year" type="number" />
                  </Col>
                </Row>

                <h5 className="mb-3 mt-4">HSC Details</h5>
                <Row>
                  <Col md={4}>
                    <FormField label="HSC Board" name="hssc_board" />
                  </Col>
                  <Col md={4}>
                    <FormField label="HSC School Name" name="hssc_school_name" />
                  </Col>
                  <Col md={2}>
                    <FormField label="Total Marks" name="hssc_marks_total" type="number" />
                  </Col>
                  <Col md={2}>
                    <FormField label="Marks Obtained" name="hssc_marks_obtained" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="Percentage" name="hssc_result_percentage" type="number" step="0.01" />
                  </Col>
                  <Col md={4}>
                    <FormField label="Passing Year" name="xii_passing_year" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={3}>
                    <FormField label="Physics Marks" name="xii_phy" type="number" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Mathematics Marks" name="xii_maths" type="number" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Chemistry/Biology/CS Marks" name="xii_chem_bio_cs" type="number" />
                  </Col>
                  <Col md={3}>
                    <FormField label="PCM/PCB/CS Total" name="xii_pcm_bio_cs" type="number" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* JEE Details */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">JEE Details</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={4}>
                    <FormField label="JEE Roll Number" name="jee_roll_no" />
                  </Col>
                  <Col md={4}>
                    <FormField label="JEE Physics Marks" name="jee_phy_marks" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="JEE Mathematics Marks" name="jee_maths_marks" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="JEE Total PM Marks" name="jee_total_pm_marks" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="JEE Chemistry Marks" name="jee_chem_marks" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="NTA Score Total" name="nta_score_total" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="CRL Rank" name="crl_rank" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="GEN EWS Rank" name="gen_ews_rank" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="OBC NCL Rank" name="obc_ncl_rank" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={4}>
                    <FormField label="SC Rank" name="sc_rank" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="ST Rank" name="st_rank" type="number" />
                  </Col>
                  <Col md={4}>
                    <FormField label="PWD Rank" name="pwd_rank" type="number" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Parent Information */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">Parent Information</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <FormField label="Father's Name" name="father_name" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Father's Occupation" name="father_occupation" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Father's Annual Income" name="father_annual_income" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Father's Office Address" name="father_office_address" as="textarea" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Father's Office Phone Number" name="father_office_phone_no" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Father's Residence Address" name="father_residence_address" as="textarea" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Mother's Name" name="mother_name" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Mother's Occupation" name="mother_occupation" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Mother's Annual Income" name="mother_annual_income" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Mother's Office Address" name="mother_office_address" as="textarea" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Mother's Office Phone Number" name="mother_office_phone_no" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Mother's Residence Address" name="mother_residence_address" as="textarea" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Guardian's Name" name="guardian_name" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Guardian's Occupation" name="guardian_occupation" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Guardian's Annual Income" name="guardian_annual_income" type="number" />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <FormField label="Guardian's Office Address" name="guardian_office_address" as="textarea" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Guardian's Office Phone Number" name="guardian_office_phone_no" />
                  </Col>
                  <Col md={3}>
                    <FormField label="Guardian's Residence Address" name="guardian_residence_address" as="textarea" />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            {/* Document Upload */}
            <Card className="mb-4">
              <Card.Header className="bg-primary text-white">Required Documents</Card.Header>
              <Card.Body>
                <Row>
                  <Col md={6}>
                    <label>Photograph on the form</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'photograph', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Statement of the marks/ Certificate of passing HSSC / Diploma (all semesters) / Degree (all years)</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'marks_certificate', e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>JEE (Main) - 2024 NTA Score Sheet</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'jee_score_sheet', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Statement of marks of SSC</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'ssc_marks', e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>Residence Certificate</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'residence_certificate', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Certificate of Date of Birth</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'dob_certificate', e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>School/ Institute/ College Leaving Certificate</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'leaving_certificate', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Diploma / Degree Certificate from the Institute / Board/ University (if applicable)</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'diploma_degree_certificate', e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>Copy of Aadhar Card</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'aadhar_card', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Income Certificate</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'income_certificate', e)} />
                  </Col>
                </Row>
                <Row>
                  <Col md={6}>
                    <label>Provisional Eligibility Certificate from Goa University (if applicable)</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'eligibility_certificate', e)} />
                  </Col>
                  <Col md={6}>
                    <label>Migration Certificate (if applicable)</label>
                    <input type="file" className="form-control" onChange={(e) => handleFileChange(setFieldValue, 'migration_certificate', e)} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>

            <div className="text-center">
              <Button type="submit" variant="primary" size="lg">
                Submit Application
              </Button>
            </div>
          </Form>
        )}
      </Formik>
    </Container>
  );
};

export default StudentAdmissionForm;

const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json({ limit: '10kb' }));

// Demo records only. Never use real patient information.
const patients = [
  {
    id: 1,
    name: 'Demo Patient',
    age: 35,
    condition: 'General Checkup'
  }
];

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({
    status: 'healthy',
    application: 'Healthcare DevSecOps API'
  });
});

// Get all demo patients
app.get('/api/patients', (req, res) => {
  res.status(200).json(patients);
});

// Add a patient with input validation
app.post('/api/patients', (req, res) => {
  const { name, age, condition } = req.body;

  if (
    typeof name !== 'string' ||
    name.trim().length < 2 ||
    name.trim().length > 50
  ) {
    return res.status(400).json({
      error: 'Name must contain between 2 and 50 characters'
    });
  }

  if (!Number.isInteger(age) || age < 0 || age > 120) {
    return res.status(400).json({
      error: 'Age must be an integer between 0 and 120'
    });
  }

  if (
    typeof condition !== 'string' ||
    condition.trim().length < 2 ||
    condition.trim().length > 100
  ) {
    return res.status(400).json({
      error: 'Condition must contain between 2 and 100 characters'
    });
  }

  const patient = {
    id: patients.length + 1,
    name: name.trim(),
    age,
    condition: condition.trim()
  };

  patients.push(patient);

  return res.status(201).json({
    message: 'Demo patient added successfully',
    patient
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Healthcare API running on port ${PORT}`);
});

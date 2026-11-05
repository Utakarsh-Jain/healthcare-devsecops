const test = require('node:test');
const assert = require('node:assert');

const BASE_URL = 'http://localhost:3000';

test('Health endpoint returns healthy status', async () => {
  const response = await fetch(`${BASE_URL}/health`);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.strictEqual(data.status, 'healthy');
});

test('Patient endpoint returns patient records', async () => {
  const response = await fetch(`${BASE_URL}/api/patients`);
  const data = await response.json();

  assert.strictEqual(response.status, 200);
  assert.ok(Array.isArray(data));
});

test('Invalid patient age is rejected', async () => {
  const response = await fetch(`${BASE_URL}/api/patients`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Test Patient',
      age: 150,
      condition: 'Routine Checkup'
    })
  });

  const data = await response.json();

  assert.strictEqual(response.status, 400);
  assert.match(data.error, /Age must be an integer/);
});

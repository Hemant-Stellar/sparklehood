const request = require('supertest');
const app = require('../../app');
const Incident = require('../../models/Incident'); 

// Sample test incident
const testIncident = {
  title: 'Test Incident',
  description: 'This is a test incident',
  severity: 'Medium'
};

// Track created incident ID - declare outside test scope
let incidentId;

// Clean up test data
beforeAll(async () => {
  await Incident.deleteMany({ title: 'Test Incident' });
});

afterAll(async () => {
  await Incident.deleteMany({ title: 'Test Incident' });
});

describe('Incident API', () => {
  // Use test.each to run tests in sequence
  test.each([
    // Step 1: Create incident
    async () => {
      const res = await request(app)
        .post('/incidents')
        .send(testIncident);
      
      expect(res.status).toBe(201);
      expect(res.body.success).toBe(true);
      expect(res.body.data.title).toBe(testIncident.title);
      
      // Save ID for later tests - this will persist
      incidentId = res.body.data._id;
      console.log('Created incident with ID:', incidentId);
    },
    
    // Step 2: Get all incidents
    async () => {
      const res = await request(app)
        .get('/incidents');
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(Array.isArray(res.body.data)).toBe(true);
    },
    
    // Step 3: Get specific incident
    async () => {
      console.log('Getting incident with ID:', incidentId);
      const res = await request(app)
        .get(`/incidents/${incidentId}`);
      
      expect(res.status).toBe(200);
      expect(res.body.success).toBe(true);
      expect(res.body.data._id).toBe(incidentId);
    },
    
    // Step 4: Delete incident
    async () => {
      console.log('Deleting incident with ID:', incidentId);
      const res = await request(app)
        .delete(`/incidents/${incidentId}`);
      
      expect(res.status).toBe(204);
      
      // Verify it's gone
      const checkRes = await request(app)
        .get(`/incidents/${incidentId}`);
      expect(checkRes.status).toBe(404);
    }
  ])('Step %#', async (testFn) => {
    await testFn();
  });
});
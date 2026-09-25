const request = require('supertest');
const express = require('express');
const leadRoutes = require('../routes/leadRoutes');

const app = express();
app.use(express.json());
app.use('/api/leads', leadRoutes);

// Mock the Lead model
jest.mock('../models/Lead', () => {
  return {
    find: jest.fn().mockReturnThis(),
    sort: jest.fn().mockResolvedValue([{ name: 'Test Lead', email: 'test@test.com', phone: '1234567890', status: 'New' }]),
    create: jest.fn().mockResolvedValue({ name: 'New Lead', email: 'new@test.com', phone: '0987654321', status: 'New' }),
    findOne: jest.fn().mockResolvedValue(null),
    findByIdAndUpdate: jest.fn().mockResolvedValue({ name: 'Test Lead', status: 'Contacted' })
  };
});

describe('Lead API Endpoints', () => {
  it('GET /api/leads should return all leads', async () => {
    const res = await request(app).get('/api/leads');
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBeTruthy();
    expect(res.body.length).toBe(1);
    expect(res.body[0].name).toBe('Test Lead');
  });

  it('POST /api/leads should create a new lead', async () => {
    const res = await request(app)
      .post('/api/leads')
      .send({
        name: 'New Lead',
        email: 'new@test.com',
        phone: '0987654321'
      });
    expect(res.statusCode).toEqual(201);
    expect(res.body.name).toBe('New Lead');
  });

  it('PATCH /api/leads/:id/status should update status', async () => {
    const res = await request(app)
      .patch('/api/leads/648a12345678901234567890/status')
      .send({ status: 'Contacted' });
    expect(res.statusCode).toEqual(200);
    expect(res.body.status).toBe('Contacted');
  });
});

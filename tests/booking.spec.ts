import { test, expect } from '@playwright/test'

const BASE_URL = 'https://restful-booker.herokuapp.com'

const newBooking = {
  firstname: 'John',
  lastname: 'Doe',
  totalprice: 150,
  depositpaid: true,
  bookingdates: {
    checkin: '2026-06-01',
    checkout: '2026-06-07'
  },
  additionalneeds: 'Breakfast'
}

test.describe('Booking API Tests', () => {

  test('health check returns 201', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/ping`)
    expect(response.status()).toBe(201)
  })

  test('get all bookings returns array', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking`)
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(Array.isArray(body)).toBeTruthy()
    expect(body.length).toBeGreaterThan(0)
  })

  test('get single booking returns correct structure', async ({ request }) => {
    const response = await request.get(`${BASE_URL}/booking/1`)
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('firstname')
    expect(body).toHaveProperty('lastname')
    expect(body).toHaveProperty('totalprice')
    expect(body).toHaveProperty('depositpaid')
    expect(body).toHaveProperty('bookingdates')
  })

  test('create booking returns new booking id', async ({ request }) => {
    const response = await request.post(`${BASE_URL}/booking`, {
      data: newBooking
    })
    expect(response.status()).toBe(200)
    const body = await response.json()
    expect(body).toHaveProperty('bookingid')
    expect(body.booking.firstname).toBe('John')
    expect(body.booking.lastname).toBe('Doe')
  })

  test('delete booking returns 201', async ({ request }) => {
    const createResponse = await request.post(`${BASE_URL}/booking`, {
      data: newBooking
    })
    const createBody = await createResponse.json()
    const bookingId = createBody.bookingid

    const tokenResponse = await request.post(`${BASE_URL}/auth`, {
      data: { username: 'admin', password: 'password123' }
    })
    const tokenBody = await tokenResponse.json()
    const token = tokenBody.token

    const deleteResponse = await request.delete(`${BASE_URL}/booking/${bookingId}`, {
      headers: { Cookie: `token=${token}` }
    })
    expect(deleteResponse.status()).toBe(201)
  })

})
const test = require('node:test');
const assert = require('node:assert/strict');
const http = require('node:http');
const app = require('../src/app');

let server;
let baseUrl;

test.before(async () => {
  server = http.createServer(app);
  await new Promise((resolve) => server.listen(0, '127.0.0.1', resolve));
  baseUrl = `http://127.0.0.1:${server.address().port}`;
});

test.after(async () => {
  await new Promise((resolve, reject) => server.close((error) => error ? reject(error) : resolve()));
});

async function getJson(path) {
  const response = await fetch(`${baseUrl}${path}`);
  return { response, body: await response.json() };
}

test('GET /about returns Ingrid profile as JSON', async () => {
  const { response, body } = await getJson('/about');
  assert.equal(response.status, 200);
  assert.equal(body.data.name, 'Kepmegni Ingrid');
  assert.equal(body.data.institution, 'Yaounde International Business School');
  assert.ok(Array.isArray(body.data.experience));
});

test('GET /skills returns a list of skills', async () => {
  const { response, body } = await getJson('/skills');
  assert.equal(response.status, 200);
  assert.ok(Array.isArray(body.data));
  assert.ok(body.data.length > 0);
});

test('GET /skills/:id returns one skill and validates IDs', async () => {
  const found = await getJson('/skills/1');
  assert.equal(found.response.status, 200);
  assert.equal(found.body.data.id, 1);

  const invalid = await getJson('/skills/abc');
  assert.equal(invalid.response.status, 400);

  const missing = await getJson('/skills/9999');
  assert.equal(missing.response.status, 404);
});

test('POST /contact accepts valid JSON and rejects invalid data', async () => {
  const valid = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: 'Test User', email: 'test@example.com', message: 'Hello Ingrid' })
  });
  assert.equal(valid.status, 201);
  assert.equal((await valid.json()).data.name, 'Test User');

  const invalid = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name: '', email: 'not-an-email', message: '' })
  });
  assert.equal(invalid.status, 400);
  assert.equal((await invalid.json()).error.status, 400);
});

test('GET /search?q= returns matching data and validates missing query', async () => {
  const found = await getJson('/search?q=python');
  assert.equal(found.response.status, 200);
  assert.ok(found.body.data.skills.some((skill) => skill.name === 'Python'));

  const internship = await getJson('/search?q=softek');
  assert.equal(internship.response.status, 200);
  assert.ok(internship.body.data.profile);

  const missing = await getJson('/search');
  assert.equal(missing.response.status, 400);
});

test('Unknown routes return JSON 404 errors', async () => {
  const { response, body } = await getJson('/nothing-here');
  assert.equal(response.status, 404);
  assert.equal(body.error.status, 404);
});

test('Malformed JSON returns a JSON 400 error', async () => {
  const response = await fetch(`${baseUrl}/contact`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: '{broken json'
  });
  const body = await response.json();
  assert.equal(response.status, 400);
  assert.equal(body.error.status, 400);
});

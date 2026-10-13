const http = require('http');

const PORT = process.env.PORT || 5000;
const BASE_URL = `http://localhost:${PORT}`;

const request = (path, method = 'GET', body = null, token = null) => {
  return new Promise((resolve, reject) => {
    const url = new URL(path, BASE_URL);
    const headers = { 'Content-Type': 'application/json' };
    if (token) headers['Authorization'] = `Bearer ${token}`;

    const req = http.request(url, { method, headers }, (res) => {
      let data = '';
      res.on('data', (chunk) => (data += chunk));
      res.on('end', () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ status: res.statusCode, data: parsed });
        } catch (e) {
          resolve({ status: res.statusCode, raw: data });
        }
      });
    });

    req.on('error', (err) => reject(err));
    if (body) req.write(JSON.stringify(body));
    req.end();
  });
};

const runTests = async () => {
  console.log('🧪 Starting API Verification Tests...');
  let passed = 0;
  let failed = 0;

  const assert = (condition, name) => {
    if (condition) {
      console.log(`  ✅ PASS: ${name}`);
      passed++;
    } else {
      console.error(`  ❌ FAIL: ${name}`);
      failed++;
    }
  };

  try {
    // 1. Health check
    const health = await request('/api/health');
    assert(health.status === 200 && health.data.status === 'online', 'Health Check Online');

    // 2. Demo user login
    const loginRes = await request('/api/auth/login', 'POST', {
      email: 'demo@example.com',
      password: 'password123',
    });
    assert(loginRes.status === 200 && loginRes.data.token, 'Demo User Login Successful');
    const token = loginRes.data.token;

    // 3. Auth Me
    const meRes = await request('/api/auth/me', 'GET', null, token);
    assert(meRes.status === 200 && meRes.data.user.email === 'demo@example.com', 'Get Current User Profile');

    // 4. Fetch Templates
    const templatesRes = await request('/api/templates');
    assert(templatesRes.status === 200 && templatesRes.data.templates.length >= 6, `Fetched ${templatesRes.data?.templates?.length} Pre-Seeded Templates`);
    const sampleTemplate = templatesRes.data.templates[0];

    // 5. Create Site from Template
    const createSiteRes = await request('/api/sites', 'POST', {
      templateId: sampleTemplate._id,
      siteName: 'Automated Test SaaS Landing',
      slug: `auto-test-${Date.now()}`,
      status: 'draft',
    }, token);
    assert(createSiteRes.status === 201 && createSiteRes.data.site._id, 'Create User Site Instance from Template');
    const createdSite = createSiteRes.data.site;

    // 6. Update Customizations & Publish
    const updateRes = await request(`/api/sites/${createdSite._id}`, 'PUT', {
      siteName: 'Updated Automated SaaS Landing',
      customizations: {
        ...createdSite.customizations,
        hero: {
          ...createdSite.customizations?.hero,
          title: 'Dynamically Generated Cloud Platform',
        },
      },
      status: 'published',
    }, token);
    assert(updateRes.status === 200 && updateRes.data.site.status === 'published', 'Update Site Customizations and Set Status to Published');

    // 7. Get Public Site Viewer Data
    const publicRes = await request(`/api/sites/public/${createdSite.slug}`);
    assert(publicRes.status === 200 && publicRes.data.site.siteName === 'Updated Automated SaaS Landing', 'Public Site Viewer Endpoint by Slug');

    // 8. Duplicate Site
    const dupRes = await request(`/api/sites/${createdSite._id}/duplicate`, 'POST', null, token);
    assert(dupRes.status === 201 && dupRes.data.site.siteName.includes('(Copy)'), 'Duplicate User Site');

    // 9. Clean up duplicated and created sites
    await request(`/api/sites/${dupRes.data.site._id}`, 'DELETE', null, token);
    const deleteRes = await request(`/api/sites/${createdSite._id}`, 'DELETE', null, token);
    assert(deleteRes.status === 200, 'Delete Site');

    console.log(`\n🎉 Verification Summary: ${passed} passed, ${failed} failed.`);
    process.exit(failed === 0 ? 0 : 1);
  } catch (err) {
    console.error('Test execution error:', err);
    process.exit(1);
  }
};

runTests();

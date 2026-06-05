Registration API

Install dependencies and run the server:

```powershell
cd server
npm install

# set allowed email and access code for restricted registrations (optional)
$env:ALLOWED_EMAIL = 'you@example.com'
$env:ALLOWED_ACCESS_CODE = 'my-secret-code'

# start server
npm start
```

POST /api/register

- body: JSON `{ "email": "alkareemshaik027@gmail.com", "name": "Shaik abdul Kareem", "mobileNo": "9494839831", "githubusername": "abdulkareem027", "accessCode": "QQdEYy" }`
- response: `201` with created user (accessCode omitted) and `token` obtained from the auth service.
- If `ALLOWED_EMAIL` is set, only that email will be accepted. If `ALLOWED_ACCESS_CODE` is set, accessCode must match.
- If `AUTH_URL` is set, the auth request will be sent there instead of the default URL.

Default server port: `4000` (set `PORT` env to change)

After registration the response includes `token`. Pass it with protected test server requests:

```powershell
curl -H "Authorization: Bearer <token>" http://4.224.186.213/evaluation-service/your-api
```

Example curl (replace values):

```powershell
curl -X POST http://localhost:4000/api/register -H "Content-Type: application/json" -d '{"email":"you@example.com","name":"John","mobileNo":"1234567890","githubusername":"jdoe","accessCode":"my-secret-code"}'
```

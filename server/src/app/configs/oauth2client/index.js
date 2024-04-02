
const { OAuth2Client } = require('google-auth-library') 
require("dotenv").config();

// Khởi tạo OAuth2Client với Client ID và Client Secret 
const myOAuth2Client = new OAuth2Client(
    process.env.GOOGLE_MAILER_CLIENT_ID,
    process.env.GOOGLE_MAILER_CLIENT_SECRET
)
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({
    refresh_token: process.env.GOOGLE_MAILER_REFRESH_TOKEN
})

module.exports = myOAuth2Client;
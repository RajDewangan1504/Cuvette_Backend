// firebase.js
const path = require("path");
const admin = require("firebase-admin");
require("dotenv").config(); // Make sure to load environment variables

// Resolve the relative path to an absolute path
const serviceAccountPath = path.resolve(
  process.env.GOOGLE_APPLICATION_CREDENTIALS
);



// Initialize Firebase Admin SDK
const serviceAccount = require(serviceAccountPath);

admin.initializeApp({
  credential: admin.credential.cert({
    type: "service_account",
    project_id: "hello-95300",
    private_key_id: "8a24f083451f18065976194b81c0a52da4b5266d",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCqXZjKcTu8uxCf\nlFFC0PxM+k406E0fNiyWlzM5y8ln0zr/R/9/ysEgIIwsFqQ7/hAkKJvdoBMdkjeb\ns7uiayGRe226ipDnkRY2z5036e6x2PJ62YgX6/8/91+57bTb0i+uv2Uvyzv3AeDF\nEvH3oSuCdyy5B8eGEmHBrNdwQvoHaIwl4vTp/XKTrUuupUNdlhaLZzxLQlHj4EuV\ndyviPcPLPSQvNEjzM2ocmkArfWPvor2uaDhuOj1J4ZTsZ7c0+NAb5Fr1ksEcBdkY\n0AZstFIdURBM8BPma4BhMrDd5xqODoi4/FBmq9gxSmDS7fsi/YQ0RVwtDj9vvHob\ng4BbUttlAgMBAAECggEAGINe0eOIwrywhSL3AvlavDbDMatVNs75i8eAuD8MIUjM\nSIwTBXpmicQKdz42GRMS6SkArbBz36w4x8oM5FoBhVMwXt1uQSuSpIYAq1luc3Tx\nsDSETQYzftWOFrd5xQFmxABHw8s8kGuFlxsFPuoX/m3oZ6KTa8VRqeeVQ31s8stf\niGA/ume8fKh7AHwb7pJNwf3cdvCZj/s2ZgOrtTOSER8py/kAbs/o8NhZopaSISIH\nMKMyK4vNHY4QczoZ7lpmPfTbzFbI38iJsYqHqAgT0WDn4mrAFfqnei6FvII+nbgT\nZJW3a22UqPOHCXPK3QJK3w8K4fQMuf0UdQwVElKstwKBgQDd1ZYdR4bfl6nUYDcM\nFtq11Cc18cfMRlc3/vNx/2lu6pDaCou52XPf0h72aCgio6r6QzfB8mo7cC6UCZaM\nl7Tx3PwA6fCY4Vhc8P8CStU8yHtbMpZknojOMFy0lfxLL/tAZ8pD3VYS/E3ipYqO\niUPKN6L8jQ7Yk/pumeEy4paDFwKBgQDEmrfrd2vSbpCd+r6CDy0sOx9KSJBQBMtE\nLS70kdXQGL2fCRO+9CqOB8oZVl+6bfmunUoPOFim1iR7QZfrvbYgYJq+G2+Oh5Xi\nksOWDhZ8uIQHyV+jmLGYhJGqX/rVO39OLmg0UDBRRD0CmJ47Rg5XNXPdxIphZ7qK\nP1HXlaMS4wKBgDsewyUGfQF18ALzqXgFV0CCS/jqeO8OCAyaW9MT2MuApB4YFWjw\ndRs/apUM6TViHR0ZcPC1ZG521VMKwx6xB741wMuVjVORKvWKHMxFmVLbs1R4xPAH\n+DnLVcmi91wqa3Gct6EiieABcdhneefG2VQ5Q6y/AyfhOCrlw8jF7or9AoGAeEZi\nr+V+C91iEZOdSnm4W+/LY6lix+E27P1rVWmGUWlhT9LAxrge9IblZ3zE0YuIDP/i\nl88TxPUKmnD1XN3RdptC73xfUeW2l0bL6pexwBkthIn4PWAjfbfUWVOgYySj7BNN\n4nsQJBdH77eoTYC9MzLbMFeVhKNtpje4fNfpTJsCgYEAmdPI/KsV8f9OtGwH/Ppd\nIjSa9rJnEjP/m3Nd3ob7hle2v9Jv/RUV95/oaaY8A4KjTPKyCaip9G7JZyRxKK2m\nnnTXjG0rS9YDtFFe22VNmnU/5ZJu47HaliRVTAgpHn55B4wJ1c5Tr4hiT7TqdjN3\nz/qpmwvYsRLVqCX/J+CqtQU=\n-----END PRIVATE KEY-----\n",
    client_email: "firebase-adminsdk-zmndk@hello-95300.iam.gserviceaccount.com",
    client_id: "113043634137176945510",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url:
      "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-zmndk%40hello-95300.iam.gserviceaccount.com",
    universe_domain: "googleapis.com",
  }),
});

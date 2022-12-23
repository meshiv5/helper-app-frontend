/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  env: {
    app_id: "1528455",
    key: "411ff5e652ecf7c09668",
    secret: "785c1f49324d6a415490",
    cluster: "ap2",
    access_token_secret: "FkMKR512PxT%JiV!o8U%",
    // server: "https://rectangular-petal-snowdrop.glitch.me/",
    server: "http://localhost:8000/",
  },
};

module.exports = nextConfig;

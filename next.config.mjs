
/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        jsonResumeUrl: process.env.JSON_RESUME_URL
    },
    serverRuntimeConfig: {
        googleApiKey: process.env.GOOGLE_API_KEY
    }
};

export default nextConfig;

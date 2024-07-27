
/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        jsonResumeUrl: process.env.JSON_RESUME_URL
    },
    serverRuntimeConfig: {
        googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY
    }
};

export default nextConfig;

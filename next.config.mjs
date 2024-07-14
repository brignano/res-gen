/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        jsonResumeUrl: process.env.JSON_RESUME_URL
    }
};

export default nextConfig;

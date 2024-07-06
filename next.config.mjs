/** @type {import('next').NextConfig} */
const nextConfig = {
    publicRuntimeConfig: {
        gistId: process.env.GIST_ID
    }
};

export default nextConfig;

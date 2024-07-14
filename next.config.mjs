/** @type {import('next').NextConfig} */
const nextConfig = {
    output: "export",
    reactStrictMode: true,
    basePath: "/res-gen",
    publicRuntimeConfig: {
        jsonResumeUrl: process.env.JSON_RESUME_URL
    }
};

export default nextConfig;

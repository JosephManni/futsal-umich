/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['lh3.googleusercontent.com', 's.gravatar.com'],
},
};

export default nextConfig;


// /** @type {import('next').NextConfig} */
// const nextConfig = {
//     images: {
//         domains: ['lh3.googleusercontent.com'],
//     },
//     async headers() {
//       return [
//         {
//           source: "/api/(.*)",
//           headers: [
//             {
//               key: "Access-Control-Allow-Origin",
//               value: process.env.NEXT_PUBLIC_ALLOWED_ORIGIN, // Set your origin
//             },
//             {
//               key: "Access-Control-Allow-Methods",
//               value: "GET, POST, PUT, DELETE, OPTIONS",
//             },
//             {
//               key: "Access-Control-Allow-Headers",
//               value: "Content-Type, Authorization",
//             },
//           ],
//         },
//       ];
//     },
//     // Optionally, add any other Next.js config below.
//   };

// export default nextConfig;

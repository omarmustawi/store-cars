// // next.config.js
// const withImages = require('next-images');

// module.exports = withImages({
//   fileExtensions: ["jpg", "jpeg", "png", "gif", "jfif"], // Move this line outside the 'images' property
//   images: {
//     domains: [
//       "carsguide-res.cloudinary.com",
//       "www.forbes.com",
//       "i.gaw.to",
//       "cdn1.mecum.com" /* add more domains as needed */,
//     ],
//   },
// });

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  /* config options here */
  images: {
    domains: [
      "carsguide-res.cloudinary.com",
      "www.forbes.com",
      "i.gaw.to",
      "cdn1.mecum.com",
    ],
  }
};

module.exports = nextConfig;

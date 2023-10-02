import { Product } from "../types/Product/Product";

export const productsData: Product[] = [
  {
    id: 1,
    title: "yes",
    price: 1212,
    description: "test",
    images: ["https://picsum.photos/640/640?r=2123"],
    creationAt: "2023-09-28T12:04:22.000Z",
    updatedAt: "2023-09-28T12:04:22.000Z",
    category: {
      id: 3,
      name: "Clothe555",
      image: "https://picsum.photos/640/640?r=1389",
      creationAt: "2023-09-27T14:46:55.000Z",
      updatedAt: "2023-09-28T08:09:34.000Z",
    },
  },
  {
    id: 2,
    title: "Product 42",
    price: 518,
    description:
      "Introducing the QuantumGlow™ LED Smart Bulb - the future of lighting technology at your fingertips. This cutting-edge smart bulb seamlessly combines energy efficiency, convenience, and style to elevate your home or office space. With its user-friendly mobile app, you can effortlessly control brightness levels, set schedules, and even choose from millions of vibrant colors to suit your mood or occasion. QuantumGlow™ is compatible with popular voice assistants like Alexa and Google Home, allowing for hands-free operation and integration into your smart home ecosystem. Its long-lasting LED technology not only reduces energy consumption but also ensures years of reliable performance, making it an environmentally conscious choice. Transform your space with QuantumGlow™ and experience the perfect fusion of innovation and illumination.",
    images: ["https://source.unsplash.com/random/1600x900?42"],
    creationAt: "2023-09-28T12:08:37.000Z",
    updatedAt: "2023-09-28T12:08:37.000Z",
    category: {
      id: 2,
      name: "Shoes",
      image: "https://picsum.photos/640/640?r=2293",
      creationAt: "2023-09-27T14:46:55.000Z",
      updatedAt: "2023-09-27T14:46:55.000Z",
    },
  },
  {
    id: 3,
    title: "Product 43",
    price: 771,
    description:
      "Introducing the QuantumGlow™ LED Smart Bulb - the future of lighting technology at your fingertips. This cutting-edge smart bulb seamlessly combines energy efficiency, convenience, and style to elevate your home or office space. With its user-friendly mobile app, you can effortlessly control brightness levels, set schedules, and even choose from millions of vibrant colors to suit your mood or occasion. QuantumGlow™ is compatible with popular voice assistants like Alexa and Google Home, allowing for hands-free operation and integration into your smart home ecosystem. Its long-lasting LED technology not only reduces energy consumption but also ensures years of reliable performance, making it an environmentally conscious choice. Transform your space with QuantumGlow™ and experience the perfect fusion of innovation and illumination.",
    images: ["https://source.unsplash.com/random/1600x900?43"],
    creationAt: "2023-09-28T12:08:38.000Z",
    updatedAt: "2023-09-28T12:08:38.000Z",
    category: {
      id: 1,
      name: "Clothe555",
      image: "https://picsum.photos/640/640?r=1389",
      creationAt: "2023-09-27T14:46:55.000Z",
      updatedAt: "2023-09-28T08:09:34.000Z",
    },
  },
];

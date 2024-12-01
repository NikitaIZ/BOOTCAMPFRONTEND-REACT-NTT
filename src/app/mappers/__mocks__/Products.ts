import { Products } from "@/app/domain/interfaces/products";

export const mockProducts: Products[] = [
    { 
        id: 1, 
        title: "Apple iPhone", 
        description: "Latest Apple iPhone", 
        category: "electronics", 
        price: 699, 
        discountPercentage: 10, 
        images: ["image1.jpg"], 
        thumbnail: "link1", 
        stock: 50 
    },
    { 
        id: 2, 
        title: "Samsung Galaxy", 
        description: "Samsung Galaxy Phone", 
        category: "electronics", 
        price: 599, 
        discountPercentage: 15, 
        images: ["image2.jpg"], 
        thumbnail: "link2", 
        stock: 30 
    },
    { 
        id: 3, 
        title: "Google Pixel", 
        description: "Google Pixel Phone", 
        category: "electronics", 
        price: 499, 
        discountPercentage: 5, 
        images: ["image3.jpg"], 
        thumbnail: "link3", 
        stock: 40 
    },
    { 
        id: 4, 
        title: "OnePlus 9", 
        description: "OnePlus Smartphone", 
        category: "electronics", 
        price: 499, 
        discountPercentage: 20, 
        images: ["image4.jpg"], 
        thumbnail: "link4", 
        stock: 60 
    },
    { 
        id: 5, 
        title: "Sony Headphones", 
        description: "High quality Sony Headphones", 
        category: "audio", 
        price: 199, 
        discountPercentage: 10, 
        images: ["image5.jpg"], 
        thumbnail: "link5", 
        stock: 100 
    },
    { 
        id: 6, 
        title: "Bose QuietComfort", 
        description: "Noise cancelling Bose headphones", 
        category: "audio", 
        price: 299, 
        discountPercentage: 15, 
        images: ["image6.jpg"], 
        thumbnail: "link6", 
        stock: 50 
    },
    { 
        id: 7, 
        title: "JBL Speakers", 
        description: "Portable JBL Bluetooth speakers", 
        category: "audio", 
        price: 150, 
        discountPercentage: 5, 
        images: ["image7.jpg"], 
        thumbnail: "link7", 
        stock: 200 
    },
    { 
        id: 8, 
        title: "Dell XPS 13", 
        description: "Dell XPS laptop", 
        category: "electronics", 
        price: 999, 
        discountPercentage: 10, 
        images: ["image8.jpg"], 
        thumbnail: "link8", 
        stock: 20 
    },
    { 
        id: 9, 
        title: "MacBook Pro", 
        description: "Apple MacBook Pro", 
        category: "electronics", 
        price: 1299, 
        discountPercentage: 20, 
        images: ["image9.jpg"], 
        thumbnail: "link9", 
        stock: 10 
    },
    { 
        id: 10, 
        title: "Acer Predator", 
        description: "Acer gaming laptop", 
        category: "electronics", 
        price: 1500, 
        discountPercentage: 25, 
        images: ["image10.jpg"], 
        thumbnail: "link10", 
        stock: 5 
    },
];

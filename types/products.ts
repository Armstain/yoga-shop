interface Product {
    _id: string;
    name: string;
    description: string;
    price: number;
    image?: string;
    features?: string[];
}

export type { Product };
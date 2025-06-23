
export type ProductResponse = {
    id: number;
    name: string;
    description: string | null;
    created_at: Date;
}

export type ProductDetailResponse = {
    id: number;
    name: string;
    description: string | null;
    product_kanbans: ProductKanban[];
    created_at: Date;
}

type ProductKanban = {
    kanban_id: number;
    quantity: number;
}

export type CreateProductRequest = {
    name: string;
    description: string | null;
    product_kanbans: ProductKanban[];
}


export type UpdateProductRequest = {
    name: string;
    description: string | null;
    product_kanbans: ProductKanban[];
}


export type SearchProductRequest = {
    keyword?: string;
    page: number;
    limit: number;
    paginate?: boolean;
}


export function toProductResponse(Product: any): ProductResponse {
    return {
        id: Product.id,
        name: Product.name,
        description: Product.description,
        created_at: Product.created_at
    }
}

export function toProductDetailResponse(Product: any): ProductDetailResponse {
    return {
        id: Product.id,
        name: Product.name,
        description: Product.description,
        product_kanbans: Product.product_kanbans,
        created_at: Product.created_at
    }
}

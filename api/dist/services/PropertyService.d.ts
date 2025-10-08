import { PropertyType, PropertyStatus } from '@prisma/client';
export interface CreatePropertyRequest {
    title: string;
    description: string;
    price: number;
    type: PropertyType;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    address: string;
    city: string;
    state: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
    features?: string[];
    userId: string;
}
export interface UpdatePropertyRequest {
    title?: string;
    description?: string;
    price?: number;
    type?: PropertyType;
    status?: PropertyStatus;
    bedrooms?: number;
    bathrooms?: number;
    area?: number;
    address?: string;
    city?: string;
    state?: string;
    zipCode?: string;
    latitude?: number;
    longitude?: number;
    images?: string[];
    features?: string[];
    isPublished?: boolean;
}
export interface PropertyFilters {
    type?: PropertyType;
    status?: PropertyStatus;
    city?: string;
    state?: string;
    minPrice?: number;
    maxPrice?: number;
    bedrooms?: number;
    bathrooms?: number;
    minArea?: number;
    maxArea?: number;
    isPublished?: boolean;
}
export declare class PropertyService {
    createProperty(data: CreatePropertyRequest): Promise<{
        success: boolean;
        data: {
            images: any;
            features: any;
            user: {
                email: string;
                name: string;
                phone: string | null;
                id: string;
            };
            type: import(".prisma/client").$Enums.PropertyType;
            status: import(".prisma/client").$Enums.PropertyStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string;
            title: string;
            price: number;
            bedrooms: number | null;
            bathrooms: number | null;
            area: number | null;
            address: string;
            city: string;
            state: string;
            zipCode: string | null;
            latitude: number | null;
            longitude: number | null;
            isPublished: boolean;
            views: number;
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getPropertyById(id: string): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            images: any;
            features: any;
            user: {
                email: string;
                name: string;
                phone: string | null;
                id: string;
            };
            type: import(".prisma/client").$Enums.PropertyType;
            status: import(".prisma/client").$Enums.PropertyStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string;
            title: string;
            price: number;
            bedrooms: number | null;
            bathrooms: number | null;
            area: number | null;
            address: string;
            city: string;
            state: string;
            zipCode: string | null;
            latitude: number | null;
            longitude: number | null;
            isPublished: boolean;
            views: number;
        };
        error?: undefined;
    }>;
    getProperties(filters?: PropertyFilters, page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                totalPages: number;
                pages: number;
                hasNextPage: boolean;
                hasPrevPage: boolean;
                nextPage: number | null;
                prevPage: number | null;
            };
        };
    } | {
        success: boolean;
        error: string;
    }>;
    updateProperty(id: string, data: UpdatePropertyRequest, userId: string): Promise<{
        success: boolean;
        error: string;
        data?: undefined;
    } | {
        success: boolean;
        data: {
            images: any;
            features: any;
            user: {
                email: string;
                name: string;
                phone: string | null;
                id: string;
            };
            type: import(".prisma/client").$Enums.PropertyType;
            status: import(".prisma/client").$Enums.PropertyStatus;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string;
            title: string;
            price: number;
            bedrooms: number | null;
            bathrooms: number | null;
            area: number | null;
            address: string;
            city: string;
            state: string;
            zipCode: string | null;
            latitude: number | null;
            longitude: number | null;
            isPublished: boolean;
            views: number;
        };
        error?: undefined;
    }>;
    deleteProperty(id: string, userId: string): Promise<{
        success: boolean;
        error: string;
        message?: undefined;
    } | {
        success: boolean;
        message: string;
        error?: undefined;
    }>;
    incrementViews(id: string): Promise<{
        success: boolean;
        error?: undefined;
    } | {
        success: boolean;
        error: string;
    }>;
    getUserProperties(userId: string, page?: number, limit?: number): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
            pagination: {
                page: number;
                limit: number;
                total: number;
                pages: number;
            };
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getFeaturedProperties(limit?: number): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getRecentProperties(limit?: number): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getAffordableProperties(limit?: number, maxPrice?: number): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getHomeStats(): Promise<{
        success: boolean;
        data: {
            totalProperties: number;
            publishedProperties: number;
            totalUsers: number;
            totalViews: number;
            averagePrice: number;
            propertiesByType: {
                type: import(".prisma/client").$Enums.PropertyType;
                count: number;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
    getSimilarProperties(filters: any, limit: number, excludeId?: string): Promise<{
        success: boolean;
        data: {
            properties: {
                images: any;
                features: any;
                user: {
                    email: string;
                    name: string;
                    phone: string | null;
                    id: string;
                };
                type: import(".prisma/client").$Enums.PropertyType;
                status: import(".prisma/client").$Enums.PropertyStatus;
                id: string;
                createdAt: Date;
                updatedAt: Date;
                userId: string;
                description: string;
                title: string;
                price: number;
                bedrooms: number | null;
                bathrooms: number | null;
                area: number | null;
                address: string;
                city: string;
                state: string;
                zipCode: string | null;
                latitude: number | null;
                longitude: number | null;
                isPublished: boolean;
                views: number;
            }[];
        };
        error?: undefined;
    } | {
        success: boolean;
        error: string;
        data?: undefined;
    }>;
}
//# sourceMappingURL=PropertyService.d.ts.map
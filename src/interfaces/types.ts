export interface UserType {
    _id: string;
    email: string;
    password: string;
    firstName: string;
    lastName: string;
};

export interface AdminType {
    _id: string;
    email: string;
    username: string;
    password: string;
    businessName: string;
    ownerName: string;
};
  
export interface HotelType {
    _id: string;
    adminId: string;
    name: string;
    city: string;
    country: string;
    description: string;
    type: string;
    adultCount: number;
    childCount: number;
    facilities: string[];
    pricePerNight: number;
    starRating: number;
    imageUrls: string[];
    lastUpdated: Date;
    bookings: BookingType[];
};

export interface BookingType {
    _id: string;
    userId: string;
    firstName: string;
    lastName: string;
    email: string;
    adultCount: number;
    childCount: number;
    checkIn: Date;
    checkOut: Date;
    totalCost: number;
};
  

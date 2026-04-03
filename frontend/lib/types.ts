export type ApiResponse<T> = {
  success: boolean;
  message: string;
  data: T;
};

export type ServiceItem = {
  id: number;
  name: string;
  description: string;
  imageUrl: string;
};

export type GalleryCategory = "WEDDING" | "BIRTHDAY" | "CORPORATE";

export type GalleryItem = {
  id: number;
  imageUrl: string;
  category: GalleryCategory;
};

export type EventType = "WEDDING" | "BIRTHDAY" | "CORPORATE" | "CATERING";

export type BookingPayload = {
  name: string;
  phone: string;
  eventType: EventType;
  date: string;
  guests: number;
  message: string;
};

export type BookingItem = BookingPayload & {
  id: number;
  createdAt: string;
};

export type ContactPayload = {
  name: string;
  phone: string;
  message: string;
};

export type ContactItem = ContactPayload & {
  id: number;
  createdAt: string;
};

export type LoginPayload = {
  username: string;
  password: string;
};

export type LoginResponse = {
  token: string;
  username: string;
};

export type UploadResult = {
  imageUrl: string;
  objectName: string;
};

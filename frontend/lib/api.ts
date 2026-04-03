import type {
  ApiResponse,
  BookingItem,
  BookingPayload,
  ContactItem,
  ContactPayload,
  GalleryCategory,
  GalleryItem,
  LoginPayload,
  LoginResponse,
  ServiceItem,
  UploadResult
} from "@/lib/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:8080/api";

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    ...init,
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {})
    },
    cache: "no-store"
  });

  const payload = (await response.json()) as ApiResponse<T>;
  if (!response.ok || !payload.success) {
    throw new Error(payload.message || "Request failed");
  }

  return payload.data;
}

export async function getServices() {
  try {
    return await request<ServiceItem[]>("/services");
  } catch {
    return [];
  }
}

export async function getGallery(category?: GalleryCategory | "ALL") {
  const query = category && category !== "ALL" ? `?category=${category}` : "";
  try {
    return await request<GalleryItem[]>(`/gallery${query}`);
  } catch {
    return [];
  }
}

export function submitBooking(payload: BookingPayload) {
  return request<BookingItem>("/bookings", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function submitContact(payload: ContactPayload) {
  return request<ContactItem>("/contacts", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function adminLogin(payload: LoginPayload) {
  return request<LoginResponse>("/auth/login", {
    method: "POST",
    body: JSON.stringify(payload)
  });
}

export function getAdminServices(token: string) {
  return request<ServiceItem[]>("/admin/services", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function createService(token: string, payload: Omit<ServiceItem, "id">) {
  return request<ServiceItem>("/admin/services", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function updateService(token: string, id: number, payload: Omit<ServiceItem, "id">) {
  return request<ServiceItem>(`/admin/services/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deleteService(token: string, id: number) {
  return request<null>(`/admin/services/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getAdminGallery(token: string) {
  return request<GalleryItem[]>("/admin/gallery", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function createGalleryItem(token: string, payload: Omit<GalleryItem, "id">) {
  return request<GalleryItem>("/admin/gallery", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function updateGalleryItem(token: string, id: number, payload: Omit<GalleryItem, "id">) {
  return request<GalleryItem>(`/admin/gallery/${id}`, {
    method: "PUT",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify(payload)
  });
}

export function deleteGalleryItem(token: string, id: number) {
  return request<null>(`/admin/gallery/${id}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getAdminBookings(token: string) {
  return request<BookingItem[]>("/admin/bookings", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export function getAdminContacts(token: string) {
  return request<ContactItem[]>("/admin/contacts", {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
}

export async function uploadToStorage(token: string, file: File) {
  const formData = new FormData();
  formData.append("file", file);

  const response = await fetch(`${API_BASE_URL}/admin/uploads`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${token}`
    },
    body: formData
  });

  if (!response.ok) {
    throw new Error("Image upload failed");
  }

  const payload = (await response.json()) as ApiResponse<UploadResult>;
  if (!payload.success || !payload.data?.imageUrl) {
    throw new Error(payload.message || "Storage did not return an image URL");
  }

  return payload.data.imageUrl;
}

export interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    country_code: string | null;
    company: string;
    position: string;
    profile_pic: string | null;
    country: string;
    state: string | null;
    city: string | null;
    address: string | null;
    postal_code: string | null;
    timezone: string | null;
    language: string | null;
    bill_to: string | null;
    tax_id: string | null;
    billing_address: string | null;
    billing_phone: string | null;
    billing_email: string | null;
    details: string | null;
    reference: string | null;
    shared_files: number;
    can_access_portal: number;
    last_update: string;
  }
  
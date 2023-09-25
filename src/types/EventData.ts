export type Address = Partial<{
  first_name: string;
  sha256_first_name: string;
  last_name: string;
  sha256_last_name: string;
  street: string;
  city: string;
  region: string;
  postal_code: string;
  country: string;
}>;

export type UserData = Partial<{
  email_address: string;
  sha256_email_address: string;
  phone_number: string;
  sha256_phone_number: string;
  address: Address;
}>;

export type EventData = Partial<{
  client_id: string;
  currency: string;
  event_name: string;
  ip_override: string;
  language: string;
  page_encoding: string;
  page_hostname: string;
  page_location: string;
  page_path: string;
  page_referrer: string;
  page_title: string;
  screen_resolution: string;
  user_agent: string;
  user_data: UserData;
  user_id: string;
  value: number;
  viewport_size: string;
}>;

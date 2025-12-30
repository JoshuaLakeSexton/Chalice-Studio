export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  service: string;
  duration: string;
  message: string;
}

export interface ContactDocument extends ContactFormData {
  status: string;
  timestamp: Date;
}

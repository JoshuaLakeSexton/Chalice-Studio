import { ContactFormData } from '../types/contact';

export async function submitContact(formData: ContactFormData): Promise<void> {
  try {
    const response = await fetch('https://formsubmit.co/reach@chalice.studio', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        company: formData.company || 'Not provided',
        service: formData.service,
        duration: formData.duration,
        message: formData.message,
        _subject: `New Contact Form Submission from ${formData.name}`,
        _template: 'table',
      })
    });

    if (!response.ok) {
      throw new Error('Failed to send email');
    }
  } catch (error) {
    console.error('Error submitting contact form:', error);
    throw new Error('Failed to submit contact form. Please try again.');
  }
}


import { useState } from 'react';
import emailjs from '@emailjs/browser';

export const useEmailJS = () => {
    const [submitting, setSubmitting] = useState(false);
    const receiverEmail = 'anushkasurya803@gmail.com';

    const sendViaFormSubmit = async (formData) => {
        const payload = new URLSearchParams({
            name: formData.name.trim(),
            email: formData.email.trim(),
            message: formData.message.trim(),
            _subject: `Portfolio Contact from ${formData.name.trim()}`,
            _captcha: 'false',
            _template: 'table',
        });

        const response = await fetch(`https://formsubmit.co/ajax/${receiverEmail}`, {
            method: 'POST',
            headers: {
                Accept: 'application/json',
            },
            body: payload,
        });

        const responseBody = await response.json().catch(() => ({}));
        const message = String(responseBody?.message || '').toLowerCase();
        const isNotActivated = message.includes('activate') || message.includes('confirm');

        if (!response.ok || responseBody?.success === 'false') {
            if (isNotActivated) {
                const activationError = new Error('Please activate FormSubmit from your inbox first.');
                activationError.code = 'activation_required';
                throw activationError;
            }
            throw new Error(responseBody?.message || 'Form submission failed');
        }
        return responseBody;
    };

    const sendEmail = async (formData) => {
        const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID;
        const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
        const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

        setSubmitting(true);
        try {
            if (!serviceId || !templateId || !publicKey) {
                const response = await sendViaFormSubmit(formData);
                setSubmitting(false);
                return { success: true, provider: 'formsubmit', response };
            }

            const templateParams = {
                to_email: receiverEmail,
                from_name: formData.name.trim(),
                from_email: formData.email.trim(),
                message: formData.message.trim(),
                reply_to: formData.email.trim()
            };

            const response = await emailjs.send(
                serviceId,
                templateId,
                templateParams,
                publicKey
            );

            setSubmitting(false);
            return { success: true, provider: 'emailjs', response };
        } catch (error) {
            try {
                const response = await sendViaFormSubmit(formData);
                setSubmitting(false);
                return { success: true, provider: 'formsubmit', response };
            } catch (fallbackError) {
                setSubmitting(false);
                return {
                    success: false,
                    errorType: fallbackError?.code === 'activation_required' ? 'activation_required' : 'send_failed',
                    error: fallbackError || error
                };
            }
        }
    };

    return { sendEmail, submitting };
};

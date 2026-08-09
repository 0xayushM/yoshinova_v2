"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';

interface ContactDialogProps {
  isOpen: boolean;
  onClose: () => void;
  type?: 'contact' | 'energy-audit';
}

export default function ContactDialog({ isOpen, onClose, type = 'contact' }: ContactDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    company: '',
    contact: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          type,
        }),
      });

      const result = await response.json();

      if (result.success) {
        setSubmitStatus('success');
        setFormData({ name: '', company: '', contact: '' });
        setTimeout(() => {
          onClose();
          setSubmitStatus('idle');
        }, 2000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[10000] flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Dialog */}
      <div className="relative z-10 w-full max-w-md md:max-w-3xl mx-4 bg-gradient-to-t from-[#0a0a0a] to-[#0a0a0a]/95 border border-white/20 overflow-hidden">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 text-white/60 hover:text-white transition-colors"
          aria-label="Close dialog"
        >
          <X size={24} />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Left: Form */}
          <div className="p-8 md:p-10">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <h3 className="text-white text-[clamp(1.25rem,2.6vw,1.625rem)] font-bold tracking-wide mb-2">
                  {type === 'energy-audit' ? 'Request Energy Audit' : 'Contact Us'}
                </h3>
                <p className="text-white/70 text-sm leading-relaxed">
                  {type === 'energy-audit' 
                    ? 'We find your hidden savings first. Then we talk MPS.'
                    : 'Get in touch with our team for more information.'}
                </p>
              </div>

              <div className="space-y-4">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white text-base placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  placeholder="Your Name *"
                />
                <input
                  type="text"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white text-base placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  placeholder="Company Name *"
                />
                <input
                  type="tel"
                  name="contact"
                  value={formData.contact}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 bg-white/10 border border-white/30 text-white text-base placeholder-white/50 focus:outline-none focus:border-white focus:bg-white/15 transition-all"
                  placeholder="Contact Number *"
                />
              </div>

              {submitStatus === 'success' && (
                <p className="text-[#8BC34A] text-sm">Form submitted successfully!</p>
              )}
              {submitStatus === 'error' && (
                <p className="text-red-400 text-sm">Failed to submit. Please try again.</p>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-block px-6 py-3 border border-white/60 text-white text-sm uppercase tracking-widest hover:bg-white hover:text-black transition-colors duration-300"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Request'}
              </button>
            </form>
          </div>

          {/* Right: Image (desktop only) */}
          <div className="hidden md:block relative">
            <Image
              src="/images/contact.webp"
              alt="Contact Yoshinova"
              fill
              loading="lazy"
              sizes="50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a] to-transparent opacity-60" />
          </div>
        </div>
      </div>
    </div>
  );
}

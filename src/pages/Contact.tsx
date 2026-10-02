import { useState, useEffect, type FormEvent } from 'react';
import { useSearchParams } from 'react-router-dom';
import { EnvelopeSimple, Copy, Check, PaperPlaneTilt } from '@phosphor-icons/react';
import { brand, services, budgetOptions } from '../data/content';
import Reveal from '../components/Reveal';
import './Contact.css';

interface FormData {
  name: string;
  email: string;
  company: string;
  service: string;
  budget: string;
  details: string;
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const [copied, setCopied] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    service: '',
    budget: '',
    details: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});

  // Preselect service from URL param
  useEffect(() => {
    const serviceParam = searchParams.get('service');
    if (serviceParam) {
      const matchedService = services.find((s) => s.id === serviceParam);
      if (matchedService) {
        setFormData((prev) => ({ ...prev, service: matchedService.id }));
      }
    }
  }, [searchParams]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormData]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof FormData, string>> = {};
    if (!formData.name.trim()) newErrors.name = 'Please enter your name.';
    if (!formData.email.trim()) {
      newErrors.email = 'Please enter your email.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address.';
    }
    if (!formData.details.trim()) newErrors.details = 'Please describe your project.';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const buildMailtoBody = (): string => {
    let body = `Name: ${formData.name}\n`;
    body += `Email: ${formData.email}\n`;
    if (formData.company) body += `Company: ${formData.company}\n`;
    if (formData.service) {
      const s = services.find((sv) => sv.id === formData.service);
      body += `Service: ${s?.title || formData.service}\n`;
    }
    if (formData.budget) body += `Budget: ${formData.budget}\n`;
    body += `\nProject Details:\n${formData.details}`;
    return body;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    const subject = encodeURIComponent(
      `Project Enquiry${formData.company ? ` — ${formData.company}` : ''}`
    );
    const body = encodeURIComponent(buildMailtoBody());
    window.location.href = `mailto:${brand.email}?subject=${subject}&body=${body}`;
  };

  const copyEnquiry = () => {
    const text = `To: ${brand.email}\nSubject: Project Enquiry${
      formData.company ? ` — ${formData.company}` : ''
    }\n\n${buildMailtoBody()}`;
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <>
      {/* Hero */}
      <section className="contact-hero section" aria-label="Contact us">
        <div className="container">
          <Reveal>
            <h1 className="contact-hero-title">{brand.contactHeading}</h1>
          </Reveal>
          <Reveal delay={120}>
            <p className="contact-hero-subtitle">{brand.contactSubtext}</p>
          </Reveal>
        </div>
      </section>

      {/* Contact Content */}
      <section className="section contact-content" aria-label="Contact form">
        <div className="container">
          <div className="contact-layout">
            {/* Left — Contact Info */}
            <Reveal>
              <div className="contact-info">
                <h2 className="contact-info-title">Get in touch</h2>
                <p className="contact-info-text">
                  Whether you have a clear project in mind or just an idea you'd like to explore,
                  we're happy to talk it through.
                </p>

                <div className="contact-email-block">
                  <span className="contact-email-label">Email us directly</span>
                  <a href={`mailto:${brand.email}`} className="contact-email-link">
                    <EnvelopeSimple size={18} weight="bold" />
                    {brand.email}
                  </a>
                </div>

                <div className="contact-note">
                  <p>
                    <strong>How this form works:</strong> The form opens your email app with your 
                    enquiry pre-filled. You'll send it from your own email — no data is collected 
                    or stored on this website.
                  </p>
                </div>
              </div>
            </Reveal>

            {/* Right — Form */}
            <Reveal delay={160} direction="right">
              <form className="contact-form" onSubmit={handleSubmit} noValidate>
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className={`form-input ${errors.name ? 'error' : ''}`}
                    placeholder="Your name"
                    autoComplete="name"
                  />
                  {errors.name && <span className="form-error">{errors.name}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email <span className="required">*</span>
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className={`form-input ${errors.email ? 'error' : ''}`}
                    placeholder="your@email.com"
                    autoComplete="email"
                  />
                  {errors.email && <span className="form-error">{errors.email}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="company" className="form-label">
                    Business / Company
                  </label>
                  <input
                    type="text"
                    id="company"
                    name="company"
                    value={formData.company}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="Your business name (optional)"
                    autoComplete="organization"
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="service" className="form-label">
                      Service needed
                    </label>
                    <select
                      id="service"
                      name="service"
                      value={formData.service}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Select a service</option>
                      {services.map((s) => (
                        <option key={s.id} value={s.id}>
                          {s.title}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="form-group">
                    <label htmlFor="budget" className="form-label">
                      Budget
                    </label>
                    <select
                      id="budget"
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="form-input form-select"
                    >
                      <option value="">Select budget (optional)</option>
                      {budgetOptions.map((opt) => (
                        <option key={opt} value={opt}>
                          {opt}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="details" className="form-label">
                    Project details <span className="required">*</span>
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    value={formData.details}
                    onChange={handleChange}
                    className={`form-input form-textarea ${errors.details ? 'error' : ''}`}
                    placeholder="Tell us about your project, goals, and any specific requirements..."
                    rows={5}
                  />
                  {errors.details && <span className="form-error">{errors.details}</span>}
                </div>

                <div className="form-actions">
                  <button type="submit" className="btn btn-primary btn-lg form-submit">
                    <PaperPlaneTilt size={18} weight="bold" />
                    Open email draft
                  </button>
                  <button
                    type="button"
                    className="btn btn-secondary form-copy"
                    onClick={copyEnquiry}
                    disabled={!formData.name || !formData.email || !formData.details}
                  >
                    {copied ? (
                      <>
                        <Check size={16} weight="bold" /> Copied
                      </>
                    ) : (
                      <>
                        <Copy size={16} weight="bold" /> Copy enquiry
                      </>
                    )}
                  </button>
                </div>

                <p className="form-disclaimer">
                  This opens your email app with your enquiry pre-filled. 
                  You'll need to press "Send" in your email app to deliver it.
                </p>
              </form>
            </Reveal>
          </div>
        </div>
      </section>
    </>
  );
}

import { useEffect, useRef, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { motion, AnimatePresence  } from 'framer-motion';
import axios from 'axios';
import PhoneInput from 'react-phone-number-input'
import 'react-phone-number-input/style.css'

const testimonials = [
  {
    quote: `"Closed $25K in 2 weeks using this system. Game changer!"`,
    name: 'Sarah L.',
    title: 'Fitness Coach',
  },
  {
    quote: `"Doubled my revenue without spending a cent on ads."`,
    name: 'Mike R.',
    title: 'Consultant',
  },
  {
    quote: `"The coaching support alone is worth 10x the price."`,
    name: 'Janet W.',
    title: 'Business Strategist',
  },
  {
    quote: `"From 0 to 12 clients in 30 days. Just followed the process."`,
    name: 'Leo G.',
    title: 'New Creator',
  },
  {
    quote: `"Got more results in 3 weeks than I did in 6 months alone."`,
    name: 'Derek V.',
    title: 'Agency Owner',
  },
  {
    quote: `"Finally a system that doesn't rely on paid ads or fluff."`,
    name: 'Karen H.',
    title: 'Confidence Coach',
  },
]
const DEFAULT_VALUE = {
  name: '',
  email: '',
  phone: '',
  message: '',
  source: '',
}
export default function HormoziLandingPage() {
  const [formData, setFormData] = useState(DEFAULT_VALUE);
  const [country, setCountry] = useState('US');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null)
  const [showModal, setShowModal] = useState(false)
  const [submitting, setSubmitting] = useState(false);

  const scrollToForm = () => {
    formRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  useEffect(() => {
    fetch('https://ipapi.co/json/')
    .then(res => res.json())
    .then(data => {
      if (data.country) {
        console.log('Detected country:', data.country)
        setCountry(data.country)
      }
    })
    .catch(err => console.error('IP country detect failed', err))
    // Extract UTM source from URL
    const params = new URLSearchParams(window.location.search);
    const utmSource = params.get('utm_source') || 'direct';
    console.log('[useEffect] Extracted UTM source:', utmSource);
    setFormData((prev) => ({ ...prev, source: utmSource }));
    fetch(`http://localhost:8000/track/visit?utm_source=${utmSource}`)
      .then(() => console.log('[Tracking] Visit recorded'))
      .catch(console.error)
    
    // Dummy Facebook Pixel
    const fbPixelScript = document.createElement('script')
    fbPixelScript.innerHTML = `
      console.log('[FB Pixel] PageView triggered');
      // fbq('track', 'PageView'); // Would be real if pixel installed
    `
    document.body.appendChild(fbPixelScript)

    // Dummy TikTok Pixel
    const tiktokPixelScript = document.createElement('script')
    tiktokPixelScript.innerHTML = `
      console.log('[TikTok Pixel] PageView triggered');
      // ttq.track('ViewContent');
    `
    document.body.appendChild(tiktokPixelScript)

    // Cleanup on unmount
    return () => {
      document.body.removeChild(fbPixelScript)
      document.body.removeChild(tiktokPixelScript)
    }
  }, []);

  const handleChange = (e) => {
    console.log('[handleChange] Field changed:', e.target.name, '=>', e.target.value);
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const setPhone = (value) => {
    setFormData({ ...formData, phone: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    console.log('[handleSubmit] Form data before validation:', formData);
    if (!formData.name || !formData.email) {
      console.warn('[handleSubmit] Validation failed');
      setError('Name and Email are required.');
      return;
    }
    try {
      const response = await axios.post('http://localhost:8000/submit', formData);
      console.log('[handleSubmit] Submission response:', response.data);
      setSubmitted(true);
      setShowModal(true);
      setFormData(DEFAULT_VALUE); // Reset form after successful submission
    } catch (err) {
      setShowModal(true);
      console.error('[handleSubmit] Error during submission:', err);
      setError('Submission failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <main className="p-4 sm:p-6 max-w-4xl mx-auto">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center space-y-4 sm:space-y-6"
      >
        <h1 className="text-3xl sm:text-4xl font-bold">
          We Help Coaches Add $50k/Month Without Paid Ads – In 90 Days
        </h1>
        <p className="text-md sm:text-lg text-gray-600">
          Using our 3-step Client Acquisition System – even if you’re starting from scratch.
        </p>
        <motion.button
          onClick={scrollToForm}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-6 py-3 bg-black text-white rounded-md font-semibold shadow-md hover:bg-gray-800 transition"
        >
          Book Your Free Strategy Call
        </motion.button>
      </motion.section>

      <section className="my-10">
        <Card>
          <CardContent className="space-y-4">
            <h2 className="text-2xl font-semibold">What You Get</h2>
            <ul className="list-disc ml-6 text-left">
              <li>4x 1-on-1 Strategy Calls – $2,000</li>
              <li>12 Weeks Group Coaching – $1,500</li>
              <li>Private Community Access – $997</li>
              <li>Client Acquisition Blueprint – $1,200</li>
              <li>Scripts & Swipe Files – $497</li>
              <li>Bonus: Ad-Free Growth Strategy – $297</li>
            </ul>
            <p className="text-xl font-bold">Total Value: $6,491 – Yours Today for $997</p>
          </CardContent>
        </Card>
      </section>

      <section className="my-16 px-4">
        <motion.h2
          className="text-3xl font-extrabold text-center mb-10 text-black"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          💬 What Real Clients Are Saying
        </motion.h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {testimonials.map(({ quote, name, title }, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white p-6 border border-gray-200 rounded-lg shadow-md hover:shadow-xl transition-all"
            >
              <p className="text-gray-800 text-lg italic leading-relaxed">“{quote}”</p>
              <div className="mt-4 text-right">
                <p className="font-bold text-black">{name}</p>
                <p className="text-sm text-gray-500">{title}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <motion.section
        ref={formRef}
        className="my-16"
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ amount: 0.2 }}
      >
        <Card>
          <CardContent>
            <h2 className="text-2xl font-semibold mb-4">Book now</h2>
            {error && <p className="text-red-600 my-2">{error}</p>}
            <form onSubmit={handleSubmit} className="space-y-4">
              <Input name="name" placeholder="Name" value={formData.name} onChange={handleChange} required />
              <Input name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                <PhoneInput
                  defaultCountry={country}
                  placeholder="Enter phone number"
                  value={formData.phone}
                  onChange={setPhone}
                  className="!w-full border border-gray-300 rounded px-3 py-2 text-sm"
                />
              </div>
              <Textarea name="message" placeholder="Your background & goals..." value={formData.message} onChange={handleChange} />
              <Button type="submit" disabled={submitting} className={`flex items-center justify-center gap-2 ${submitting ? 'opacity-50 cursor-not-allowed' : ''}`}>
                {submitting && (
                  <svg
                    className="animate-spin h-4 w-4 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                    ></path>
                  </svg>
                )}
                {submitting ? 'Sending application...' : 'Submit Application'}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.section><AnimatePresence>
      {showModal && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
        >
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-6 rounded-lg shadow-xl w-full max-w-sm text-center"
          >
            <h2 className="text-2xl font-bold text-green-600 mb-2">🎉 Success!</h2>
            <p className="text-gray-700 mb-4">We have received your request. One of our agent will contact you shortly..</p>
            <button
              className="bg-black text-white px-4 py-2 rounded hover:bg-gray-800 transition"
              onClick={() => setShowModal(false)}
            >
              Close
            </button>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
    </main>
  );
}

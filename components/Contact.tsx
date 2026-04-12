'use client';

import { useState } from 'react';
import { Calendar, Clock, Users, Phone, User, MessageSquare } from 'lucide-react';

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    requests: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Replace YOUR_GOOGLE_FORM_ID with your actual Form ID
    const GOOGLE_FORM_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSczqZ0SjqHfsT-NGroBSDjOZEuvCoM4Izp6bpHPAaK5L4p1Hw/formResponse';
    
    // Map our React state to the specific Google Form entry IDs
    const formBody = new URLSearchParams();
    formBody.append('entry.1324918526', formData.name); // Replace with your Name Field ID
    formBody.append('entry.384536288', formData.phone); // Exact Phone Field ID mapped
    formBody.append('entry.214699220', formData.date); // Replace with your Date Field ID
    formBody.append('entry.411635861', formData.time); // Replace with your Time Field ID
    formBody.append('entry.606764086', formData.guests); // Replace with your Guests Field ID
    formBody.append('entry.1011090535', formData.requests); // Replace with your Requests Field ID

    try {
      await fetch(GOOGLE_FORM_URL, {
        method: 'POST',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: formBody.toString(),
      });
      
      setIsSuccess(true);
      setFormData({ name: '', phone: '', date: '', time: '', guests: '2', requests: '' });
    } catch (error) {
      console.error('Submission failed', error);
      // Fallback error handling could go here
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-24 bg-slate-900 text-slate-100 px-6 lg:px-24 border-t border-slate-800">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Left Column: Copy & Ambiance */}
        <div className="flex flex-col justify-center">
          <p className="text-gold-500 tracking-[0.2em] text-sm uppercase mb-4 font-semibold">Reserve Your Table</p>
          <h2 className="text-4xl md:text-5xl font-serif text-slate-100 mb-8 leading-tight">
            We look forward to hosting your next unforgettable evening.
          </h2>
          <p className="text-slate-400 leading-relaxed mb-8 max-w-md">
            Whether you are planning an intimate dinner or a grand celebration, our team is dedicated to curating a flawless dining experience tailored entirely to your preferences.
          </p>
          
          <div className="space-y-4 text-slate-300">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-500">
                <Clock size={18} />
              </div>
              <div>
                <p className="font-medium text-slate-100">Dinner Service</p>
                <p className="text-sm text-slate-500">Tuesday - Sunday, 5PM - 11PM</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: The Booking Form */}
        <div className="bg-slate-800/50 p-8 md:p-10 rounded-2xl border border-slate-700 shadow-xl relative overflow-hidden">
          
          {isSuccess ? (
            <div className="absolute inset-0 bg-slate-800/95 backdrop-blur-sm flex flex-col items-center justify-center text-center p-8 z-10 animate-in fade-in duration-500">
              <div className="w-16 h-16 bg-gold-500/20 text-gold-500 rounded-full flex items-center justify-center mb-6">
                <Calendar size={32} />
              </div>
              <h3 className="text-2xl font-serif text-gold-500 mb-4">Request Received</h3>
              <p className="text-slate-300">
                We have secured your details. Our reservations team will reach out shortly to confirm your booking.
              </p>
              <button 
                onClick={() => setIsSuccess(false)}
                className="mt-8 text-gold-500 text-sm hover:underline tracking-wider uppercase"
              >
                Make Another Reservation
              </button>
            </div>
          ) : null}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-slate-400 uppercase">Full Name</label>
                <div className="relative">
                  <User size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors" placeholder="John Doe" />
                </div>
              </div>
              {/* Phone */}
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-slate-400 uppercase">Phone Number</label>
                <div className="relative">
                  <Phone size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors" placeholder="+1 (555) 000-0000" />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Date */}
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-slate-400 uppercase">Date</label>
                <div className="relative">
                  <Calendar size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10" />
                  <input required type="date" name="date" value={formData.date} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                </div>
              </div>
              {/* Time */}
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-slate-400 uppercase">Time</label>
                <div className="relative">
                  <Clock size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500 z-10" />
                  <input required type="time" name="time" value={formData.time} onChange={handleChange} min="17:00" max="23:00" className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors [&::-webkit-calendar-picker-indicator]:opacity-0 [&::-webkit-calendar-picker-indicator]:absolute [&::-webkit-calendar-picker-indicator]:inset-0 [&::-webkit-calendar-picker-indicator]:cursor-pointer" />
                </div>
              </div>
              {/* Guests */}
              <div className="space-y-2">
                <label className="text-xs tracking-wider text-slate-400 uppercase">Guests</label>
                <div className="relative">
                  <Users size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                  <select name="guests" value={formData.guests} onChange={handleChange} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors appearance-none cursor-pointer">
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(num => (
                      <option key={num} value={num}>{num} {num === 1 ? 'Guest' : 'Guests'}</option>
                    ))}
                    <option value="9+">9+ (Large Party)</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Special Requests */}
            <div className="space-y-2">
              <label className="text-xs tracking-wider text-slate-400 uppercase">Special Requests (Optional)</label>
              <div className="relative">
                <MessageSquare size={16} className="absolute left-3 top-4 text-slate-500" />
                <textarea name="requests" value={formData.requests} onChange={handleChange} rows={3} className="w-full bg-slate-900 border border-slate-700 rounded-lg py-3 pl-10 pr-4 text-slate-100 focus:outline-none focus:border-gold-500 transition-colors resize-none" placeholder="Dietary restrictions, celebrations..." />
              </div>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="w-full bg-gold-500 hover:bg-gold-400 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 uppercase tracking-widest mt-4 flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? 'Processing...' : 'Request Reservation'}
            </button>
          </form>
        </div>

      </div>
    </section>
  );
}
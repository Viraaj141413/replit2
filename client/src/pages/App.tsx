import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Landing from './landing';
import Dashboard from './dashboard';
import IDE from './ide';
import NotFound from './not-found';
import { Toaster } from '@/components/ui/toaster';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/ide" element={<IDE />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Toaster />
    </div>
  );
}
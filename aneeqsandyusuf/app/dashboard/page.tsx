'use client';

import Link from 'next/link';
import { Camera, MapPin, Heart, User } from 'lucide-react';

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      {/* Header */}
      <header className="border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <Heart className="h-8 w-8 text-red-500 mr-3" />
              <h1 className="text-2xl font-bold">Our Journey</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-6 w-6 text-gray-500" />
                <span className="font-medium">Aneeq & Yusuf</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Welcome to Your Dashboard
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore your shared memories, capture new moments, and stay connected wherever you are.
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Gallery Card - Functional */}
          <Link href="/dashboard/gallery" className="group">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 overflow-hidden">
              <div className="p-8 text-center border-b border-gray-200 dark:border-gray-800">
                <Camera className="h-16 w-16 text-gray-700 dark:text-gray-300 mx-auto mb-4 group-hover:scale-105 transition-transform duration-200" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Gallery</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Browse through your beautiful collection of shared photos and memories.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  <span>Explore Gallery</span>
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-200 text-xs px-2 py-1 rounded">
                    Active
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Memories Card - Coming Soon */}
          <Link href="/dashboard/memories" className="group">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 overflow-hidden opacity-60">
              <div className="p-8 text-center border-b border-gray-200 dark:border-gray-800">
                <Heart className="h-16 w-16 text-gray-700 dark:text-gray-300 mx-auto mb-4 group-hover:scale-105 transition-transform duration-200" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Memories</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Create and revisit your favorite moments with timeline views and special collections.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  <span>View Memories</span>
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </Link>

          {/* Live Location Card - Coming Soon */}
          <Link href="/dashboard/live-location" className="group">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 hover:border-gray-300 dark:hover:border-gray-700 transition-all duration-200 overflow-hidden opacity-60">
              <div className="p-8 text-center border-b border-gray-200 dark:border-gray-800">
                <MapPin className="h-16 w-16 text-gray-700 dark:text-gray-300 mx-auto mb-4 group-hover:scale-105 transition-transform duration-200" />
              </div>
              <div className="p-6">
                <h3 className="text-2xl font-bold mb-3">Live Location</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  Share your real-time location and see where your loved one is on the map.
                </p>
                <div className="flex items-center text-blue-600 dark:text-blue-400 font-medium group-hover:text-blue-700 dark:group-hover:text-blue-300">
                  <span>Share Location</span>
                  <svg className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
                <div className="mt-3">
                  <span className="inline-block bg-yellow-100 dark:bg-yellow-900 text-yellow-800 dark:text-yellow-200 text-xs px-2 py-1 rounded">
                    Coming Soon
                  </span>
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Quick Stats */}
        <div className="mt-16 bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-8 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold mb-6 text-center">Quick Overview</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
              <div className="text-gray-600 dark:text-gray-400">Photos Shared</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
              <div className="text-gray-600 dark:text-gray-400">Memories Created</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">0</div>
              <div className="text-gray-600 dark:text-gray-400">Locations Visited</div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
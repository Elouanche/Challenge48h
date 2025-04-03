import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Show({ auth, event }) {
    return (
        <MainLayout auth={auth} title={event.title}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <Link
                        href="/dashboard"
                        className="text-indigo-600 hover:text-indigo-500 flex items-center"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour aux événements
                    </Link>
                    {auth.user.role === 'admin' && (
                        <Link
                            href={`/events/${event.id}/edit`}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Modifier l'événement
                        </Link>
                    )}
                </div>

                <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                    <div className="p-8">
                        <div className="flex justify-between items-start mb-6">
                            <h1 className="text-3xl font-bold text-gray-900">{event.title}</h1>
                            <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                                {new Date(event.date).toLocaleDateString('fr-FR', {
                                    weekday: 'long',
                                    year: 'numeric',
                                    month: 'long',
                                    day: 'numeric'
                                })}
                            </span>
                        </div>

                        <div className="prose max-w-none">
                            <div className="bg-gray-50 rounded-lg p-6 mb-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Description de l'événement</h2>
                                <p className="text-gray-700 whitespace-pre-line">{event.description}</p>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Informations pratiques</h2>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                                <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                            </svg>
                                            {event.location}
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            {event.time}
                                        </li>
                                    </ul>
                                </div>

                                <div className="bg-gray-50 rounded-lg p-6">
                                    <h2 className="text-xl font-semibold text-gray-900 mb-4">Contact</h2>
                                    <ul className="space-y-3 text-gray-700">
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                            </svg>
                                            {event.contact_email}
                                        </li>
                                        <li className="flex items-center">
                                            <svg className="h-5 w-5 mr-2 text-gray-500" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                                <path d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                                            </svg>
                                            {event.contact_phone}
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
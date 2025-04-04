import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Index({ auth, events }) {
    return (
        <MainLayout  title="Événements">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Liste des Événements</h2>
                    {auth.user.role === 'admin' && (
                        <Link
                            href="/events/create"
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Créer un événement
                        </Link>
                    )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div key={event.id} className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                            <div className="p-6">
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.title}</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {new Date(event.date).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <p className="text-gray-600 mb-4 line-clamp-3">{event.description}</p>
                                <div className="mt-4 flex justify-end">
                                    <Link
                                        href={`/events/${event.id}`}
                                        className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                                    >
                                        Voir plus
                                    </Link>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun événement n'est disponible pour le moment.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
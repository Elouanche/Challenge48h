import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Show({ auth, user }) {
    return (
        <MainLayout auth={auth} title={`Profil de ${user.name}`}>
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Profil de l'utilisateur</h2>

                <div className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200">
                    <div className="p-6 space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <h3 className="text-lg font-medium text-gray-900">Informations personnelles</h3>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Nom</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.name}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Email</label>
                                    <p className="mt-1 text-sm text-gray-900">{user.email}</p>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Rôle</label>
                                    <span className={`mt-1 px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${user.role === 'admin' ? 'bg-red-100 text-red-800' : 'bg-green-100 text-green-800'}`}>
                                        {user.role === 'admin' ? 'Admin' : 'Bénévole'}
                                    </span>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-500">Date d'inscription</label>
                                    <p className="mt-1 text-sm text-gray-900">
                                        {new Date(user.created_at).toLocaleDateString('fr-FR')}
                                    </p>
                                </div>
                            </div>

                            {user.events && user.events.length > 0 && (
                                <div className="space-y-2">
                                    <h3 className="text-lg font-medium text-gray-900">Événements participés</h3>
                                    <div className="overflow-y-auto max-h-60">
                                        <ul className="divide-y divide-gray-200">
                                            {user.events.map((event) => (
                                                <li key={event.id} className="py-2">
                                                    <div className="flex justify-between">
                                                        <p className="text-sm font-medium text-gray-900">{event.title}</p>
                                                        <p className="text-sm text-gray-500">
                                                            {new Date(event.date).toLocaleDateString('fr-FR')}
                                                        </p>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
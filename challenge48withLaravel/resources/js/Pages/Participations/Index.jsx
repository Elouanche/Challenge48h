import { Head } from '@inertiajs/react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';

export default function Index({ auth, participations }) {
    const [deletingId, setDeletingId] = useState(null);
    
    const { delete: destroy, processing } = useForm();

    const handleDelete = (id) => {
        if (confirm('Êtes-vous sûr de vouloir annuler cette participation ?')) {
            destroy(route('participations.destroy', id));
        }
    };

    return (
        <MainLayout auth={auth} title="Mes Participations">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Mes Participations aux Événements</h2>
                    <Link
                        href="/dashboard"
                        className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                    >
                        Voir les événements
                    </Link>
                </div>

                {participations && participations.length > 0 ? (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Événement
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Lieu
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {participations.map((participation) => (
                                    <tr key={participation.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {participation.event.titre}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {participation.event.type_evenement}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-900">
                                                {new Date(participation.event.date).toLocaleDateString('fr-FR')}
                                            </div>
                                            <div className="text-sm text-gray-500">
                                                {participation.event.heure_debut} - {participation.event.heure_fin}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {participation.event.lieu}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <Link
                                                href={`/events/${participation.event.id}`}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Détails
                                            </Link>
                                            <button
                                                onClick={() => handleDelete(participation.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={processing}
                                            >
                                                Annuler
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-500 text-lg mb-4">Vous n'êtes inscrit à aucun événement pour le moment.</p>
                        <Link
                            href="/dashboard"
                            className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            Découvrir les événements
                        </Link>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
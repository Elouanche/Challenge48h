import { Head } from '@inertiajs/react';
import { Link, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import PrimaryButton from '@/Components/PrimaryButton';
import DangerButton from '@/Components/DangerButton';
import { useState } from 'react';

export default function Participants({ auth, event, participants }) {
    const [removingId, setRemovingId] = useState(null);
    
    const { delete: destroy, processing } = useForm();

    const handleRemove = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette participation ?')) {
            destroy(route('participations.destroy', id));
        }
    };

    return (
        <MainLayout auth={auth} title={`Participants - ${event.titre}`}>
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Participants à l'événement</h2>
                    <Link
                        href={`/events/${event.id}`}
                        className="text-indigo-600 hover:text-indigo-500 flex items-center"
                    >
                        <svg className="h-5 w-5 mr-2" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                        Retour à l'événement
                    </Link>
                </div>

                <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                    <div className="p-6">
                        <h3 className="text-xl font-semibold text-gray-900 mb-4">{event.titre}</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                            <div>
                                <p className="text-sm text-gray-500">Date</p>
                                <p className="text-gray-700">{new Date(event.date).toLocaleDateString('fr-FR')}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Horaires</p>
                                <p className="text-gray-700">{event.heure_debut} - {event.heure_fin}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Lieu</p>
                                <p className="text-gray-700">{event.lieu}</p>
                            </div>
                            <div>
                                <p className="text-sm text-gray-500">Nombre de participants</p>
                                <p className="text-gray-700">{participants.length}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {participants && participants.length > 0 ? (
                    <div className="bg-white shadow-md rounded-lg overflow-hidden">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Nom
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Email
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Téléphone
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Date d'inscription
                                    </th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {participants.map((participation) => (
                                    <tr key={participation.id}>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm font-medium text-gray-900">
                                                {participation.user.name}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            <div className="text-sm text-gray-500">
                                                {participation.user.email}
                                            </div>
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {participation.user.phone || 'Non renseigné'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(participation.created_at).toLocaleDateString('fr-FR')}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => handleRemove(participation.id)}
                                                className="text-red-600 hover:text-red-900"
                                                disabled={processing}
                                            >
                                                Supprimer
                                            </button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                ) : (
                    <div className="bg-white p-6 rounded-lg shadow-md text-center">
                        <p className="text-gray-500 text-lg mb-4">Aucun participant inscrit à cet événement pour le moment.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
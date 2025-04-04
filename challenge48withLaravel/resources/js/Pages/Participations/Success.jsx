import { Head } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';

export default function Success({ auth, message, participation = null }) {
    return (
        <MainLayout auth={auth} title="Confirmation">
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
                </div>

                <div className="bg-white overflow-hidden shadow-xl rounded-lg">
                    <div className="p-8 text-center">
                        <div className="flex justify-center mb-6">
                            <div className="rounded-full bg-green-100 p-3">
                                <svg className="h-8 w-8 text-green-600" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24" stroke="currentColor">
                                    <path d="M5 13l4 4L19 7" />
                                </svg>
                            </div>
                        </div>
                        
                        <h1 className="text-2xl font-bold text-gray-900 mb-4">Opération réussie</h1>
                        <p className="text-lg text-gray-700 mb-6">{message}</p>
                        
                        {participation && (
                            <div className="bg-gray-50 rounded-lg p-6 mb-6 max-w-md mx-auto text-left">
                                <h2 className="text-xl font-semibold text-gray-900 mb-4">Détails de l'événement</h2>
                                <div className="space-y-3 text-gray-700">
                                    <p><span className="font-medium">Événement:</span> {participation.event.titre}</p>
                                    <p><span className="font-medium">Date:</span> {new Date(participation.event.date).toLocaleDateString('fr-FR')}</p>
                                    <p><span className="font-medium">Horaires:</span> {participation.event.heure_debut} - {participation.event.heure_fin}</p>
                                    <p><span className="font-medium">Lieu:</span> {participation.event.lieu}</p>
                                </div>
                            </div>
                        )}
                        
                        <div className="flex justify-center space-x-4">
                            <Link
                                href="/participations"
                                className="inline-flex items-center px-4 py-2 bg-indigo-600 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-indigo-500 active:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Voir mes participations
                            </Link>
                            <Link
                                href="/dashboard"
                                className="inline-flex items-center px-4 py-2 bg-gray-200 border border-transparent rounded-md font-semibold text-xs text-gray-800 uppercase tracking-widest hover:bg-gray-300 active:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition ease-in-out duration-150"
                            >
                                Retour au tableau de bord
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
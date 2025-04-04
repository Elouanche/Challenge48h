import { useState } from 'react';
import { useForm } from '@inertiajs/react'; // Utilise useForm, pas useForms
import MainLayout from '@/Layouts/MainLayout';

export default function Dashboard({ auth, events }) {
    const { post, processing } = useForm();  // Utilise useForm pour gérer le formulaire
    const [loadingEventId, setLoadingEventId] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState(null);

    const handleParticipation = (eventId) => {
        const parsedEventId = parseInt(eventId, 10); // Conversion en entier
    
        if (isNaN(parsedEventId)) {
            console.error("eventId n'est pas un nombre valide", eventId);
            return;
        }
    
        // Vérifie si l'utilisateur est bien authentifié et que son ID est défini
        if (!auth || !auth.user || !auth.user.id) {
            console.error("Utilisateur non authentifié ou ID manquant", auth);
            alert("Vous devez être connecté pour participer à un événement.");
            return;
        }
        const userId = auth.user.id;
    
        console.log("Données envoyées :", { user_id: userId, event_id: parsedEventId });
    
        setLoadingEventId(parsedEventId);
    
        post('/participations', 
            { user_id: userId, event_id: parsedEventId }, 
            {
                headers: { 'Content-Type': 'application/json' }, 
                onSuccess: () => {
                    setLoadingEventId(null);
                    window.location.href = '/participations/success';
                },
                onError: (errors) => {
                    console.error("Erreur de validation Laravel :", errors);
                    setLoadingEventId(null);
                },
            }
        );
    };
    
    
    

    const openModal = (event) => {
        setSelectedEvent(event);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedEvent(null);
    };

    const handleDelete = () => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cet événement ?')) {
            const { delete: destroy } = useForm();
            destroy(route('events.destroy', selectedEvent.id), {
                onSuccess: () => {
                    closeModal();
                    window.location.reload();
                },
                onError: (errors) => {
                    console.error("Erreur lors de la suppression :", errors);
                }
            });
        }
    };

    const handleUpdate = () => {
        window.location.href = route('events.edit', selectedEvent.id);
    };

    return (
        <MainLayout auth={auth} title="Dashboard">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Événements à venir</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.map((event) => (
                        <div
                            key={event.id}
                            className="bg-white overflow-hidden shadow-sm rounded-lg border border-gray-200 cursor-pointer"
                        >
                            <div className="p-6" onClick={() => openModal(event)}>
                                <div className="flex justify-between items-start">
                                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{event.titre}</h3>
                                    <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-800">
                                        {new Date(event.date).toLocaleDateString('fr-FR')}
                                    </span>
                                </div>
                                <div className="mb-4">
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                                            <path d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                        </svg>
                                        {event.lieu}
                                    </div>
                                    <div className="flex items-center text-gray-600 mb-2">
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                        </svg>
                                        {event.heure_debut} - {event.heure_fin}
                                    </div>
                                    <div className="flex items-center text-gray-600">
                                        <svg className="h-5 w-5 mr-2" fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" viewBox="0 0 24 24">
                                            <path d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"></path>
                                        </svg>
                                        {event.type_evenement}
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={() => handleParticipation(event.id)}
                                disabled={processing || loadingEventId === event.id}
                                className={`px-4 py-2 rounded-lg text-white font-semibold transition ${loadingEventId === event.id ? 'bg-gray-400 cursor-not-allowed' : 'bg-[#1CABE2] hover:bg-[#006FA1]'}`}
                            >
                                {loadingEventId === event.id ? 'Participation en cours...' : 'Participer'}
                            </button>
                            <p>{event.id}</p>
                        </div>
                    ))}
                </div>

                {events.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun événement prévu</p>
                    </div>
                )}
            </div>

            {isModalOpen && selectedEvent && (
                <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg shadow-lg p-6 w-1/3">
                        <h2 className="text-xl font-semibold mb-4">{selectedEvent.titre}</h2>
                        <p className="mb-4">Lieu : {selectedEvent.lieu}</p>
                        <p className="mb-4">Heure : {selectedEvent.heure_debut} - {selectedEvent.heure_fin}</p>
                        <p className="mb-4">Type : {selectedEvent.type_evenement}</p>
                        <p className="mb-4">Contact : {selectedEvent.contact_nom} ({selectedEvent.contact_email}, {selectedEvent.contact_telephone})</p>
                        <p className="mb-4">Covoiturage : {selectedEvent.coviturage_possible}</p>
                        <p className="mb-4">Déjeuner prévu : {selectedEvent.dejeuner_prevu}</p>
                        <p className="mb-4">Type de public : {selectedEvent.type_public}</p>
                        {selectedEvent.information_supplementaire && (
                            <p className="mb-4">Informations supplémentaires : {selectedEvent.information_supplementaire}</p>
                        )}

                        {auth?.user?.role === "admin" && (
                            <div className="flex justify-end space-x-2">
                                <button className="bg-blue-500 text-white px-4 py-2 rounded" onClick={handleUpdate}>Modifier</button>
                                <button className="bg-red-500 text-white px-4 py-2 rounded" onClick={handleDelete}>Supprimer</button>
                                <button className="bg-gray-500 text-white px-4 py-2 rounded" onClick={closeModal}>Fermer</button>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </MainLayout>
    );
}

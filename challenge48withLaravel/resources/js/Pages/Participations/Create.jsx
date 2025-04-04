import { Head, useForm } from '@inertiajs/react';
import { Link } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import { Transition } from '@headlessui/react';

export default function Create({ auth, event }) {
    const { data, setData, post, processing, errors, reset, recentlySuccessful } = useForm({
        user_id: auth.user.id,
        event_id: event.id
    });

    const submit = (e) => {
        e.preventDefault();
        post(route('participations.store'));
    };

    return (
        <MainLayout auth={auth} title={`Participer à ${event.titre}`}>
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
                    <div className="p-8">
                        <h1 className="text-2xl font-bold text-gray-900 mb-6">Confirmer votre participation</h1>
                        
                        <div className="bg-gray-50 rounded-lg p-6 mb-6">
                            <h2 className="text-xl font-semibold text-gray-900 mb-4">{event.titre}</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-700">
                                <div>
                                    <p className="font-medium">Date:</p>
                                    <p>{new Date(event.date).toLocaleDateString('fr-FR', {
                                        weekday: 'long',
                                        year: 'numeric',
                                        month: 'long',
                                        day: 'numeric'
                                    })}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Horaires:</p>
                                    <p>{event.heure_debut} - {event.heure_fin}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Lieu:</p>
                                    <p>{event.lieu}</p>
                                </div>
                                <div>
                                    <p className="font-medium">Type d'événement:</p>
                                    <p>{event.type_evenement}</p>
                                </div>
                            </div>
                        </div>

                        <form onSubmit={submit} className="space-y-6">
                            <div className="flex items-center gap-4">
                                <PrimaryButton disabled={processing}>
                                    Confirmer ma participation
                                </PrimaryButton>

                                <Transition
                                    show={recentlySuccessful}
                                    enter="transition ease-in-out"
                                    enterFrom="opacity-0"
                                    leave="transition ease-in-out"
                                    leaveTo="opacity-0"
                                >
                                    <p className="text-sm text-green-600">
                                        Participation enregistrée avec succès.
                                    </p>
                                </Transition>
                            </div>
                            
                            {errors.user_id && <InputError message={errors.user_id} className="mt-2" />}
                            {errors.event_id && <InputError message={errors.event_id} className="mt-2" />}
                            {errors.message && <InputError message={errors.message} className="mt-2" />}
                        </form>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
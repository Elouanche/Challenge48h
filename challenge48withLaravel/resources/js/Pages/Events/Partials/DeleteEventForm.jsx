import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';
import { useRef, useState } from 'react';

export default function DeleteEventForm({ className = '', event }) {
    const [confirmingEventDeletion, setConfirmingEventDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
        clearErrors,
    } = useForm({
        password: '',
    });

    const confirmEventDeletion = () => {
        setConfirmingEventDeletion(true);
    };

    const deleteEvent = (e) => {
        e.preventDefault();

        destroy(route('events.destroy', event.id), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingEventDeletion(false);

        clearErrors();
        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    Supprimer l'événement
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    Une fois l'événement supprimé, toutes les ressources et données associées seront définitivement supprimées.
                    Avant de supprimer cet événement, veuillez vous assurer que vous n'en avez plus besoin.
                </p>
            </header>

            <DangerButton onClick={confirmEventDeletion}>
                Supprimer l'événement
            </DangerButton>

            <Modal show={confirmingEventDeletion} onClose={closeModal}>
                <form onSubmit={deleteEvent} className="p-6">
                    <h2 className="text-lg font-medium text-gray-900">
                        Êtes-vous sûr de vouloir supprimer cet événement ?
                    </h2>

                    <p className="mt-1 text-sm text-gray-600">
                        Une fois l'événement supprimé, toutes les ressources et données associées seront définitivement supprimées.
                        Veuillez entrer votre mot de passe pour confirmer que vous souhaitez supprimer définitivement cet événement.
                    </p>

                    <div className="mt-6">
                        <InputLabel
                            htmlFor="password"
                            value="Mot de passe"
                            className="sr-only"
                        />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) =>
                                setData('password', e.target.value)
                            }
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Mot de passe"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>
                            Annuler
                        </SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Supprimer l'événement
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
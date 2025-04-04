import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Transition } from '@headlessui/react';
import { useForm } from '@inertiajs/react';

export default function EventForm({
    className = '',
    event = null,
    isEditing = false,
}) {
    const { data, setData, post, put, errors, processing, recentlySuccessful } = useForm({
        titre: event?.titre || '',
        date: event?.date || '',
        heure_debut: event?.heure_debut || '',
        heure_fin: event?.heure_fin || '',
        lieu: event?.lieu || '',
        type_evenement: event?.type_evenement || 'Session de formation',
        contact_nom: event?.contact_nom || '',
        contact_email: event?.contact_email || '',
        contact_telephone: event?.contact_telephone || '',
        coviturage_possible: event?.coviturage_possible || 'non',
        dejeuner_prevu: event?.dejeuner_prevu || 'non',
        type_public: event?.type_public || 'Tout public',
        information_supplementaire: event?.information_supplementaire || '',
    });

    const submit = (e) => {
        e.preventDefault();

        if (isEditing) {
            put(route('events.update', event.id));
        } else {
            post(route('events.store'));
        }
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900">
                    {isEditing ? 'Modifier l\'événement' : 'Créer un nouvel événement'}
                </h2>

                <p className="mt-1 text-sm text-gray-600">
                    {isEditing 
                        ? 'Modifiez les informations de l\'événement ci-dessous.'
                        : 'Remplissez les informations pour créer un nouvel événement.'}
                </p>
            </header>

            <form onSubmit={submit} className="mt-6 space-y-6">
                <div>
                    <InputLabel htmlFor="titre" value="Titre de l'événement" />

                    <TextInput
                        id="titre"
                        className="mt-1 block w-full"
                        value={data.titre}
                        onChange={(e) => setData('titre', e.target.value)}
                        required
                        isFocused
                    />

                    <InputError className="mt-2" message={errors.titre} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <InputLabel htmlFor="date" value="Date" />

                        <TextInput
                            id="date"
                            type="date"
                            className="mt-1 block w-full"
                            value={data.date}
                            onChange={(e) => setData('date', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.date} />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <InputLabel htmlFor="heure_debut" value="Heure de début" />

                            <TextInput
                                id="heure_debut"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.heure_debut}
                                onChange={(e) => setData('heure_debut', e.target.value)}
                                required
                            />

                            <InputError className="mt-2" message={errors.heure_debut} />
                        </div>

                        <div>
                            <InputLabel htmlFor="heure_fin" value="Heure de fin" />

                            <TextInput
                                id="heure_fin"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.heure_fin}
                                onChange={(e) => setData('heure_fin', e.target.value)}
                                required
                            />

                            <InputError className="mt-2" message={errors.heure_fin} />
                        </div>
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="lieu" value="Lieu" />

                    <TextInput
                        id="lieu"
                        className="mt-1 block w-full"
                        value={data.lieu}
                        onChange={(e) => setData('lieu', e.target.value)}
                        required
                    />

                    <InputError className="mt-2" message={errors.lieu} />
                </div>

                <div>
                    <InputLabel htmlFor="type_evenement" value="Type d'événement" />

                    <select
                        id="type_evenement"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.type_evenement}
                        onChange={(e) => setData('type_evenement', e.target.value)}
                        required
                    >
                        <option value="Session de formation">Session de formation</option>
                        <option value="Action de visibilité">Action de visibilité</option>
                        <option value="Collecte">Collecte</option>
                        <option value="Action SDE">Action SDE</option>
                        <option value="Action Plaidoyer">Action Plaidoyer</option>
                        <option value="Réunion interne">Réunion interne</option>
                        <option value="Autre">Autre</option>
                    </select>

                    <InputError className="mt-2" message={errors.type_evenement} />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <InputLabel htmlFor="contact_nom" value="Nom du contact" />

                        <TextInput
                            id="contact_nom"
                            className="mt-1 block w-full"
                            value={data.contact_nom}
                            onChange={(e) => setData('contact_nom', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.contact_nom} />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_email" value="Email du contact" />

                        <TextInput
                            id="contact_email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.contact_email}
                            onChange={(e) => setData('contact_email', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.contact_email} />
                    </div>

                    <div>
                        <InputLabel htmlFor="contact_telephone" value="Téléphone du contact" />

                        <TextInput
                            id="contact_telephone"
                            className="mt-1 block w-full"
                            value={data.contact_telephone}
                            onChange={(e) => setData('contact_telephone', e.target.value)}
                            required
                        />

                        <InputError className="mt-2" message={errors.contact_telephone} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div>
                        <InputLabel htmlFor="type_public" value="Type de public" />

                        <select
                            id="type_public"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.type_public}
                            onChange={(e) => setData('type_public', e.target.value)}
                            required
                        >
                            <option value="Tout public">Tout public</option>
                            <option value="Familles">Familles</option>
                            <option value="Enfants">Enfants</option>
                            <option value="Etudiants">Etudiants</option>
                            <option value="Bénévoles">Bénévoles</option>
                            <option value="JA">JA</option>
                        </select>

                        <InputError className="mt-2" message={errors.type_public} />
                    </div>

                    <div>
                        <InputLabel htmlFor="coviturage_possible" value="Co-voiturage possible" />

                        <select
                            id="coviturage_possible"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.coviturage_possible}
                            onChange={(e) => setData('coviturage_possible', e.target.value)}
                            required
                        >
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>

                        <InputError className="mt-2" message={errors.coviturage_possible} />
                    </div>

                    <div>
                        <InputLabel htmlFor="dejeuner_prevu" value="Déjeuner prévu" />

                        <select
                            id="dejeuner_prevu"
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={data.dejeuner_prevu}
                            onChange={(e) => setData('dejeuner_prevu', e.target.value)}
                            required
                        >
                            <option value="oui">Oui</option>
                            <option value="non">Non</option>
                        </select>

                        <InputError className="mt-2" message={errors.dejeuner_prevu} />
                    </div>
                </div>

                <div>
                    <InputLabel htmlFor="information_supplementaire" value="Informations supplémentaires" />

                    <textarea
                        id="information_supplementaire"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={data.information_supplementaire}
                        onChange={(e) => setData('information_supplementaire', e.target.value)}
                        rows="4"
                    />

                    <InputError className="mt-2" message={errors.information_supplementaire} />
                </div>

                <div className="flex items-center gap-4">
                    <PrimaryButton disabled={processing}>
                        {isEditing ? 'Enregistrer les modifications' : 'Créer l\'événement'}
                    </PrimaryButton>

                    <Transition
                        show={recentlySuccessful}
                        enter="transition ease-in-out"
                        enterFrom="opacity-0"
                        leave="transition ease-in-out"
                        leaveTo="opacity-0"
                    >
                        <p className="text-sm text-gray-600">
                            Enregistré.
                        </p>
                    </Transition>
                </div>
            </form>
        </section>
    );
}
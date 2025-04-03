import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Create({ auth }) {
    const { data, setData, post, processing, errors } = useForm({
        title: '',
        description: '',
        date: '',
        time: '',
        location: '',
        contact_email: '',
        contact_phone: ''
    });

    const submit = (e) => {
        e.preventDefault();
        post('/events');
    };

    return (
        <MainLayout auth={auth} title="Créer un événement">
            <div className="max-w-2xl mx-auto">
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Créer un nouvel événement</h2>

                <form onSubmit={submit} className="space-y-6">
                    <div>
                        <InputLabel htmlFor="title" value="Titre" />
                        <TextInput
                            id="title"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.title}
                            onChange={(e) => setData('title', e.target.value)}
                            required
                        />
                        <InputError message={errors.title} className="mt-2" />
                    </div>

                    <div>
                        <InputLabel htmlFor="description" value="Description" />
                        <textarea
                            id="description"
                            className="mt-1 block w-full border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-md shadow-sm"
                            value={data.description}
                            onChange={(e) => setData('description', e.target.value)}
                            rows="6"
                            required
                        />
                        <InputError message={errors.description} className="mt-2" />
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
                            <InputError message={errors.date} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="time" value="Heure" />
                            <TextInput
                                id="time"
                                type="time"
                                className="mt-1 block w-full"
                                value={data.time}
                                onChange={(e) => setData('time', e.target.value)}
                                required
                            />
                            <InputError message={errors.time} className="mt-2" />
                        </div>
                    </div>

                    <div>
                        <InputLabel htmlFor="location" value="Lieu" />
                        <TextInput
                            id="location"
                            type="text"
                            className="mt-1 block w-full"
                            value={data.location}
                            onChange={(e) => setData('location', e.target.value)}
                            required
                        />
                        <InputError message={errors.location} className="mt-2" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <InputLabel htmlFor="contact_email" value="Email de contact" />
                            <TextInput
                                id="contact_email"
                                type="email"
                                className="mt-1 block w-full"
                                value={data.contact_email}
                                onChange={(e) => setData('contact_email', e.target.value)}
                                required
                            />
                            <InputError message={errors.contact_email} className="mt-2" />
                        </div>

                        <div>
                            <InputLabel htmlFor="contact_phone" value="Téléphone de contact" />
                            <TextInput
                                id="contact_phone"
                                type="tel"
                                className="mt-1 block w-full"
                                value={data.contact_phone}
                                onChange={(e) => setData('contact_phone', e.target.value)}
                                required
                            />
                            <InputError message={errors.contact_phone} className="mt-2" />
                        </div>
                    </div>

                    <div className="flex items-center justify-end">
                        <PrimaryButton className="ml-4" disabled={processing}>
                            Créer l'événement
                        </PrimaryButton>
                    </div>
                </form>
            </div>
        </MainLayout>
    );
}
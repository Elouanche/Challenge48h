import { Head, useForm, usePage } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState, useEffect } from 'react';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';

export default function Index({ auth, invitations = [] }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
    });
    
    const { flash } = usePage().props;
    const [showForm, setShowForm] = useState(false);
    const [invitationLink, setInvitationLink] = useState(null);
    const [invitationId, setInvitationId] = useState(null);
    
    useEffect(() => {
        if (flash && flash.invitationUrl && flash.invitationId) {
            setInvitationLink(flash.invitationUrl);
            setInvitationId(flash.invitationId);
        }
    }, [flash]);

    const submit = (e) => {
        e.preventDefault();
        post('/invitations', {
            onSuccess: () => {
                reset('email');
                setShowForm(false);
            },
        });
    };

    const resendInvitation = (id) => {
        post(`/invitations/${id}/resend`);
    };

    const deleteInvitation = (id) => {
        if (confirm('Êtes-vous sûr de vouloir supprimer cette invitation ?')) {
            post(`/invitations/${id}/delete`);
        }
    };

    return (
        <MainLayout auth={auth} title="Gestion des invitations">
            <div className="space-y-6">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-semibold text-gray-900">Gestion des invitations</h2>
                    {auth.user.role === 'admin' && (
                        <button
                            onClick={() => setShowForm(!showForm)}
                            className="inline-flex items-center px-4 py-2 bg-gray-800 border border-transparent rounded-md font-semibold text-xs text-white uppercase tracking-widest hover:bg-gray-700 focus:bg-gray-700 active:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition ease-in-out duration-150"
                        >
                            {showForm ? 'Annuler' : 'Nouvelle invitation'}
                        </button>
                    )}
                </div>

                {showForm && (
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-lg font-medium text-gray-900 mb-4">Inviter un nouvel utilisateur</h3>
                        <form onSubmit={submit} className="space-y-4">
                            <div>
                                <InputLabel htmlFor="email" value="Adresse email" />
                                <TextInput
                                    id="email"
                                    type="email"
                                    className="mt-1 block w-full"
                                    value={data.email}
                                    onChange={(e) => setData('email', e.target.value)}
                                    required
                                />
                                <InputError message={errors.email} className="mt-2" />
                            </div>

                            <div className="flex items-center justify-end">
                                <PrimaryButton className="ml-4" disabled={processing}>
                                    Envoyer l'invitation
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                )}
                
                {invitationLink && (
                    <div className="bg-green-50 p-4 rounded-lg shadow-md mb-6">
                        <h3 className="text-lg font-medium text-green-800 mb-2">Lien d'invitation généré</h3>
                        <p className="text-sm text-green-700 mb-2">
                            Comme l'envoi d'email ne fonctionne pas en local, vous pouvez copier et partager ce lien manuellement :
                        </p>
                        <div className="flex items-center">
                            <input 
                                type="text" 
                                value={invitationLink} 
                                readOnly 
                                className="flex-1 p-2 border border-green-300 rounded-md text-sm bg-white" 
                            />
                            <button 
                                onClick={() => {
                                    navigator.clipboard.writeText(invitationLink);
                                    alert('Lien copié dans le presse-papier !');
                                }}
                                className="ml-2 px-3 py-2 bg-green-600 text-white text-xs rounded-md hover:bg-green-700"
                            >
                                Copier
                            </button>
                        </div>
                    </div>
                )}

                <div className="overflow-x-auto bg-white rounded-lg shadow">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Email
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Statut
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Date d'expiration
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Lien d'invitation
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {invitations.map((invitation) => (
                                <tr key={invitation.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{invitation.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${invitation.used ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                                            {invitation.used ? 'Utilisée' : 'En attente'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">
                                            {invitation.expires_at ? new Date(invitation.expires_at).toLocaleDateString('fr-FR') : 'Pas d\'expiration'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {!invitation.used && (
                                            <div className="flex items-center space-x-2">
                                                <input
                                                    type="text"
                                                    value={`${window.location.origin}/register?token=${invitation.token}&email=${invitation.email}`}
                                                    readOnly
                                                    className="flex-1 p-1 text-xs border border-gray-300 rounded"
                                                />
                                                <button
                                                    onClick={() => {
                                                        navigator.clipboard.writeText(`${window.location.origin}/register?token=${invitation.token}&email=${invitation.email}`);
                                                        alert('Lien copié dans le presse-papier !');
                                                    }}
                                                    className="p-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                                >
                                                    Copier
                                                </button>
                                            </div>
                                        )}
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <div className="flex space-x-2">
                                            {!invitation.used && (
                                                <button
                                                    onClick={() => resendInvitation(invitation.id)}
                                                    className="text-indigo-600 hover:text-indigo-900"
                                                >
                                                    Renvoyer
                                                </button>
                                            )}
                                            <button
                                                onClick={() => deleteInvitation(invitation.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Supprimer
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {invitations.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucune invitation n'a été créée pour le moment.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
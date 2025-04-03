import { Head, useForm } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import { useState } from 'react';

export default function Index({ auth, users }) {
    const { data, setData, put, processing } = useForm();
    const [editingUser, setEditingUser] = useState(null);

    const updateRole = (userId, newRole) => {
        put(`/users/${userId}/role`, {
            role: newRole
        });
    };

    return (
        <MainLayout auth={auth} title="Gestion des utilisateurs">
            <div className="space-y-6">
                <h2 className="text-2xl font-semibold text-gray-900">Gestion des utilisateurs</h2>

                <div className="overflow-x-auto bg-white rounded-lg shadow">
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
                                    Rôle
                                </th>
                                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Actions
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {users.map((user) => (
                                <tr key={user.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm font-medium text-gray-900">{user.name}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <div className="text-sm text-gray-500">{user.email}</div>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap">
                                        <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                                            user.role === 'admin' 
                                                ? 'bg-red-100 text-red-800'
                                                : user.role === 'benevole'
                                                ? 'bg-green-100 text-green-800'
                                                : 'bg-gray-100 text-gray-800'
                                        }`}>
                                            {user.role}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        {editingUser === user.id ? (
                                            <div className="flex space-x-2">
                                                <select
                                                    className="rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                                                    value={user.role}
                                                    onChange={(e) => updateRole(user.id, e.target.value)}
                                                    disabled={processing}
                                                >
                                                    <option value="user">Utilisateur</option>
                                                    <option value="benevole">Bénévole</option>
                                                    <option value="admin">Administrateur</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    onClick={() => setEditingUser(null)}
                                                    className="text-gray-600 hover:text-gray-900"
                                                >
                                                    Annuler
                                                </button>
                                            </div>
                                        ) : (
                                            <button
                                                type="button"
                                                onClick={() => setEditingUser(user.id)}
                                                className="text-indigo-600 hover:text-indigo-900"
                                            >
                                                Modifier le rôle
                                            </button>
                                        )}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                {users.length === 0 && (
                    <div className="text-center py-12">
                        <p className="text-gray-500 text-lg">Aucun utilisateur trouvé.</p>
                    </div>
                )}
            </div>
        </MainLayout>
    );
}
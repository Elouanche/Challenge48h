import { Link } from '@inertiajs/react';
import GuestLayout from '@/Layouts/GuestLayout';

export default function InvalidInvitation() {
    return (
        <GuestLayout>
            <div className="mb-4 text-sm text-gray-600">
                <div className="mb-4 text-center">
                    <svg className="mx-auto h-12 w-12 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                    </svg>
                    <h2 className="mt-2 text-lg font-medium text-gray-900">Invitation invalide</h2>
                </div>
                <p className="text-center">
                    L'invitation que vous avez utilisée est invalide, a expiré ou a déjà été utilisée.
                </p>
                <p className="mt-4 text-center">
                    Veuillez contacter l'administrateur pour obtenir une nouvelle invitation.
                </p>
                <div className="mt-6 flex items-center justify-center">
                    <Link
                        href={route('login')}
                        className="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                    >
                        Retour à la page de connexion
                    </Link>
                </div>
            </div>
        </GuestLayout>
    );
}
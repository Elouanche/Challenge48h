import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="bg-white border-t border-gray-100">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">À propos</h3>
                        <p className="text-gray-600">
                            Plateforme de gestion d'événements pour les bénévoles et administrateurs.
                        </p>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Liens rapides</h3>
                        <ul className="space-y-2">
                            <li>
                                <Link
                                    href="/"
                                    className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                                >
                                    Accueil
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/dashboard"
                                    className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                                >
                                    Événements
                                </Link>
                            </li>
                            <li>
                                <Link
                                    href="/contact"
                                    className="text-gray-600 hover:text-gray-900 transition duration-150 ease-in-out"
                                >
                                    Contact
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Contact</h3>
                        <ul className="space-y-2 text-gray-600">
                            <li>Email: contact@example.com</li>
                            <li>Téléphone: +33 1 23 00 00 0 0 0 0 0 00 0 45 67 89</li>
                            <li>Adresse: 123 Rue Example, 75000 Paris</li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-gray-100">
                    <p className="text-center text-gray-500">
                        © {new Date().getFullYear()} Tous droits réservés
                    </p>
                </div>
            </div>
        </footer>
    );
}
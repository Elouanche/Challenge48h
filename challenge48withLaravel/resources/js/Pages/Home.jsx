import MainLayout from '@/Layouts/MainLayout';

export default function Home() {
    return (
        <MainLayout>
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg p-6">
                        <h1 className="text-2xl font-bold mb-4">Bienvenue sur l'application Événements</h1>
                        <p className="text-gray-600">Commencez par créer ou consulter les événements</p>
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
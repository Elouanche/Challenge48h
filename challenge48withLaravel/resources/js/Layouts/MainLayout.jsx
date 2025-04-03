import { Head, router } from '@inertiajs/react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { useEffect } from 'react';

export default function MainLayout({ auth, children, title = null }) {
    useEffect(() => {
        if (!auth?.user) {
            router.visit('/login');
        }
    }, [auth]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Head title={title} />
            <Header auth={auth} />

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">
                            {children}
                        </div>
                    </div>
                </div>
            </main>

            <Footer />
        </div>
    );
}
import { Head } from '@inertiajs/react';
import MainLayout from '@/Layouts/MainLayout';
import UpdateEventForm from './Partials/UpdateEventForm';

export default function Edit({ auth, event }) {
    return (
        <MainLayout auth={auth} title="Modifier un événement">

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8">
                        <UpdateEventForm 
                            event={event}
                            className="max-w-xl"
                        />
                    </div>
                </div>
            </div>
        </MainLayout>
    );
}
import { Head, router,Link } from "@inertiajs/react";
import { useState, useEffect } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import Footer from "@/Components/Footer";
import Header from "@/Components/Header";



export default function MainLayout({ auth, children, title = null }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);
    
    useEffect(() => {
        if (!auth?.user) {
            router.visit("/login");
        }
    }, [auth]);

    return (
        <div className="min-h-screen bg-gray-100">
            <Header auth={auth} title={title} />
            

            <main className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900">{children}</div>
                    </div>
                </div>
            </main>
            <footer className="bg-gray-100">
                <Footer />
            </footer>
        </div>
    )
}

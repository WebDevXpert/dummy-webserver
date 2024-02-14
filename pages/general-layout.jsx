import { useSession, getSession } from 'next-auth/react';
import Header from '@/components/Header';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';

const GeneralLayout = ({ children }) => {
    const { data: session, status } = useSession();
    const router = useRouter();

    useEffect(() => {
        const checkAuth = async () => {
            const userSession = await getSession();
            if (!userSession && !['/login', '/register'].includes(router.pathname)) {
                router.replace('/login');
            }
        };

        checkAuth();
    }, [session, router]);

    if (status === 'loading') {
        return <p>Loading...</p>;
    }

    return (
        <>
            {/* <Header /> */}
            <main>{children}</main>
        </>
    );
};

export default GeneralLayout;

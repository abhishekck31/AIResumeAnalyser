// ...existing code...
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { usePuterStore } from "~/lib/puter";

export const meta = () => ([
    { title: 'Resumind | Auth ' },
    { name: 'description', content: 'Log into your account' },
]);

const Auth = () => {
    const { isLoading, auth } = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next);
    }, [auth.isAuthenticated, next])

    return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover flex items-center justify-center w-full min-h-screen mb-24">
            <div className="gradient-border shadow-lg max-w-md w-full mx-auto">
                <section className="flex flex-col gap-6 bg-white rounded-2xl p-6">
                    <div className="flex flex-col items-center gap-1 text-center">
                        <h1 className="text-3xl font-bold">Welcome</h1>
                        <h2 className="text-base">Log In to Continue Your Job Journey</h2>
                    </div>
                    <div>
                        {isLoading ? (
                            <button className="auth-button animate-pulse w-full">
                                <p className="text-lg">Signing you in...</p>
                            </button>
                        ) : (
                            <>
                                {auth.isAuthenticated ? (
                                    <button className="auth-button w-full" onClick={auth.signOut}>
                                        <p className="text-lg">Log Out</p>
                                    </button>
                                ) : (
                                    <button className="auth-button w-full" onClick={auth.signIn}>
                                        <p className="text-lg">Log In</p>
                                    </button>
                                )}
                            </>
                        )}
                    </div>
                </section>
            </div>
        </main>
    )
}

export default Auth;
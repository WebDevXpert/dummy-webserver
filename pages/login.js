import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import Layout from '../layout/layout';
import styles from '../styles/Form.module.css';
import { useState, useEffect } from 'react';
import { useFormik } from 'formik';
import { useRouter } from 'next/navigation';
import login_validate from '../lib/validate';
import { getSession, signIn, useSession } from "next-auth/react"
import { HiAtSymbol, HiFingerPrint } from 'react-icons/hi';
import { toast } from 'react-toastify';

export default function Login() {
    const apiUrl = process.env.NEXT_PUBLIC_API_BASE_URL || '';
    const { data: session } = useSession();
    const router = useRouter();
    const [showMessage, setShowMessage] = useState(false);

    useEffect(() => {
        const checkSession = async () => {
            const userSession = await getSession();
            if (userSession) {
                setTimeout(() => {
                    setShowMessage(true);
                }, 1000);
                setTimeout(() => {
                    router.push('/');
                    router.push(apiUrl);
                    setShowMessage(false)
                }, 1000);
            }
        };

        checkSession();
    }, [router]);

    const [show, setShow] = useState(false);

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validate: login_validate,
        onSubmit: async (values) => {
            const status = await signIn('credentials', {
                redirect: false,
                email: values.email,
                password: values.password,
                callbackUrl: '/',
            });

            if (status.ok) {
                router.push(apiUrl);
                toast.success("User logged in")
            } else {
                console.log("status.error", status.error)
                toast.error(status.error)
            }
        },
    });

    // // Google Handler function
    // async function handleGoogleSignin() {
    //     signIn('google', { callbackUrl: "http://localhost:3000" })
    // }

    // // Github Login 
    // async function handleGithubSignin() {
    //     signIn('github', { callbackUrl: "http://localhost:3000" })
    // }

    return (
        <Layout>

            <Head>
                <title>Login</title>
            </Head>

            {session ? (
                <div>
                    {showMessage && <p>You are already logged in.</p>}
                </div>
            ) : (
                <>
                    <div className='title my-3'>
                        <h1 className='dark:bg-dark dark:text-white text-gray-800 text-4xl font-bold py-4'>Login</h1>
                        <p className='mx-auto text-gray-400'>
                            Welcome to Carbonops! <br /> Please log in here!
                        </p>
                    </div>
                    <section className='w-3/3 mx-auto flex flex-col gap-10'>
                        <form className='dark:bg-dark dark:text-white flex flex-col gap-5' onSubmit={formik.handleSubmit}>
                            <div className={`${styles.input_group} ${formik.errors.email && formik.touched.email ? 'border-rose-600 ' : ''}`}>
                                <input
                                    type='email'
                                    name='email'
                                    placeholder='Email'
                                    className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white'
                                    {...formik.getFieldProps('email')}
                                />
                                <span className='icon flex items-center px-4'>
                                    <HiAtSymbol size={25} />
                                </span>
                            </div>
                            {formik.errors.email && formik.touched.email ? (
                                <span className='text-rose-500 text-left'>{formik.errors.email}</span>
                            ) : (
                                <></>
                            )}

                            <div className={`${styles.input_group} ${formik.errors.password && formik.touched.password ? 'border-rose-600' : ''}`}>
                                <input
                                    type={`${show ? 'text' : 'password'}`}
                                    name='password'
                                    placeholder='password'
                                    className='w-full p-2 border rounded-md focus:outline-none focus:border-blue-500 dark:bg-light-gray dark:text-white'

                                    {...formik.getFieldProps('password')}
                                />
                                <span className='icon flex items-center px-4' onClick={() => setShow(!show)}>
                                    <HiFingerPrint size={25} />
                                </span>
                            </div>
                            {formik.errors.password && formik.touched.password ? (
                                <span className='text-rose-500 text-left'>{formik.errors.password}</span>
                            ) : (
                                <></>
                            )}

                            <div className='input-button'>
                                <button type='submit' className={styles.button}>
                                    Login
                                </button>
                            </div>
                            {/* <div className="input-button">
                        <button type='button' onClick={handleGoogleSignin} className={styles.button_custom}>
                            Sign In with Google <Image src={'/assets/google.svg'} width="20" height={20} ></Image>
                        </button>
                    </div>
                    <div className="input-button">
                        <button type='button' onClick={handleGithubSignin} className={styles.button_custom}>
                            Sign In with Github <Image src={'/assets/github.svg'} width={25} height={25}></Image>
                        </button>
                    </div> */}
                        </form>

                        <p className='text-left text-gray-400 '>
                            Don't have an account yet? <Link href='/register' className='text-blue-700'>
                                Sign Up
                            </Link>
                        </p>
                    </section>
                </>
            )}
        </Layout>
    );
}
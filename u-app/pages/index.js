'use client'
import Head from 'next/head';
import classes from '../styles/RegisterPage.module.css';
import { motion } from "motion/react";
import Link from 'next/link';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

async function postData(data) {
  const response = await fetch('http://127.0.0.1:8000/register_login/login/', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data), 
  });

  if (!response.ok) {
    const error = new Error('An error occurred while logging in');
    error.code = response.status;
    error.info = await response.json();
    throw error;
  }

  const result = await response.json();
  return result;
}

async function setSessionCookie(user) {
  try {
    const response = await fetch('./api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to set session cookie');
    }

    console.log('Session cookie set successfully!');
  } catch (err) {
    console.error('Error setting session cookie:', err);
    throw err;
  }
}

export default function Login() {
  const router = useRouter();

  const { mutate, error, isError, isPending } = useMutation({
    mutationFn: postData,
    onSuccess: async (user) => {
      try {
        await setSessionCookie(user);
        console.log('Session cookie set! Redirecting...');
        router.push('/home'); 
      } catch (err) {
        console.error('Error during post-login:', err);
      }
    },
  });

  function handleSubmit(event) {
    event.preventDefault();

    const data = {
      username: event.target.username.value,
      password: event.target.password.value,
    };
    mutate(data); 
  }

  return (
    <div className={classes.register}>
      <Head>
        <title>UApp</title>
        <link rel="icon" href="./logo.ico" />
      </Head>
      <motion.div className={classes.content} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <h1 className={classes.header}>Welcome to UApp</h1>
        <form className={classes.form} onSubmit={handleSubmit}>
          <input className={classes.input} placeholder="Username" name="username" required type="text" />
          <input className={classes.input} placeholder="Password" name="password" required type="password" />
          <motion.button whileHover={{ scale: 1.05 }} transition={{ type: 'tween' }} className={classes.button} disabled={isPending}>
            {isPending ? "Logging In" : "Login"}
          </motion.button>

          {isError && <p className={classes.error_message}>{`*${error.info?.message || "Login failed"}*`}</p>}
        </form>
        <Link className={classes.link} href={'/register'}>Don't have an account? Click here</Link>
      </motion.div>
    </div>
  );
}

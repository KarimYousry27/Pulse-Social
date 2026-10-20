import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { Button, Input, Select, SelectItem } from '../components/ui';
import { Controller, useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { authApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { loginSchema, signupSchema } from '../schemas/auth';

const labels = {
  name: 'Full name', username: 'Username', email: 'Email',
  dateOfBirth: 'Date of birth', password: 'Password',
  rePassword: 'Confirm password',
};

const signupDefaults = {
  name: '', username: '', email: '', dateOfBirth: '',
  gender: 'male', password: '', rePassword: '',
};

export default function AuthPage({ signup = false }) {
  const navigate = useNavigate();
  const { token, login } = useAuth();
  const [serverError, setServerError] = useState('');
  const [busy, setBusy] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(signup ? signupSchema : loginSchema),
    defaultValues: signup ? signupDefaults : { email: '', password: '' },
  });

  if (token) return <Navigate to="/feed" replace />;

  const fields = signup
    ? ['name', 'username', 'email', 'dateOfBirth', 'gender', 'password', 'rePassword']
    : ['email', 'password'];

  async function onSubmit(values) {
    setBusy(true);
    setServerError('');
    try {
      const result = signup ? await authApi.signup(values) : await authApi.signin(values);
      const newToken = result?.token || result?.data?.token || result?.accessToken || result?.data?.accessToken;
      if (!newToken) throw new Error('The server did not return an authentication token.');
      login(newToken);
      navigate('/feed', { replace: true });
    } catch (error) {
      setServerError(error.message || 'Unable to sign in. Please try again.');
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-gradient-to-br from-slate-200 via-white to-sky-100 px-4 py-12">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-xl sm:p-9">
        <Link to="/login" className="text-3xl font-black tracking-tight text-slate-950">
          ✦ pulse<span className="text-sky-600">.</span>
        </Link>
        <h1 className="mt-7 text-2xl font-extrabold text-slate-950">
          {signup ? 'Create your account' : 'Welcome back'}
        </h1>
        <p className="muted mt-1">
          {signup ? 'Join the conversation today.' : 'Sign in to see what is new.'}
        </p>

        <form className="mt-7 space-y-4" onSubmit={handleSubmit(onSubmit)} noValidate>
          {fields.map((name) => (
            <Controller
              key={name}
              name={name}
              control={control}
              render={({ field }) => name === 'gender' ? (
                <Select
                  label="Gender"
                  labelPlacement="outside"
                  variant="bordered"
                  selectedKeys={[field.value]}
                  onSelectionChange={(keys) => field.onChange(Array.from(keys)[0] || '')}
                  isInvalid={Boolean(errors[name])}
                  errorMessage={errors[name]?.message}
                  className="w-full"
                >
                  <SelectItem value="male">Male</SelectItem>
                  <SelectItem value="female">Female</SelectItem>
                </Select>
              ) : (
                <Input
                  {...field}
                  label={labels[name]}
                  labelPlacement="outside"
                  placeholder={name === 'dateOfBirth' ? 'YYYY-MM-DD' : `Enter ${labels[name].toLowerCase()}`}
                  type={name.toLowerCase().includes('password') ? 'password' : name === 'email' ? 'email' : name === 'dateOfBirth' ? 'date' : 'text'}
                  variant="bordered"
                  radius="lg"
                  className="w-full"
                  classNames={{
                    inputWrapper: 'w-full min-h-12 rounded-xl border-2 border-slate-200 bg-white shadow-none hover:border-slate-400',
                    input: 'text-slate-950',
                  }}
                  isInvalid={Boolean(errors[name])}
                  errorMessage={errors[name]?.message}
                />
              )}
            />
          ))}
          {serverError && <p role="alert" className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{serverError}</p>}
          <Button
            type="submit"
            radius="lg"
            isLoading={busy}
            className="min-h-12 w-full rounded-xl bg-slate-950 font-bold text-white hover:bg-slate-800"
          >
            {signup ? 'Create account' : 'Sign in'}
          </Button>
        </form>
        <p className="mt-6 text-center text-sm text-slate-500">
          {signup ? 'Already have an account?' : 'New to Pulse?'}{' '}
          <Link className="font-bold text-slate-900 hover:underline" to={signup ? '/login' : '/register'}>
            {signup ? 'Sign in' : 'Create account'}
          </Link>
        </p>
      </div>
    </main>
  );
}

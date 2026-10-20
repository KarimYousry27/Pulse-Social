import { Spinner } from './ui';
export function Loading() { return <div className="flex justify-center py-16"><Spinner color="secondary" label="Loading..."/></div>; }
export function Message({ children }) { return <div className="surface p-8 text-center text-slate-500">{children}</div>; }
export function ErrorText({ error }) { return error ? <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-700">{error.message || String(error)}</p> : null; }

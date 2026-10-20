import React from 'react';
import { Button as HeroButton } from '@heroui/react';

// A small adapter keeps our application code simple while using HeroUI v3.
export function Button({ children, onPress, onClick, isLoading, isDisabled, startContent, isIconOnly, as: As, to, color, variant, className = '', type = 'button', ...rest }) {
  const styles = variant === 'light' ? 'bg-transparent text-slate-700 hover:bg-slate-100' : variant === 'bordered' ? 'border border-slate-300 bg-white text-slate-900' : 'bg-slate-950 text-white hover:bg-slate-800';
  if (As && to) return <As to={to} className={`inline-flex items-center justify-center gap-2 rounded-xl px-3 py-2 font-semibold ${styles} ${className}`}>{startContent}{children}</As>;
  return <HeroButton type={type} isDisabled={isDisabled || isLoading} onPress={onPress || onClick} className={`inline-flex min-h-9 items-center justify-center gap-2 rounded-xl px-3 py-2 font-semibold ${styles} ${className}`} {...rest}>{isLoading ? 'Loading...' : <>{startContent}{children}</>}</HeroButton>;
}

export const Input = React.forwardRef(function Input({ label, labelPlacement, value, onValueChange, onChange, isInvalid, errorMessage, classNames, className = '', ...props }, ref) {
  return <label className={`block w-full text-sm font-medium text-slate-800 ${className}`}>
    {label && <span className="mb-1.5 block">{label}</span>}
    <input ref={ref} value={value ?? ''} onChange={e => { onChange?.(e); onValueChange?.(e.target.value); }} className={`w-full min-h-11 rounded-xl border bg-white px-3 py-2 text-slate-950 outline-none focus:border-sky-600 focus:ring-2 focus:ring-sky-100 ${isInvalid ? 'border-red-500' : 'border-slate-300'} ${classNames?.inputWrapper || ''}`} {...props} />
    {isInvalid && errorMessage && <span className="mt-1 block text-xs text-red-600">{errorMessage}</span>}
  </label>;
});
export function Textarea({ value, onValueChange, minRows = 2, ...props }) { return <textarea rows={minRows} value={value} onChange={e => onValueChange?.(e.target.value)} className="w-full rounded-xl border border-slate-300 bg-slate-50 p-3 outline-none focus:border-sky-600" {...props} />; }
export function Select({ children, label, selectedKeys, onSelectionChange, isInvalid, errorMessage, ...props }) { return <label className="block w-full text-sm font-medium text-slate-800"><span className="mb-1.5 block">{label}</span><select className="min-h-11 w-full rounded-xl border border-slate-300 bg-white px-3" value={selectedKeys?.[0] || ''} onChange={e => onSelectionChange?.(new Set([e.target.value]))}>{children}</select>{isInvalid && <span className="text-xs text-red-600">{errorMessage}</span>}</label>; }
export function SelectItem({ children, ...props }) { return <option value={props.value || props.itemKey || props.id || props['data-key'] || props.children?.toLowerCase()}>{children}</option>; }
export function Dropdown({ children }) { return <div className="relative">{children}</div>; }
export function DropdownTrigger({ children }) { return <div>{children}</div>; }
export function DropdownMenu({ children }) { return <div className="flex gap-2">{children}</div>; }
export function DropdownItem({ children, onPress, ...props }) { return <button type="button" onClick={onPress} className="rounded-lg px-2 py-1 text-xs hover:bg-slate-100">{children}</button>; }
export function Spinner({ label = 'Loading...' }) { return <span role="status" className="text-sm text-slate-500">{label}</span>; }
export function HeroAvatar({ src, name, size }) { return src ? <img src={src} alt={name || 'Avatar'} className={`rounded-full object-cover ${size === 'lg' ? 'h-20 w-20' : size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'}`} /> : <span className={`inline-flex shrink-0 items-center justify-center rounded-full bg-slate-200 font-bold text-slate-900 ${size === 'lg' ? 'h-20 w-20' : size === 'sm' ? 'h-8 w-8' : 'h-11 w-11'}`}>{name || '?'}</span>; }

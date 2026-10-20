import { HeroAvatar } from './ui';
import { avatar, displayName } from '../utils/data';
export default function Avatar({ user, size = 'md' }) { return <HeroAvatar size={size} src={avatar(user)} name={displayName(user).slice(0,2).toUpperCase()} className="shrink-0 bg-slate-200 text-slate-950"/>; }

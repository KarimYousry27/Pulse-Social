import { Search } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi } from '../api/services';
import { listFrom, displayName } from '../utils/data';
import Avatar from '../components/Avatar';
import { Loading, ErrorText, Message } from '../components/Feedback';
function Person({person}) { const client=useQueryClient(); const id=person._id||person.id; const [following,setFollowing]=useState(Boolean(person.isFollowing)); useEffect(()=>setFollowing(Boolean(person.isFollowing)),[person.isFollowing]); const follow=useMutation({mutationFn:()=>usersApi.follow(id),onSuccess:()=>{setFollowing(v=>!v);client.invalidateQueries({queryKey:['profile']});client.invalidateQueries({queryKey:['suggestions']});}}); return <div className="flex items-center gap-3 border-b py-4 last:border-0"><Avatar user={person}/><Link to={`/users/${id}`} className="min-w-0 flex-1"><p className="truncate font-bold text-slate-100">{displayName(person)}</p><p className="muted truncate">@{person.username||'member'}</p></Link><Button color="secondary" variant="flat" size="sm" isLoading={follow.isPending} onPress={()=>follow.mutate()}>{following?'Following':'Follow'}</Button></div>; }
export default function SuggestionsPage() { const query=useQuery({queryKey:['suggestions'],queryFn:usersApi.suggestions}); const [search,setSearch]=useState(''); const people=listFrom(query.data).filter(person=>`${displayName(person)} ${person.username||''}`.toLowerCase().includes(search.toLowerCase())); return <div><h1 className="page-title mb-5">People to follow 👋</h1><label className="search-field"><Search size={18}/><input aria-label="Search people" placeholder="Search suggested people..." value={search} onChange={e=>setSearch(e.target.value)}/></label><div className="surface p-5">{query.isLoading?<Loading/>:query.isError?<ErrorText error={query.error}/>:people.length?people.map(p=><Person key={p._id||p.id} person={p}/>):<Message>No suggestions available.</Message>}</div></div>; }

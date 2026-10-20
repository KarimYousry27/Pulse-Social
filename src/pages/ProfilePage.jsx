import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { Button } from '../components/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { usersApi, authApi } from '../api/services';
import { useAuth } from '../context/AuthContext';
import { listFrom, itemFrom, displayName } from '../utils/data';
import Avatar from '../components/Avatar';
import PostCard from '../components/PostCard';
import { Loading, ErrorText, Message } from '../components/Feedback';
// Profile responses can contain either populated user objects or only user IDs.
function PeopleEntry({ entry }) {
  const id = typeof entry === 'string' ? entry : entry?._id || entry?.id;
  const needsLookup = Boolean(id) && (typeof entry === 'string' || (!entry?.name && !entry?.username));
  const lookup = useQuery({
    queryKey: ['people-profile', id],
    queryFn: () => usersApi.profile(id),
    enabled: needsLookup,
    staleTime: 60_000,
    retry: 1,
  });
  const person = needsLookup && lookup.data ? itemFrom(lookup.data) : entry;
  const name = typeof person === 'object' ? displayName(person) : '';
  if (!id) return null;
  return <Link to={`/users/${id}`} className="flex items-center gap-3 rounded-lg px-2 py-2 text-slate-100 transition-colors hover:bg-[#203653] hover:text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-sky-400">
    {typeof person === 'object' && <Avatar user={person} size="sm" />}
    <span className="min-w-0 truncate font-medium">{name && name !== 'Community member' ? name : lookup.isLoading ? 'Loading user...' : 'View profile'}</span>
  </Link>;
}

// The public profile API does not consistently provide isFollowing.
// Compare IDs against the signed-in user's following list instead.
function personId(value) {
  return typeof value === 'string' ? value : value?._id || value?.id || value?.user?._id || value?.user?.id;
}

export default function ProfilePage() { const {id}=useParams(); const [peoplePanel,setPeoplePanel]=useState(null); const [followOverride,setFollowOverride]=useState(null); useEffect(()=>setFollowOverride(null),[id]); const {user,refreshUser}=useAuth(); const client=useQueryClient(); const mine=!id || id===(user?._id||user?.id); const profile=useQuery({queryKey:['profile',id||'me'],queryFn:()=>mine?authApi.me():usersApi.profile(id)}); const posts=useQuery({queryKey:['profile','posts',id||user?._id],queryFn:()=>usersApi.posts(id||user?._id||user?.id),enabled:!!(id||user?._id||user?.id)}); const follow=useMutation({mutationFn:()=>usersApi.follow(id),onMutate:()=>{const previous=isFollowing; setFollowOverride(!previous); return {previous};},onError:(_error,_variables,context)=>{setFollowOverride(context?.previous ?? null);},onSuccess:async()=>{await Promise.allSettled([refreshUser(),client.invalidateQueries({queryKey:['profile']})]);}}); const upload=useMutation({mutationFn:authApi.uploadPhoto,onSuccess:()=>{refreshUser();client.invalidateQueries({queryKey:['profile']});}}); if(profile.isLoading)return <Loading/>; if(profile.isError)return <ErrorText error={profile.error}/>; const person=itemFrom(profile.data);
  const myFollowing = Array.isArray(user?.following) ? user.following : [];
  const listedAsFollowing = myFollowing.some(entry => personId(entry) === id);
  const listedAsFollower = Array.isArray(person?.followers) && person.followers.some(entry => personId(entry) === personId(user));
  const followingFromApi = typeof person?.isFollowing === 'boolean' ? person.isFollowing : false;
  const isFollowing = followOverride ?? (listedAsFollowing || listedAsFollower || followingFromApi);
  return <div><div className="surface mb-5 p-6"><div className="flex flex-wrap items-center gap-4"><Avatar user={person} size="lg"/><div className="min-w-0 flex-1"><h1 className="page-title">{displayName(person)}</h1><p className="muted">@{person.username||'member'}</p><p className="muted mt-1">{person.email||''}</p></div>{mine?<label className="cursor-pointer rounded-xl bg-slate-100 px-4 py-2 text-sm font-bold text-slate-900">{upload.isPending?'Uploading...':'Change photo'}<input type="file" accept="image/*" className="hidden" onChange={e=>e.target.files?.[0]&&upload.mutate(e.target.files[0])}/></label>:<Button color="secondary" isLoading={follow.isPending} onPress={()=>follow.mutate()}>{isFollowing?'Unfollow':'Follow'}</Button>}</div><div className="mt-5 flex gap-6 border-t pt-4 text-sm text-slate-600"><button type="button" className="hover:text-sky-300" onClick={()=>setPeoplePanel(peoplePanel==='followers'?null:'followers')}><b>{person.followersCount??person.followers?.length??0}</b> followers</button><button type="button" className="hover:text-sky-300" onClick={()=>setPeoplePanel(peoplePanel==='following'?null:'following')}><b>{person.followingCount??person.following?.length??0}</b> following</button></div>{peoplePanel&&<div className="mt-4 rounded-xl border border-slate-700 p-3"><h3 className="mb-2 font-semibold capitalize">{peoplePanel}</h3>{Array.isArray(person[peoplePanel])?person[peoplePanel].length?person[peoplePanel].map((p,i)=><PeopleEntry key={(typeof p === 'string' ? p : p?._id || p?.id) || i} entry={p}/>):<p className="muted">No users yet.</p>:<p className="muted">This list is not provided by the profile response.</p>}</div>}<ErrorText error={upload.error||follow.error}/></div><h2 className="mb-4 text-lg font-extrabold">Posts</h2>{posts.isLoading?<Loading/>:posts.isError?<ErrorText error={posts.error}/>:listFrom(posts.data).length?listFrom(posts.data).map(post=><PostCard key={post._id||post.id} post={post}/>):<Message>No posts yet.</Message>}</div>; }

import { useState } from 'react';
import { Search } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { usersApi } from '../api/services';
import { listFrom } from '../utils/data';
import PostCard from '../components/PostCard';
import { Loading, ErrorText, Message } from '../components/Feedback';
export default function BookmarksPage() { const query=useQuery({queryKey:['bookmarks'],queryFn:usersApi.bookmarks}); const [search,setSearch]=useState(''); const saved=listFrom(query.data).filter(item=>`${item.post?.body||item.body||item.content||''}`.toLowerCase().includes(search.toLowerCase())); return <div><h1 className="page-title mb-5">Saved posts 🔖</h1><label className="search-field"><Search size={18}/><input aria-label="Search saved posts" placeholder="Search saved posts..." value={search} onChange={e=>setSearch(e.target.value)}/></label>{query.isLoading?<Loading/>:query.isError?<ErrorText error={query.error}/>:saved.length?saved.map(p=><PostCard key={p._id||p.id} post={p.post||p} initiallyBookmarked/>):<Message>You haven't bookmarked any posts.</Message>}</div>; }

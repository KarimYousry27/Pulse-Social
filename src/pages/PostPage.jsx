import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { postsApi } from '../api/services';
import { itemFrom } from '../utils/data';
import PostCard from '../components/PostCard';
import CommentSection from '../components/CommentSection';
import { Loading, ErrorText } from '../components/Feedback';
export default function PostPage() { const {id}=useParams(); const query=useQuery({queryKey:['posts','one',id],queryFn:()=>postsApi.one(id)}); return <div><Link to="/feed" className="mb-5 inline-block text-sm font-bold text-slate-100">← Back to feed</Link>{query.isLoading?<Loading/>:query.isError?<ErrorText error={query.error}/>:<><PostCard post={itemFrom(query.data)}/><div id="comments"><CommentSection postId={id}/></div></>}</div>; }

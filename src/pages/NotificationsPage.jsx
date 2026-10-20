import { useNavigate } from 'react-router-dom';
import { Button } from '../components/ui';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { notificationsApi } from '../api/services';
import { listFrom, timeAgo } from '../utils/data';
import { Loading, ErrorText, Message } from '../components/Feedback';
import { Heart, MessageCircle, UserPlus, Bell } from 'lucide-react';

const asId = value => {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return asId(value._id || value.id);
  return null;
};
const notificationType = n => String(n.type || n.notificationType || '').toLowerCase();
const postFor = n => asId((n.entityType === 'post' && n.entityId) || n.postId || n.post || n.targetPost || n.relatedPost || (n.entityType === 'post' && n.entity) || n.entity?.post || n.data?.postId || n.data?.post || n.metadata?.postId || n.metadata?.post || (['post','comment'].includes(n.targetType) ? n.targetId : null));
const senderFor = n => asId(n.sender || n.actor || n.fromUser || n.user || n.senderId || n.actorId);
const labelFor = n => {
  const type = notificationType(n);
  const sender = n.sender?.name || n.actor?.name || n.sender?.username || n.actor?.username || 'Someone';
  if (type.includes('follow')) return `${sender} started following you`;
  if (type.includes('reply')) return `${sender} replied to your comment`;
  if (type.includes('comment')) return `${sender} commented on your post`;
  if (type.includes('like')) return `${sender} liked your post`;
  return n.message || n.content || 'New notification';
};
const IconFor = ({type}) => type.includes('follow') ? <UserPlus size={19}/> : type.includes('comment') || type.includes('reply') ? <MessageCircle size={19}/> : type.includes('like') ? <Heart size={19}/> : <Bell size={19}/>;

export default function NotificationsPage() {
  const navigate = useNavigate();
  const client = useQueryClient();
  const query = useQuery({queryKey:['notifications'], queryFn:notificationsApi.all});
  const refresh = () => {client.invalidateQueries({queryKey:['notifications']});client.invalidateQueries({queryKey:['notification-count']});};
  const mark = useMutation({mutationFn:notificationsApi.read, onSuccess:refresh});
  const all = useMutation({mutationFn:notificationsApi.readAll, onSuccess:refresh});
  const openNotification = n => {
    if (!n.isRead) mark.mutate(n._id || n.id);
    const type = notificationType(n);
    if (type.includes('follow')) {
      const userId = senderFor(n);
      if (userId) navigate(`/users/${userId}`);
      return;
    }
    const postId = postFor(n);
    if (postId) navigate(`/posts/${postId}${type.includes('comment') || type.includes('reply') ? '#comments' : ''}`);
    // Never fall back to a sender's profile for post notifications:
    // it is unrelated to the post the user expects to see.
  };
  const notifications = listFrom(query.data);
  return <div>
    <div className="mb-5 flex items-center justify-between gap-3">
      <h1 className="page-title">Notifications 🔔</h1>
      <Button size="sm" color="secondary" variant="flat" isLoading={all.isPending} onPress={()=>all.mutate()}>Mark all read</Button>
    </div>
    <div className="surface p-5">
      {query.isLoading ? <Loading/> : query.isError ? <ErrorText error={query.error}/> : notifications.length ? notifications.map(n => <button
        key={n._id || n.id}
        type="button"
        onClick={()=>openNotification(n)}
        className={`flex w-full items-start gap-3 border-b border-slate-700 px-2 py-4 text-left last:border-0 hover:bg-slate-800/50 ${n.isRead ? 'opacity-70' : ''}`}>
        <span className="mt-1 text-sky-400"><IconFor type={notificationType(n)}/></span>
        <span><span className="block font-semibold text-slate-100">{labelFor(n)}</span>
        <span className="muted mt-1 block">{timeAgo(n.createdAt)} {!n.isRead && '· Tap to mark read'}</span></span>
      </button>) : <Message>You're all caught up!</Message>}
    </div>
  </div>;
}

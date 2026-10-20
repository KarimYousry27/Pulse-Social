export function listFrom(response) { const data = response?.data ?? response; if (Array.isArray(data)) return data; return data?.suggestions || data?.posts || data?.comments || data?.users || data?.notifications || data?.bookmarks || data?.replies || data?.items || data?.results || []; }
export function itemFrom(response) { return response?.data?.post || response?.data?.user || response?.data || response; }
export function displayName(user) { return user?.name || user?.username || 'Community member'; }
export function avatar(user) { return user?.photo || user?.profilePhoto || user?.profilePicture || user?.avatar || ''; }
export function owner(post) { return post?.user || post?.author || post?.createdBy || {}; }
export function timeAgo(date) { if (!date) return ''; const t = new Date(date).getTime(); if (!Number.isFinite(t)) return ''; const mins = Math.max(1,Math.floor((Date.now()-t)/60000)); return mins<60 ? `${mins}m ago` : mins<1440 ? `${Math.floor(mins/60)}h ago` : `${Math.floor(mins/1440)}d ago`; }
export function errorMessage(error) { return error?.message || 'Something went wrong'; }

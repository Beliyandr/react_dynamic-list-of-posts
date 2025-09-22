import { Post } from '../../types/Post';
import { client } from '../../utils/fetchClient';

export async function getUserPosts(userId: number) {
  return client.get<Post[]>(`/posts?userId=${userId}`);
}

export async function deleteUserPosts(userId: number) {
  return client.delete(`/posts?userId=${userId}`);
}

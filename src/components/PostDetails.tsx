import React, { FC, useEffect, useState } from 'react';
import { Loader } from './Loader';
import { NewCommentForm } from './NewCommentForm';
import { Post } from '../types/Post';
import { addPostComment, getPostComments } from './services/comments';
import { Comment, CommentData } from '../types/Comment';
import { client } from '../utils/fetchClient';

type Props = {
  activePost: Post;
};

export const PostDetails: FC<Props> = ({ activePost }) => {
  const [loading, setLoading] = useState(true);
  const [comments, setComments] = useState<Comment[]>([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [isActiveWriteComment, setIsActiveWriteComment] = useState(false);

  useEffect(() => {
    if (activePost) {
      getComments();
      setIsActiveWriteComment(false);
    }
    console.log(comments);
  }, [activePost]);

  const getComments = async () => {
    if (!activePost) {
      return;
    }

    setLoading(true);
    try {
      const gotComments = await getPostComments(activePost.id);

      setComments(gotComments);
    } catch (error) {
      setErrorMessage('Something went wrong!');
    } finally {
      setLoading(false);
    }
  };

  const deletePost = async (commentId: number) => {
    setComments(currentComment =>
      currentComment.filter(comment => comment.id !== commentId),
    );

    return client.delete(String(commentId)).catch(error => {
      setComments(comments);
      setErrorMessage(`Can't Delete a comment`);
      throw error;
    });
  };

  const addComment = async (comment: CommentData) => {
    const newComment = { ...comment, postId: activePost.id };

    return addPostComment(newComment).then(commentar => {
      setComments(currentComments => {
        return [...currentComments, commentar];
      });
    });
  };

  return (
    <div className="content" data-cy="PostDetails">
      <div className="content" data-cy="PostDetails">
        <div className="block">
          <h2 data-cy="PostTitle">
            #{activePost.id}: {activePost.title}
          </h2>

          <p data-cy="PostBody">{activePost.title}</p>
        </div>

        <div className="block">
          {loading && <Loader />}

          {!loading && errorMessage && (
            <div className="notification is-danger" data-cy="CommentsError">
              Something went wrong
            </div>
          )}

          {!loading && comments.length === 0 && (
            <p className="title is-4" data-cy="NoCommentsMessage">
              No comments yet
            </p>
          )}

          {!loading && comments.length > 0 && (
            <>
              <p className="title is-4">Comments:</p>

              {comments.map(comment => (
                <article
                  key={comment.id}
                  className="message is-small"
                  data-cy="Comment"
                >
                  <div className="message-header">
                    <a href="mailto:misha@mate.academy" data-cy="CommentAuthor">
                      {comment.name}
                    </a>
                    <button
                      data-cy="CommentDelete"
                      type="button"
                      className="delete is-small"
                      aria-label="delete"
                      onClick={() => deletePost(comment.id)}
                    >
                      delete button
                    </button>
                  </div>

                  <div className="message-body" data-cy="CommentBody">
                    {comment.body}
                  </div>
                </article>
              ))}
            </>
          )}

          {!loading && !isActiveWriteComment && (
            <button
              data-cy="WriteCommentButton"
              type="button"
              className="button is-link"
              onClick={() => setIsActiveWriteComment(true)}
            >
              Write a comment
            </button>
          )}
        </div>

        {isActiveWriteComment && <NewCommentForm addComment={addComment} />}
      </div>
    </div>
  );
};

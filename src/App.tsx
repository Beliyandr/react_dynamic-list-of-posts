import classNames from 'classnames';

import 'bulma/css/bulma.css';
import '@fortawesome/fontawesome-free/css/all.css';
import './App.scss';

import { PostsList } from './components/PostsList';
import { UserSelector } from './components/UserSelector';
import { Loader } from './components/Loader';
import { useCallback, useEffect, useState } from 'react';
import { User } from './types/User';
import { Post } from './types/Post';
import { getUsers } from './components/services/users';
import { getUserPosts } from './components/services/posts';
import { PostDetails } from './components/PostDetails';

export const App = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  const [activePost, setActivePost] = useState<Post | null>(null);

  const [errorMessage, setErrorMessage] = useState('');

  const [hasPosts, setHasPosts] = useState(false);

  const [loading, setLoading] = useState(false);

  const [activeUser, setActiveUser] = useState<User | null>(null);

  const getActiveUserPost = useCallback(async () => {
    if (!activeUser) {
      return;
    }

    setLoading(true);
    setActivePost(null);
    try {
      const gotPosts = await getUserPosts(activeUser.id);

      setPosts(gotPosts);
      if (gotPosts.length) {
        setHasPosts(true);
      } else {
        setHasPosts(false);
      }
    } catch (error) {
      setHasPosts(false);
      setErrorMessage('Something went wrong!');
    } finally {
      setLoading(false);
    }
  }, [activeUser]);



  return (
    <main className="section">
      <div className="container">
        <div className="tile is-ancestor">
          <div className="tile is-parent">
            <div className="tile is-child box is-success">
              <div
                className="block"
                onClick={() => {
                  console.log(1);
                }}
              >
                <UserSelector
                  activeUser={activeUser}
                  setActiveUser={setActiveUser}
                  setErrorMessage={setErrorMessage}
                  getActiveUserPost={getActiveUserPost}
                />
              </div>

              <div className="block" data-cy="MainContent">
                {!activeUser && (
                  <p data-cy="NoSelectedUser">No user selected</p>
                )}
                {loading && <Loader />}

                {errorMessage && (
                  <div
                    className="notification is-danger"
                    data-cy="PostsLoadingError"
                  >
                    Something went wrong!
                  </div>
                )}

                {hasPosts && activeUser && !loading && (
                  <PostsList
                    posts={posts}
                    getActivePost={setActivePost}
                    activePost={activePost}
                  />
                )}

                {!hasPosts && activeUser && !loading && (
                  <div className="notification is-warning" data-cy="NoPostsYet">
                    No posts yet
                  </div>
                )}
              </div>
            </div>
          </div>

          {activePost && !loading && (
            <div
              data-cy="Sidebar"
              className={classNames(
                'tile',
                'is-parent',
                'is-8-desktop',
                'Sidebar',
                'Sidebar--open',
              )}
            >
              <div className="tile is-child box is-success ">
                <PostDetails activePost={activePost} />
              </div>
            </div>
          )}
        </div>
      </div>
    </main>
  );
};

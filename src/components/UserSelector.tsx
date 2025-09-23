import { FC, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  activeUser: User | null;
  setActiveUser: (user: User) => void;
};

export const UserSelector: FC<Props> = ({
  users,
  activeUser,
  setActiveUser = () => {},
}) => {
  const [openDrodown, setOpenDrodown] = useState(false);

  const handleActiveUser = (event: React.MouseEvent<HTMLAnchorElement>, user: User) => {
    event.preventDefault();
    setActiveUser(user);
    setOpenDrodown(false);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': openDrodown })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => {
            setOpenDrodown(prev => !prev);
          }}
        >
          <span>{activeUser?.name ?? 'Choose a user'}</span>

          <span className="icon is-small">
            <i className="fas fa-angle-down" aria-hidden="true" />
          </span>
        </button>
      </div>

      <div className="dropdown-menu" id="dropdown-menu" role="menu">
        <div className="dropdown-content">
          {users.map(user => {
            const { id, name } = user;

            return (
              <a
                key={id}
                onClick={event => handleActiveUser(event, user)}
                href={`#user-${id}`}
                className={classNames('dropdown-item', {
                  'is-active': id === activeUser?.id,
                })}
              >
                {name}
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
};

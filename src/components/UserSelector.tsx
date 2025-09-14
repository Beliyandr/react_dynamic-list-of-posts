import React, { FC, useState } from 'react';
import { User } from '../types/User';
import classNames from 'classnames';

type Props = {
  users: User[];
  setActiveUser: (user: User) => void;
  activeUser: User | null;
};

export const UserSelector: FC<Props> = ({
  users,
  setActiveUser,
  activeUser,
}) => {
  const [isDropdownActive, setIsDropdownActive] = useState(false);

  // const [selectedValue, setSelectedValue] = useState('Choose a user');

  const handleActiveUser = (user: User) => {
    setActiveUser(user);
    setIsDropdownActive(!isDropdownActive);
  };

  return (
    <div
      data-cy="UserSelector"
      className={classNames('dropdown', { 'is-active': isDropdownActive })}
    >
      <div className="dropdown-trigger">
        <button
          type="button"
          className="button"
          aria-haspopup="true"
          aria-controls="dropdown-menu"
          onClick={() => setIsDropdownActive(!isDropdownActive)}
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
                onClick={() => handleActiveUser(user)}
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

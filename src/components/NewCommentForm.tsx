import classNames from 'classnames';
import React, { FC, useState } from 'react';
import { CommentData } from '../types/Comment';

type Props = {
  addComment: (comment: CommentData) => Promise<T>;
};

export const NewCommentForm: FC<Props> = ({ addComment = () => {} }) => {
  const [inputName, setInputName] = useState('');
  const [inputEmail, setInputEmail] = useState('');
  const [inputText, setInputText] = useState('');

  const [hasInputNameError, setHasInputNameError] = useState(false);
  const [hasInputEmailError, setHasInputEmailError] = useState(false);
  const [hasInputTextError, setHasInputTextError] = useState(false);

  const [loading, setLoading] = useState(false);

  const handleSubmit = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    event.preventDefault();
    if (inputName.length === 0) {
      setHasInputNameError(true);
    }
    if (inputEmail.length === 0) {
      setHasInputEmailError(true);
    }
    if (inputText.length === 0) {
      setHasInputTextError(true);
    }
    if (hasInputNameError && hasInputEmailError && hasInputTextError) {
      return;
    }

    const message = {
      name: inputName,
      email: inputEmail,
      body: inputText,
    };

    setLoading(true);
    addComment(message);
    setLoading(false);
  };

  const resetForm = () => {
    setInputText('');
  };

  const handleInputNameChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputName(event.target.value);
    setHasInputNameError(false);
  };

  const handleInputEmailChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputEmail(event.target.value);
    setHasInputEmailError(false);
  };

  const handleInputTextChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputText(event.target.value);
    setHasInputTextError(false);
  };

  console.log(hasInputEmailError);

  return (
    <form data-cy="NewCommentForm">
      <div className="field" data-cy="NameField">
        <label className="label" htmlFor="comment-author-name">
          Author Name
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="name"
            id="comment-author-name"
            placeholder="Name Surname"
            className={classNames('input', { 'is-danger': hasInputNameError })}
            value={inputName}
            onChange={handleInputNameChange}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-user" />
          </span>
          {hasInputNameError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasInputNameError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Name is required
          </p>
        )}
      </div>

      <div className="field" data-cy="EmailField">
        <label className="label" htmlFor="comment-author-email">
          Author Email
        </label>

        <div className="control has-icons-left has-icons-right">
          <input
            type="text"
            name="email"
            value={inputEmail}
            onChange={handleInputEmailChange}
            id="comment-author-email"
            placeholder="email@test.com"
            className={classNames('input', { 'is-danger': hasInputEmailError })}
          />

          <span className="icon is-small is-left">
            <i className="fas fa-envelope" />
          </span>

          {hasInputEmailError && (
            <span
              className="icon is-small is-right has-text-danger"
              data-cy="ErrorIcon"
            >
              <i className="fas fa-exclamation-triangle" />
            </span>
          )}
        </div>
        {hasInputEmailError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Email is required
          </p>
        )}
      </div>

      <div className="field" data-cy="BodyField">
        <label className="label" htmlFor="comment-body">
          Comment Text
        </label>

        <div className="control">
          <textarea
            id="comment-body"
            name="body"
            value={inputText}
            onChange={handleInputTextChange}
            placeholder="Type comment here"
            className={classNames('textarea', {
              'is-danger': hasInputTextError,
            })}
          />
        </div>
        {hasInputTextError && (
          <p className="help is-danger" data-cy="ErrorMessage">
            Enter some text
          </p>
        )}
      </div>

      <div className="field is-grouped">
        <div className="control">
          <button
            type="submit"
            className={classNames('button is-link', { 'is-loading': loading })}
            // disabled={loading}
            onClick={event => {
              handleSubmit(event);
            }}
          >
            Add
          </button>
        </div>

        <div className="control">
          {/* eslint-disable-next-line react/button-has-type */}
          <button type="reset" className="button is-link is-light">
            Clear
          </button>
        </div>
      </div>
    </form>
  );
};

import * as React from 'react';
import styles from './SurveyForm.module.scss';
import { ISurveyFormProps } from './ISurveyFormProps';
import { format } from 'date-fns';
import UsersList from './UserList/UsersList';

const SurveyForm = (props: ISurveyFormProps) => {

  const {
    Title,
    Email,
    LoginName,
    context
  } = props;

  return (
    <section className={`${styles.surveyForm}`}>
      {/* Current User Profile */}
      <div>
        <h3>Current User Profile</h3>
        <p>
          <strong>Title:</strong> {Title}
        </p>
        <p>
          <strong>Login Name:</strong> {LoginName}
        </p>
        <p>
          <strong>Email:</strong> {Email}
        </p>
      </div>
      <hr />
      {/* Current Date */}
      <div>
        <h3>Current Date</h3>
        <p>
          <strong>Date:</strong> {format(new Date(), 'dd/MM/yyyy')}
          {/* <p>{format(time, 'HH:mm:ss')}</p> */}
        </p>
      </div>
      <hr />
      {/* List Users */}
      <div>
        <UsersList context={context} Email={Email} />
      </div>
    </section>
  )
}

export default SurveyForm
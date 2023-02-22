import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import * as React from "react";
import { useEffect, useState } from "react";
import { getSP } from "../../../../pnpConfiguration";
import QuestionList from "../QuestionList/QuestionList";
import { IUsersInfor } from "./UserListInterface";
import styles from './UsersList.module.scss';

interface IUsersList {
    context: WebPartContext;
    Email: string;
}

const UsersList = (props: IUsersList) => {
    const LIST_NAME: string = "Sample";
    let _sp: SPFI = getSP(props.context)

    const [users, setUsers] = useState<IUsersInfor[]>([]);
    const [isUserAnswered, setIsUserAnswered] = useState<boolean>(false);
    const [getStartSurvey, setGetStartSurvey] = useState<boolean>(false);
    const [currentUserId, setCurrentUserId] = useState<number>(0);
    console.log("currentUserId", currentUserId);
    const getUsersData = async () => {
        try {
            const usersData = await _sp.web.lists.getByTitle(LIST_NAME).items();
            setUsers(
                usersData.map((user: IUsersInfor) => {
                    return {
                        ...user,
                        Title: user.Title,
                        Email: user.Email,
                        Id: user.Id,
                        HasAnswered: user.HasAnswered,
                        Question_1: user.Question_1 ? user.Question_1 : '',
                        Question_2: user.Question_2 ? user.Question_2 : [''],
                        Question_3: user.Question_3 ? user.Question_3 : new Date(),
                        Question_4: user.Question_4 ? user.Question_4 : 0,
                    }
                }));
            setCurrentUserId(
                usersData.filter((user: IUsersInfor) => {
                    return user.Email === props.Email;
                })[0].Id
            );
        } catch (error) {
            console.log("error", error);
        }
    }

    useEffect(() => {
        getUsersData();
    }, [])

    useEffect(() => {
        const userAnswered = users.filter((user: IUsersInfor) => {
            return user.Email === props.Email && user.HasAnswered === true;
        })
        if (userAnswered.length > 0) {
            setIsUserAnswered(true);
        } else {
            setIsUserAnswered(false);
        }
    }, [users, props])

    return (
        <div>
            <h3>Users List</h3>
            <table>
                <thead>
                    <tr>
                        <th>Title</th>
                        <th>Email</th>
                        <th>Has Answered</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user: IUsersInfor, index) => {
                        return (
                            <tr key={index}
                                style={{
                                    backgroundColor: user.Email === props.Email ? '#f2f2f2' : 'white',
                                    fontWeight: user.Email === props.Email ? 'bold' : 'normal',
                                    margin: '12px'
                                }}
                            >
                                <td>{user.Title}</td>
                                <td>{user.Email}</td>
                                <td
                                    style={{ textAlign: 'center' }}
                                >{user.HasAnswered ?
                                    <i className="ti-check"
                                        style={{ color: 'green' }}
                                    >✓</i>
                                    :
                                    <i className="ti-close"
                                        style={{ color: 'red' }}
                                    >✗</i>
                                    }</td>
                            </tr>
                        )
                    })}
                </tbody>
            </table>
            <hr />
            {/* Survey Form */}
            <div>
                <h3>Survey Form</h3>
                {
                    isUserAnswered ?
                        <div>
                            <p>You have already answered the survey</p>
                            <button className={styles.surveyFormButton}
                            >View My Response</button>
                        </div> :
                        <div className={styles.surveyFormNotAnswered}>
                            {
                                getStartSurvey ?
                                    <QuestionList data={users}
                                        setUsers={setUsers}
                                        currentUserEmail={props.Email}
                                        context={props.context}
                                        currentUserId={currentUserId}
                                    />
                                    : <button className={styles.surveyFormButton}
                                        onClick={() => setGetStartSurvey(true)}
                                    >Start Survey</button>
                            }
                        </div>
                }
            </div>
            <hr />
        </div>
    )
}

export default UsersList
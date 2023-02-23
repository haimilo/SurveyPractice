import { WebPartContext } from "@microsoft/sp-webpart-base";
import { SPFI } from "@pnp/sp";
import { format } from "date-fns";
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
    const [currentUserResponse, setCurrentUserResponse] = useState<IUsersInfor>();
    console.log(currentUserResponse);

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

    const handleViewMyResponse = async () => {
        try {
            const currentUserResponseAPI = await _sp.web.lists.getByTitle(LIST_NAME).items.getById(currentUserId)();
            console.log("currentUserResponseAPI", currentUserResponseAPI);
            setCurrentUserResponse(
                {
                    Title: currentUserResponseAPI.Title,
                    Email: currentUserResponseAPI.Email,
                    Id: currentUserResponseAPI.Id,
                    HasAnswered: currentUserResponseAPI.HasAnswered,
                    Question_1: currentUserResponseAPI.Question_1 ? currentUserResponseAPI.Question_1 : '',
                    Question_2: currentUserResponseAPI.Question_2 ? currentUserResponseAPI.Question_2 : [''],
                    Question_3: currentUserResponseAPI.Question_3 ? currentUserResponseAPI.Question_3 : new Date(),
                    Question_4: currentUserResponseAPI.Question_4 ? currentUserResponseAPI.Question_4 : 0,
                }
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
            {/* Survey Form */}
            <div>
                <hr />
                <h3>Survey Form</h3>
                {
                    isUserAnswered ?
                        <div>
                            <p>You have already answered the survey</p>
                            <button className={styles.surveyFormButton}
                                onClick={handleViewMyResponse}
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
            {/* Response Data */}
            {
                currentUserResponse &&
                <div>
                    <hr />
                    <h3>My Response</h3>
                    <h4>
                        Current User: {currentUserResponse?.Title}
                    </h4>
                    <h4>
                        Current User Email: {currentUserResponse?.Email}
                    </h4>
                    <table
                        style={{
                            border: '1px solid black',
                            borderCollapse: 'collapse',
                            width: '100%',
                            borderRadius: '8px',
                        }}
                    >
                        <thead>
                            <tr
                                style={{
                                    backgroundColor: '#f2f2f2',
                                    borderBottom: '1px solid black',
                                }}
                            >
                                <th >Question 1</th>
                                <th >Question 2</th>
                                <th >Question 3</th>
                                <th >Question 4</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        border: '1px solid black',
                                    }}
                                >
                                    {currentUserResponse?.Question_1}
                                </td>
                                <td>
                                    <ul
                                        style={{
                                            display: 'flex',
                                            flexDirection: 'column',
                                            listStyle: 'none',
                                            padding: '0',
                                        }}
                                    >
                                        {currentUserResponse?.Question_2.map((item: string, index: number) => {
                                            return (
                                                <li key={index}
                                                    style={{
                                                        margin: '0',
                                                        padding: '8px',
                                                        // '&:nth-child(odd)': 'background-color: #f2f2f2',
                                                    }}
                                                >
                                                    {item}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        border: '1px solid black',
                                    }}
                                >
                                    {
                                        format(new Date(currentUserResponse?.Question_3.toString()), 'dd/MM/yyyy')
                                    }
                                </td>
                                <td
                                    style={{
                                        textAlign: 'center',
                                        verticalAlign: 'middle',
                                        border: '1px solid black',
                                    }}
                                >
                                    {currentUserResponse?.Question_4}
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            }
            <hr />
        </div>
    )
}

export default UsersList
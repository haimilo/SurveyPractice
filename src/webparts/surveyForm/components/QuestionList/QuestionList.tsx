import * as React from "react"
import { useState } from "react";
import { DEFAULT_QUESTION_1, DEFAULT_QUESTION_2, DEFAULT_QUESTION_3, DEFAULT_QUESTION_4 } from "../../../../common/QuestionList";
import { IUsersInfor } from "../UserList/UserListInterface";
import Rating from '@mui/material/Rating';
import { SPFI } from "@pnp/sp";
import { getSP } from "../../../../pnpConfiguration";

const QuestionList = (props: any) => {
    const {
        data,
        setUsers,
        currentUserEmail,
        context,
        currentUserId
    } = props;
    let _sp: SPFI = getSP(context)
    console.log("data", data, data.Id, currentUserEmail);

    const [answer_1, setAnswer_1] = useState<string>("");
    const [showNextQuestion, setShowNextQuestion] = useState<boolean>(false);
    const [age, setAge] = React.useState<string | null>(null);
    const [_birthday, setBirthday] = React.useState<Date | null>(null);
    const [showRating, setShowRating] = useState<boolean>(false);
    const [_rating, setRating] = useState<number>(0);
    const [_languageSkill, setLanguageSkill] = useState<string[]>([]);

    const handleSubmitQuestion_1 = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // TODO: Handle form submission
        setShowNextQuestion(true);
    }

    const handleSubmitQuestion_2 = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // TODO: Handle form submission
        setShowRating(true);
    }

    const handleSubmitQuestion_3 = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        // TODO: Handle form submission
        setShowRating(true);
    }

    const handleSubmitQuestion_4 = (e: React.FormEvent<HTMLFormElement>): void => {
        e.preventDefault();

        setUsers((prevState: IUsersInfor[]) => {
            return prevState.map((user: IUsersInfor) => {
                if (user.Email === currentUserEmail) {
                    return {
                        ...user,
                        HasAnswered: true,
                    }
                } else {
                    return user;
                }
            })
        })

        console.log("data", data, data.Id);

        // Call API to update data
        const updateData = async (itemId: number, listName: string) => {
            try {
                const updatedData = await _sp.web.lists.getByTitle(listName).items.getById(itemId).update({
                    Question_1: answer_1,
                    Question_2: _languageSkill,
                    Question_3: _birthday ? _birthday.toISOString() : new Date().toISOString(),
                    Question_4: _rating,
                    HasAnswered: true,
                }).then((res: any) => {
                    // Handle success
                    console.log("res", res);
                }).catch((error: any) => {
                    // Handle error
                    console.log("error", error);
                });
                console.log("updatedData", updatedData);
            }
            catch (error) {
                console.log("error", error);
            }
        }
        updateData(currentUserId, "Sample");
    }

    return (
        <>
            <form
                onSubmit={handleSubmitQuestion_1}
            >
                <div>
                    <h3>Question 1</h3>
                    <p>{DEFAULT_QUESTION_1.Question_1}</p>
                    <ul
                        style={{
                            listStyle: "none",
                        }}
                    >
                        {DEFAULT_QUESTION_1.ListOptions.map((option, index) => {
                            return (
                                <li key={index}>
                                    <input
                                        required
                                        type="radio" id={option.Key}
                                        name="question_1"
                                        value={option.Key}
                                        onChange={(e) => {
                                            console.log("e.target.value", e.target.value);
                                            setAnswer_1(e.target.value);
                                            setShowNextQuestion(false);
                                            setShowRating(false);
                                            setUsers((prevState: IUsersInfor[]) => {
                                                return prevState.map((user: IUsersInfor) => {
                                                    if (user.Email === currentUserEmail) {
                                                        return {
                                                            ...user,
                                                            Question_1: e.target.value,
                                                        }
                                                    } else {
                                                        return user;
                                                    }
                                                })
                                            })
                                        }}
                                    />
                                    <label htmlFor={option.Key}>{option.Title}</label>
                                </li>
                            )
                        })}
                    </ul>
                    <button type="submit">Next Question</button>
                </div>
            </form >
            {
                showNextQuestion ? (
                    answer_1 === "A" ? (
                        <>
                            <hr />
                            <form
                                onSubmit={
                                    handleSubmitQuestion_2
                                }
                            >
                                <h3>Question 2</h3>
                                <p>
                                    {DEFAULT_QUESTION_2.Question_2}
                                </p>
                                <div>
                                    {
                                        DEFAULT_QUESTION_2.ListOptions.map((option, index) => {
                                            return (
                                                <div key={index}>
                                                    <input
                                                        type="checkbox"
                                                        id={option.Key}
                                                        name="question_2"
                                                        value={option.Key}
                                                        onChange={(e) => {
                                                            console.log("e.target.value", e.target.value);
                                                            setShowRating(false);
                                                            setLanguageSkill((prevState: string[]) => {
                                                                return [...prevState, e.target.value].filter((item) => item !== "");
                                                            })
                                                            setUsers((prevState: IUsersInfor[]) => {
                                                                return prevState.map((user: IUsersInfor) => {
                                                                    if (user.Email === currentUserEmail) {
                                                                        return {
                                                                            ...user,
                                                                            Question_2: [...user.Question_2, e.target.value].filter((item) => item !== ""),
                                                                        }
                                                                    } else {
                                                                        return user;
                                                                    }
                                                                })
                                                            })
                                                        }}
                                                    />
                                                    <label htmlFor={option.Key}>{option.Title}</label>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <button type="submit">Next Question</button>
                            </form>
                        </>
                    ) : (
                        <>
                            <hr />
                            <form
                                onSubmit={
                                    handleSubmitQuestion_3
                                }
                            >
                                <h3>Question 3</h3>
                                <p>
                                    {DEFAULT_QUESTION_3.Question_3}
                                </p>
                                <input type="date"
                                    onChange={(e) => {
                                        console.log("e.target.value", e.target.value);
                                        const date = new Date(e.target.value);
                                        setBirthday(date);
                                        setShowRating(false);
                                        const ageInMs = Date.now() - date.getTime();
                                        const ageDate = new Date(ageInMs);
                                        const years = ageDate.getUTCFullYear() - 1970;
                                        const months = ageDate.getUTCMonth();
                                        setAge(`You are ${years} years and ${months} months old.`);
                                        setUsers((prevState: IUsersInfor[]) => {
                                            return prevState.map((user: IUsersInfor) => {
                                                if (user.Email === currentUserEmail) {
                                                    return {
                                                        ...user,
                                                        Question_3: date,
                                                    }
                                                } else {
                                                    return user;
                                                }
                                            })
                                        })
                                    }}
                                />
                                {age && <p>{age}</p>}
                                <button type="submit">Next Question</button>
                            </form>
                        </>
                    )
                ) : null
            }
            {
                showRating ? (
                    <>
                        <hr />
                        <form
                            onSubmit={handleSubmitQuestion_4}
                        >
                            <h3>{DEFAULT_QUESTION_4.Question_4}</h3>
                            <div>
                                {/* Rating form */}
                                <Rating
                                    name="simple-controlled"
                                    value={
                                        data.find((user: IUsersInfor) => user.Email === currentUserEmail)?.Question_4 || 0
                                    }
                                    onChange={(_event, newValue) => {
                                        setRating(newValue);
                                        setUsers((prevState: IUsersInfor[]) => {
                                            return prevState.map((user: IUsersInfor) => {
                                                if (user.Email === currentUserEmail) {
                                                    return {
                                                        ...user,
                                                        Question_4: newValue,
                                                    }
                                                } else {
                                                    return user;
                                                }
                                            })
                                        })
                                    }}
                                />
                            </div>
                            <button type="submit">Submit</button>
                        </form>
                    </>
                ) : null
            }
        </>
    )
}

export default QuestionList
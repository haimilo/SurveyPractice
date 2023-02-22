export interface IQuestion_1 {
    Question_1: string;
    ListOptions: {
        Title: string;
        Key: string;
    }[];
}

export const DEFAULT_QUESTION_1: IQuestion_1 = {
    Question_1:
        "This is Question 1. if you select Answer A, your next question will be Question 2. If you select Answer B, your next question will be Question 3.",
    ListOptions: [
        {
            Title: "Answer A, Go to Question 2",
            Key: "A",
        },
        {
            Title: "Answer B, Go to Question 3",
            Key: "B",
        },
    ],
};

export interface IQuestion_2 {
    Question_2: string;
    ListOptions: {
        Title: string;
        Key: string;
    }[];
}

export const DEFAULT_QUESTION_2: IQuestion_2 = {
    Question_2:
        "What are your favorite programming languages? Please select 2.",
    ListOptions: [
        {
            Title: "C#",
            Key: "C#",
        },
        {
            Title: "Java",
            Key: "Java",
        },
        {
            Title: "PHP",
            Key: "PHP",
        },
        {
            Title: "Python",
            Key: "Python",
        },
        {
            Title: "R",
            Key: "R",
        },
        {
            Title: "JavaScript",
            Key: "JavaScript",
        },
        {
            Title: "NodeJS",
            Key: "NodeJS",
        },
        {
            Title: "ReactJS",
            Key: "ReactJS",
        },
        {
            Title: "Typescript",
            Key: "Typescript",
        },
        {
            Title: "NextJS",
            Key: "NextJS",
        },
    ],
};

export interface IQuestion_3 {
    Question_3: string;
    DOB: Date;
}

export const DEFAULT_QUESTION_3: IQuestion_3 = {
    Question_3: "What is your date of birth?",
    DOB: new Date(),
};

export interface IQuestion_4 {
    Question_4: string;
    Rating: number;
}

export const DEFAULT_QUESTION_4: IQuestion_4 = {
    Question_4: "How much do you like this survey?",
    Rating: 0,
};

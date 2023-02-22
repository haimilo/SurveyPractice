// import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface IUsersInfor {
    Title: string;
    Email: string;
    Id: number;
    HasAnswered: boolean;
    Question_1: string;
    Question_2: string[];
    Question_3: Date;
    Question_4: number;
}

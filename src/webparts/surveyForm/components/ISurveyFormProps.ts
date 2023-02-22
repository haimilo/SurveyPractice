import { WebPartContext } from "@microsoft/sp-webpart-base";
export interface ISurveyFormProps {
    description: string;
    Title: string;
    Email: string;
    LoginName: string;
    context: WebPartContext;
}

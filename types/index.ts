export type Task = {
    _id?: string;
    name: string;
    description: string;
    status: string;
    dueDate: string;
    userId?: string;
    categories?: string[];
    createdAt: string;
    updatedAt?: string;
};

export type TaskColors = {
    Todo: string;
    Working: string;
    Done: string;
};

export type User = {
    _id?: string;
    username: string;
    email: string;
    linkedinURL: string;
    tasks?: string[];
    categories?: string[];
    createdAt: string;
    updatedAt: string;
};

export type UserData = {
    username: string;
    email: string;
    linkedinURL: string;
};

export type Category = {
    _id?: string;
    name: string;
    userId: string;
    createdAt: string;
    updatedAt: string;
};

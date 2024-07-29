export type TaskType = {
    name: string;
    description: string;
    status: string;
    createdDate: string;
    dueDate: string;
    categories?: string[];
};

export type TaskColors = {
    Todo: string;
    Working: string;
    Done: string;
};

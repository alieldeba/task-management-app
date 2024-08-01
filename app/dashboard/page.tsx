"use client";

import { CalendarIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import React from "react";
import { cn } from "@/lib/utils";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import TasksTable from "@/components/TasksTable";
import DashboardHeader from "@/components/DashboardHeader";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import { toast } from "sonner";
import { Category, Task } from "@/types";
import Cookies from "universal-cookie";
import { useSelector } from "react-redux";
import { Checkbox } from "@/components/ui/checkbox";

export default function Dashboard() {
    const user = useSelector((state: any) => state.user.user);

    const todoStatuses = ["Todo", "Working", "Done"];
    const [date, setDate] = React.useState<Date>(new Date());
    const [search, setSearch] = React.useState<string>("");
    const [categoryName, setCategoryName] = React.useState<string>("");
    const [taskData, setTaskData] = React.useState<Task>({
        status: "Todo",
        description: "",
        name: "",
        dueDate: date,
    });

    // State for creating task
    const [taskCategories, setTaskCategories] = React.useState<string[]>([]);
    const [filter, setFilter] = React.useState("");

    const cookies = new Cookies();

    const tasks = useQuery<Task[]>({
        queryKey: ["tasks", "user", user._id],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/tasks/user/${user._id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                return response.data;
            } catch (err) {
                toast.error("Something went wrong while fetching your tasks.");
                console.log(err);
            }
        },
    });

    const categories = useQuery<Category[]>({
        queryKey: ["categories", "user", user._id],
        queryFn: async () => {
            try {
                const response = await axios.get(
                    `http://localhost:8000/categories/user/${user._id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                return response.data;
            } catch (err) {
                toast.error(
                    "Something went wrong while fetching your categories."
                );
                console.log(err);
            }
        },
    });

    const { mutate: createTask } = useMutation({
        mutationFn: async () => {
            try {
                await axios.post(
                    "http://localhost:8000/tasks/",
                    {
                        ...taskData,
                        categories: taskCategories,
                        userId: user._id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                toast.success("Task created successfully.");

                // Resetting data
                setTaskCategories([]);
                setTaskData({
                    status: "Todo",
                    description: "",
                    name: "",
                    dueDate: date,
                });

                tasks.refetch();
            } catch (err) {
                toast.error("Something went wrong while creating your tasks.");
                console.log(err);
            }
        },
    });

    const { mutate: createCategory } = useMutation({
        mutationFn: async () => {
            try {
                await axios.post(
                    "http://localhost:8000/categories/",
                    {
                        name: categoryName,
                        userId: user._id,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                toast.success("Category created successfully.");
                tasks.refetch();
                categories.refetch();
                setTaskData({
                    status: "Todo",
                    description: "",
                    name: "",
                    dueDate: date,
                });
            } catch (err) {
                toast.error(
                    "Something went wrong while creating your category."
                );
                console.log(err);
            }
        },
    });

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <DashboardHeader search={search} setSearch={setSearch} />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs
                        defaultValue="all"
                        className="max-w-full overflow-auto"
                    >
                        <div className="flex flex-col-reverse gap-2 items-start">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="todo">Todo</TabsTrigger>
                                <TabsTrigger value="working">
                                    Working
                                </TabsTrigger>
                                <TabsTrigger value="done">Done</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                <Select
                                    defaultValue="filter"
                                    onValueChange={(value) => {
                                        if (value === "filter") {
                                            setFilter("");
                                        } else {
                                            setFilter(value);
                                        }
                                    }}
                                >
                                    <SelectTrigger className="w-[180px]">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="filter">
                                            No Filter
                                        </SelectItem>
                                        {categories?.data?.map(
                                            (category: Category) => (
                                                <SelectItem
                                                    value={category._id!}
                                                    key={category._id}
                                                >
                                                    {category.name}
                                                </SelectItem>
                                            )
                                        )}
                                    </SelectContent>
                                </Select>
                                <Dialog>
                                    <DialogTrigger>
                                        <Button
                                            size="sm"
                                            className="h-7 gap-1"
                                            variant="outline"
                                        >
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            <span className="sm:whitespace-nowrap">
                                                Add Category
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Create new category
                                            </DialogTitle>
                                            <DialogDescription>
                                                Create your new task and start
                                                working on it to change the
                                                state to push up you dopamine 🔥
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="flex flex-col items-start gap-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-right"
                                                >
                                                    Category name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="col-span-3"
                                                    onChange={(e) =>
                                                        setCategoryName(
                                                            e.target.value
                                                        )
                                                    }
                                                />
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    onClick={() =>
                                                        createCategory()
                                                    }
                                                >
                                                    Add Category
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="h-7 gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />
                                            <span className="sm:whitespace-nowrap">
                                                Add Task
                                            </span>
                                        </Button>
                                    </DialogTrigger>
                                    <DialogContent className="sm:max-w-[425px]">
                                        <DialogHeader>
                                            <DialogTitle>
                                                Create new task
                                            </DialogTitle>
                                            <DialogDescription>
                                                Create your new task and start
                                                working on it to change the
                                                state to push up you dopamine 🔥
                                            </DialogDescription>
                                        </DialogHeader>
                                        <div className="grid gap-4 py-4">
                                            <div className="flex flex-col items-start gap-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-right"
                                                >
                                                    Task name
                                                </Label>
                                                <Input
                                                    id="name"
                                                    className="col-span-3"
                                                    onChange={(e) =>
                                                        setTaskData({
                                                            ...taskData,
                                                            name: e.target
                                                                .value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col items-start gap-2">
                                                <Label
                                                    htmlFor="name"
                                                    className="text-right"
                                                >
                                                    Task description
                                                </Label>
                                                <Input
                                                    id="description"
                                                    className="col-span-3 w-full"
                                                    value={
                                                        taskData?.description
                                                    }
                                                    onChange={(e) =>
                                                        setTaskData({
                                                            ...taskData,
                                                            description:
                                                                e.target.value,
                                                        })
                                                    }
                                                />
                                            </div>
                                            <div className="flex flex-col items-start gap-2">
                                                <Label
                                                    htmlFor="category"
                                                    className="text-right"
                                                >
                                                    Categories
                                                </Label>
                                                <div className="flex gap-2 flex-wrap">
                                                    {categories?.data?.map(
                                                        (
                                                            category: Category,
                                                            idx: number
                                                        ) => (
                                                            <div
                                                                key={idx}
                                                                className="flex gap-1 items-center"
                                                            >
                                                                <Checkbox
                                                                    id={
                                                                        category.name
                                                                    }
                                                                    onCheckedChange={(
                                                                        value
                                                                    ) => {
                                                                        if (
                                                                            value
                                                                        ) {
                                                                            // User checked the category
                                                                            setTaskCategories(
                                                                                [
                                                                                    ...taskCategories,
                                                                                    category._id!,
                                                                                ]
                                                                            );
                                                                        } else {
                                                                            // User unchecked the category
                                                                            setTaskCategories(
                                                                                taskCategories.filter(
                                                                                    (
                                                                                        cat
                                                                                    ) =>
                                                                                        cat !==
                                                                                        category._id
                                                                                )
                                                                            );
                                                                        }
                                                                    }}
                                                                />
                                                                <label
                                                                    htmlFor={
                                                                        category.name
                                                                    }
                                                                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                                                >
                                                                    {
                                                                        category.name
                                                                    }
                                                                </label>
                                                            </div>
                                                        )
                                                    )}
                                                </div>
                                            </div>
                                            <div className="w-full flex items-center justify-between gap-2">
                                                <Label
                                                    htmlFor="state"
                                                    className="text-right"
                                                >
                                                    Status
                                                </Label>
                                                <Select
                                                    defaultValue="Todo"
                                                    onValueChange={(value) =>
                                                        setTaskData({
                                                            ...taskData,
                                                            status: value,
                                                        })
                                                    }
                                                >
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {todoStatuses.map(
                                                                (todo) => (
                                                                    <SelectItem
                                                                        value={
                                                                            todo
                                                                        }
                                                                        key={
                                                                            todo
                                                                        }
                                                                    >
                                                                        {todo}
                                                                    </SelectItem>
                                                                )
                                                            )}
                                                        </SelectGroup>
                                                    </SelectContent>
                                                </Select>
                                            </div>
                                            <div className="w-full flex items-center justify-between gap-2">
                                                <Label
                                                    htmlFor="deadline"
                                                    className="text-right"
                                                >
                                                    Due date
                                                </Label>
                                                <Popover>
                                                    <PopoverTrigger asChild>
                                                        <Button
                                                            variant="outline"
                                                            className={cn(
                                                                "w-[180px] justify-start text-left font-normal",
                                                                !date &&
                                                                    "text-muted-foreground"
                                                            )}
                                                        >
                                                            <CalendarIcon className="mr-2 h-4 w-4" />
                                                            {date ? (
                                                                format(
                                                                    date,
                                                                    "PPP"
                                                                )
                                                            ) : (
                                                                <span>
                                                                    Pick a date
                                                                </span>
                                                            )}
                                                        </Button>
                                                    </PopoverTrigger>
                                                    <PopoverContent
                                                        className="w-auto p-0"
                                                        align="start"
                                                    >
                                                        <Calendar
                                                            mode="single"
                                                            selected={date}
                                                            onSelect={(
                                                                value
                                                            ) => {
                                                                setDate(value!);
                                                                setTaskData({
                                                                    ...taskData,
                                                                    dueDate:
                                                                        value!,
                                                                });
                                                            }}
                                                            initialFocus
                                                            disabled={(date) =>
                                                                date <
                                                                new Date()
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <DialogClose asChild>
                                                <Button
                                                    onClick={() => createTask()}
                                                >
                                                    Add Task
                                                </Button>
                                            </DialogClose>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        {tasks.data && tasks.data?.length > 0 && (
                            <>
                                <TabsContent value="all">
                                    <TasksTable
                                        tasks={tasks.data.filter((task: Task) =>
                                            task.name
                                                .toLocaleLowerCase()
                                                .includes(search)
                                        )}
                                        filter={filter}
                                        refetchTasks={tasks.refetch}
                                    />
                                </TabsContent>
                                <TabsContent value="todo">
                                    <TasksTable
                                        tasks={tasks.data.filter(
                                            (task: Task) =>
                                                task.status === "Todo" &&
                                                task.name
                                                    .toLocaleLowerCase()
                                                    .includes(search)
                                        )}
                                        filter={filter}
                                        refetchTasks={tasks.refetch}
                                    />
                                </TabsContent>
                                <TabsContent value="working">
                                    <TasksTable
                                        tasks={tasks.data.filter(
                                            (task: Task) =>
                                                task.status === "Working" &&
                                                task.name
                                                    .toLowerCase()
                                                    .includes(search)
                                        )}
                                        filter={filter}
                                        refetchTasks={tasks.refetch}
                                    />
                                </TabsContent>
                                <TabsContent value="done">
                                    <TasksTable
                                        tasks={tasks.data.filter(
                                            (task: Task) =>
                                                task.status === "Done" &&
                                                task.name
                                                    .toLocaleLowerCase()
                                                    .includes(search)
                                        )}
                                        filter={filter}
                                        refetchTasks={tasks.refetch}
                                    />
                                </TabsContent>
                            </>
                        )}
                        {tasks.data?.length === 0 && (
                            <p className="leading-7 [&:not(:first-child)]:mt-56 text-center">
                                There is no tasks, start by creating one
                            </p>
                        )}
                    </Tabs>
                </main>
            </div>
        </div>
    );
}

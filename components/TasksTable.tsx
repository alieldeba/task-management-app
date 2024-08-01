import { CalendarIcon, MoreHorizontal } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
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
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { TaskColors, Task } from "@/types";
import { useMutation, useQuery } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "universal-cookie";
import { toast } from "sonner";
import { Checkbox } from "./ui/checkbox";
import { useSelector } from "react-redux";

function TasksTable({
    tasks,
    filter,
    refetchTasks,
}: {
    tasks: Task[];
    filter: string;
    refetchTasks: () => void;
}) {
    const todoStatuses = ["Todo", "Working", "Done"];
    const cookies = new Cookies();
    const user = useSelector((state: any) => state.user.user);
    const [currentTask, setCurrentTask] = React.useState<any>();

    const [taskCategories, setTaskCategories] = React.useState<string[]>([]);

    const taskColors: TaskColors = {
        Todo: "bg-blue-600",
        Working: "bg-orange-600",
        Done: "bg-green-600",
    };

    const [filteredTasks, setFilteredTasks] = React.useState(tasks);

    console.log(taskCategories);

    React.useEffect(() => {
        // Implement filter tasks by category
        if (filter) {
            const filteredTasks: Task[] = tasks.filter((task) =>
                task.categories
                    ?.map((category: any) => category._id)
                    ?.includes(filter)
            );

            setFilteredTasks(filteredTasks);
        } else {
            setFilteredTasks(tasks);
        }
    }, [filter, tasks]);

    React.useEffect(() => {
        // Implement update task categories
        if (currentTask) {
            setTaskCategories(
                currentTask.categories.map((category) => category._id)
            );
        }
    }, [currentTask]);

    const categories = useQuery<any>({
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

    const { mutate: deleteTask } = useMutation({
        mutationFn: async () => {
            try {
                await axios.delete(
                    `http://localhost:8000/tasks/${currentTask?._id}`,
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                toast.success("Task deleted successfully.");
                refetchTasks();
            } catch (err) {
                toast.error("Something went wrong while deleting your tasks.");
                console.log(err);
            }
        },
    });

    const { mutate: updateTask } = useMutation({
        mutationFn: async () => {
            try {
                await axios.put(
                    `http://localhost:8000/tasks/${currentTask?._id}`,
                    { ...currentTask, categories: taskCategories },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${cookies.get("token")}`,
                        },
                    }
                );
                setTaskCategories(currentTask.categories);
                toast.success("Task updated successfully.");
                refetchTasks();
            } catch (err) {
                toast.error("Something went wrong while updating your tasks.");
                console.log(err);
            }
        },
    });

    return (
        <Dialog>
            <AlertDialog>
                <Card className="w-full">
                    <CardHeader>
                        <CardTitle>Tasks</CardTitle>
                        <CardDescription>
                            Manage your tasks and view their states.
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>Title</TableHead>
                                    <TableHead>Description</TableHead>
                                    <TableHead>Categories</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created at</TableHead>
                                    <TableHead>Due date</TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredTasks.map((task: Task, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium line-clamp-1 min-w-[150px] mt-2">
                                                {task.name}
                                            </TableCell>
                                            <TableCell className="font-medium min-w-[150px]">
                                                {task.description || "..."}
                                            </TableCell>
                                            <TableCell className="font-medium min-w-[150px]">
                                                {task?.categories?.map(
                                                    (category: any, idx) => (
                                                        <Badge
                                                            variant="outline"
                                                            key={idx}
                                                        >
                                                            {category.name}
                                                        </Badge>
                                                    )
                                                )}
                                                {task?.categories?.length ===
                                                    0 && <span>Nothing</span>}
                                            </TableCell>
                                            <TableCell>
                                                <Badge
                                                    variant="outline"
                                                    className={`text-white ${
                                                        taskColors[
                                                            task.status as keyof TaskColors
                                                        ]
                                                    }`}
                                                >
                                                    {task.status}
                                                </Badge>
                                            </TableCell>
                                            <TableCell className="table-cell min-w-[150px]">
                                                {format(
                                                    task.createdAt,
                                                    "dd-MM-yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell className="table-cell min-w-[150px]">
                                                {format(
                                                    task.dueDate,
                                                    "dd-MM-yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell>
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                    >
                                                        <Button
                                                            aria-haspopup="true"
                                                            size="icon"
                                                            variant="ghost"
                                                        >
                                                            <MoreHorizontal className="h-4 w-4" />
                                                            <span className="sr-only">
                                                                Toggle menu
                                                            </span>
                                                        </Button>
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent align="end">
                                                        <DropdownMenuLabel>
                                                            Actions
                                                        </DropdownMenuLabel>
                                                        <DialogTrigger className="w-full">
                                                            <DropdownMenuItem
                                                                onClick={() => {
                                                                    setCurrentTask(
                                                                        task
                                                                    );
                                                                }}
                                                            >
                                                                Edit
                                                            </DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <AlertDialogTrigger className="w-full">
                                                            <DropdownMenuItem
                                                                onClick={() =>
                                                                    setCurrentTask(
                                                                        task
                                                                    )
                                                                }
                                                            >
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </AlertDialogTrigger>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    </CardContent>

                    <CardFooter>
                        <div className="text-xs text-muted-foreground">
                            Showing <strong>{filteredTasks.length}</strong>{" "}
                            tasks
                        </div>
                    </CardFooter>
                </Card>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                        <AlertDialogDescription>
                            This action will delete your task and this cannot be
                            undo, once you delete it you cannot receive it
                            anymore.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction className="bg-transparent hover:bg-transparent p-0 shadow-none">
                            <Button
                                variant="destructive"
                                onClick={() => deleteTask()}
                            >
                                Delete
                            </Button>
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Edit your task</DialogTitle>
                    <DialogDescription>
                        Edit your new task and start working on it to change the
                        state to push up you dopamine 🔥
                    </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="name" className="text-right">
                            Task name
                        </Label>
                        <Input
                            id="name"
                            className="col-span-3"
                            value={currentTask?.name}
                            onChange={(e) =>
                                setCurrentTask({
                                    ...currentTask,
                                    name: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="name" className="text-right">
                            Task description
                        </Label>
                        <Input
                            id="description"
                            className="col-span-3"
                            value={currentTask?.description}
                            onChange={(e) =>
                                setCurrentTask({
                                    ...currentTask,
                                    description: e.target.value,
                                })
                            }
                        />
                    </div>
                    <div className="flex flex-col items-start gap-2">
                        <Label htmlFor="category" className="text-right">
                            Categories
                        </Label>
                        <div className="flex gap-2 flex-wrap">
                            {categories?.data?.map(
                                (category: any, idx: number) => (
                                    <div
                                        key={idx}
                                        className="flex gap-1 items-center"
                                    >
                                        <Checkbox
                                            id={category.name}
                                            defaultChecked={currentTask?.categories
                                                .map(
                                                    (category: any) =>
                                                        category._id
                                                )
                                                .includes(category._id)}
                                            onCheckedChange={(value) => {
                                                if (value) {
                                                    // User checked the category
                                                    setTaskCategories([
                                                        ...taskCategories,
                                                        category._id!,
                                                    ]);
                                                } else {
                                                    // User unchecked the category
                                                    setTaskCategories(
                                                        taskCategories.filter(
                                                            (cat) =>
                                                                cat !==
                                                                category._id
                                                        )
                                                    );
                                                }
                                            }}
                                        />
                                        <label
                                            htmlFor={category.name}
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            {category.name}
                                        </label>
                                    </div>
                                )
                            )}
                        </div>
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                        <Label htmlFor="state" className="text-right">
                            Status
                        </Label>
                        <Select
                            defaultValue={currentTask?.status}
                            onValueChange={(value) =>
                                setCurrentTask({
                                    ...currentTask,
                                    status: value,
                                })
                            }
                        >
                            <SelectTrigger className="w-[180px]">
                                <SelectValue placeholder="Todo" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    {todoStatuses.map((todo) => {
                                        return (
                                            <SelectItem value={todo} key={todo}>
                                                {todo}
                                            </SelectItem>
                                        );
                                    })}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                        <Label htmlFor="deadline" className="text-right">
                            Due date
                        </Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    className={cn(
                                        "w-[180px] justify-start text-left font-normal",
                                        !currentTask?.dueDate &&
                                            "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {currentTask?.dueDate ? (
                                        format(currentTask?.dueDate, "PPP")
                                    ) : (
                                        <span>Pick a date</span>
                                    )}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent
                                className="w-auto p-0"
                                align="start"
                            >
                                <Calendar
                                    mode="single"
                                    selected={currentTask?.dueDate}
                                    onSelect={(value) => {
                                        setCurrentTask({
                                            ...currentTask,
                                            dueDate: value,
                                        });
                                    }}
                                    initialFocus
                                    disabled={(date) => date < new Date()}
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <DialogClose asChild>
                        <Button onClick={() => updateTask()}>Edit Task</Button>
                    </DialogClose>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default TasksTable;

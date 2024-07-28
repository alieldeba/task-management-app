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
    DropdownMenuSeparator,
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
import { TaskColors, TaskType } from "@/types";

function TasksTable({ tasks }: { tasks: TaskType[] }) {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const todoStatuses = ["Todo", "Working", "Done"];

    const taskColors: TaskColors = {
        Todo: "bg-blue-600",
        Working: "bg-orange-600",
        Done: "bg-green-600",
    };
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
                                    <TableHead>Task</TableHead>
                                    <TableHead>Status</TableHead>
                                    <TableHead>Created at</TableHead>
                                    <TableHead className="table-cell">
                                        Due date
                                    </TableHead>
                                    <TableHead>
                                        <span className="sr-only">Actions</span>
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tasks.map((task: TaskType, idx) => {
                                    return (
                                        <TableRow key={idx}>
                                            <TableCell className="font-medium">
                                                {task.name}
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
                                            <TableCell className="table-cell">
                                                {format(
                                                    task.createdDate,
                                                    "dd-MM-yyyy"
                                                )}
                                            </TableCell>
                                            <TableCell className="table-cell">
                                                {format(
                                                    task.deadline,
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
                                                            <DropdownMenuItem>
                                                                Edit
                                                            </DropdownMenuItem>
                                                        </DialogTrigger>
                                                        <AlertDialogTrigger className="w-full">
                                                            <DropdownMenuItem>
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
                            Showing <strong>{tasks.length}</strong> tasks
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
                        <AlertDialogAction>Continue</AlertDialogAction>
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
                        <Input id="name" className="col-span-3" />
                    </div>
                    <div className="w-full flex items-center justify-between gap-2">
                        <Label htmlFor="state" className="text-right">
                            Status
                        </Label>
                        <Select>
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
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? (
                                        format(date, "PPP")
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
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                    disabled={(date) =>
                                        date > new Date() ||
                                        date < new Date("1900-01-01")
                                    }
                                />
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>
                <DialogFooter>
                    <Button>Edit Task</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

export default TasksTable;

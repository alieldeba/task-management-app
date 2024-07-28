"use client";

import { CalendarIcon, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
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

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Calendar } from "@/components/ui/calendar";
import { format } from "date-fns";
import { tasks } from "@/data/tasks";
import TasksTable from "@/components/TasksTable";
import DashboardHeader from "@/components/DashboardHeader";

export default function Dashboard() {
    const [date, setDate] = React.useState<Date | undefined>(new Date());
    const todoStatuses = ["Todo", "Working", "Done"];

    return (
        <div className="flex min-h-screen w-full flex-col bg-muted/40">
            <div className="flex flex-col sm:gap-4 sm:py-4">
                <DashboardHeader />
                <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
                    <Tabs
                        defaultValue="all"
                        className="max-w-full overflow-auto"
                    >
                        <div className="flex items-center">
                            <TabsList>
                                <TabsTrigger value="all">All</TabsTrigger>
                                <TabsTrigger value="todo">Todo</TabsTrigger>
                                <TabsTrigger value="working">
                                    Working
                                </TabsTrigger>
                                <TabsTrigger value="done">Done</TabsTrigger>
                            </TabsList>
                            <div className="ml-auto flex items-center gap-2">
                                {/* <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="outline"
                                            size="sm"
                                            className="h-7 gap-1"
                                        >
                                            <ListFilter className="h-3.5 w-3.5" />
                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                                                Filter
                                            </span>
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent align="end">
                                        <DropdownMenuLabel>
                                            Filter by
                                        </DropdownMenuLabel>
                                        <DropdownMenuSeparator />
                                        <DropdownMenuCheckboxItem checked>
                                            Active
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Draft
                                        </DropdownMenuCheckboxItem>
                                        <DropdownMenuCheckboxItem>
                                            Archived
                                        </DropdownMenuCheckboxItem>
                                    </DropdownMenuContent>
                                </DropdownMenu> */}
                                <Dialog>
                                    <DialogTrigger asChild>
                                        <Button size="sm" className="h-7 gap-1">
                                            <PlusCircle className="h-3.5 w-3.5" />

                                            <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
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
                                                />
                                            </div>
                                            <div className="w-full flex items-center justify-between gap-2">
                                                <Label
                                                    htmlFor="state"
                                                    className="text-right"
                                                >
                                                    Status
                                                </Label>
                                                <Select>
                                                    <SelectTrigger className="w-[180px]">
                                                        <SelectValue placeholder="Todo" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        <SelectGroup>
                                                            {todoStatuses.map(
                                                                (todo) => {
                                                                    return (
                                                                        <SelectItem
                                                                            value={
                                                                                todo
                                                                            }
                                                                            key={
                                                                                todo
                                                                            }
                                                                        >
                                                                            {
                                                                                todo
                                                                            }
                                                                        </SelectItem>
                                                                    );
                                                                }
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
                                                    Dead Line
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
                                                            onSelect={setDate}
                                                            initialFocus
                                                            disabled={(date) =>
                                                                date >
                                                                    new Date() ||
                                                                date <
                                                                    new Date(
                                                                        "1900-01-01"
                                                                    )
                                                            }
                                                        />
                                                    </PopoverContent>
                                                </Popover>
                                            </div>
                                        </div>
                                        <DialogFooter>
                                            <Button>Add Task</Button>
                                        </DialogFooter>
                                    </DialogContent>
                                </Dialog>
                            </div>
                        </div>
                        <TabsContent value="all">
                            <TasksTable tasks={tasks} />
                        </TabsContent>
                        <TabsContent value="todo">
                            <TasksTable
                                tasks={tasks.filter(
                                    (task) => task.status === "Todo"
                                )}
                            />
                        </TabsContent>
                        <TabsContent value="working">
                            <TasksTable
                                tasks={tasks.filter(
                                    (task) => task.status === "Working"
                                )}
                            />
                        </TabsContent>
                        <TabsContent value="done">
                            <TasksTable
                                tasks={tasks.filter(
                                    (task) => task.status === "Done"
                                )}
                            />
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
    );
}

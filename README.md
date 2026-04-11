# Team Task Hub

Team Task Hub is a React + TypeScript application for managing projects and tasks.  
Users can create projects, add tasks to each project, edit and delete tasks, mark tasks as completed, search tasks, filter them by status and priority, and view simple dashboard statistics.

## Features

- View all projects
- Create a new project
- Select a project and view its tasks
- Add a new task
- Edit a task
- Delete a task
- Mark a task as completed / not completed
- Search tasks
- Filter tasks by status
- Filter tasks by priority
- View dashboard statistics

## Tech Stack

- React
- TypeScript
- Vite
- Zustand for global state management
- Zod for validation
- localStorage for data persistence
- Tailwind CSS
- shadcn/ui

## Project Structure

```bash
src/
  components/
    ui/
  features/
    projects/
    tasks/
  pages/
  shared/
    hooks/
    schemas/
    store/
    lib/
```

## Validation and Persistence

- Form validation is handled with **Zod**
- Projects and tasks are stored in **localStorage**
- Stored data is validated with typed parsing when read from localStorage
- Data persists after page refresh

## State Management

Global state is handled with **Zustand**.

The store manages:

- projects
- tasks
- selected project
- add / update / delete actions
- toggle complete action

## Getting Started

### Install dependencies

```bash
npm install
```

### Run the development server

```bash
npm run dev
```

### Build the project

```bash
npm run build
```

### Preview production build

```bash
npm run preview
```

## Author

Hafrún Harðardóttir

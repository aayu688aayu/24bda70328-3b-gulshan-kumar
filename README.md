# Library Management System

A library management application built using Next.js 15, React 19, TypeScript, and Tailwind CSS.  
The application provides an intuitive interface for managing a book collection with features such as borrowing, returning, categorization, filtering, and real-time search.


## Overview

This system allows users to manage books efficiently through a modern web interface.  
It supports CRUD operations, borrowing and returning functionality, status tracking, category organization, and real-time search.


## Features

### Core Functionality

- Add books with title, author, and category  
- Edit book details  
- Remove books from the collection  
- Real-time search by title or author  

### Advanced Features

- Borrow and return system with automatic 14-day due date  
- Status tracking for Available and Borrowed books  
- Predefined categories:
  - Fiction
  - Non-Fiction
  - Sci-Fi
  - Mystery
  - Biography
  - History
  - Technology
- Filter books by status (All, Available, Borrowed)  
- Statistics dashboard displaying:
  - Total books
  - Available books
  - Borrowed books  

### UI and Design

- Responsive layout for mobile and desktop  
- Clean modern interface  
- Smooth transitions and interactions  
- Icon integration  
- Color-coded status indicators  
- Accessible design with semantic HTML  


## Getting Started

### Prerequisites

- Node.js 18 or higher  
- pnpm (recommended) or npm/yarn  

### Installation

1. Navigate to the project directory:

```
cd 24BDA70006-3b-Pritesh-Kumar-Pandey
```

2. Install dependencies:

```
pnpm install
```

3. Approve build scripts if prompted:

```
pnpm approve-builds
```

### Running the Application

Start the development server:

```
pnpm dev
```

Open the application in your browser:

http://localhost:3000

### Build for Production

```
pnpm build
pnpm start
```

## Technologies Used

- Next.js 15+
- React 19+
- TypeScript 5+
- Tailwind CSS 3.4+
- shadcn/ui
- Lucide React
- Radix UI
- pnpm


## Available Scripts

pnpm dev – Start development server  
pnpm build – Build for production  
pnpm start – Start production server  
pnpm lint – Run ESLint  


## Usage Guide

### Adding a Book
Enter title, author, and category, then click Add Book.  
The book appears with Available status.

### Borrowing a Book
Click Borrow on a book card.  
Status changes to Borrowed with a due date 14 days ahead.

### Returning a Book
Click Return on a borrowed book.  
Status changes back to Available.

### Editing a Book
Click the Edit option, modify details, and save changes.

### Searching and Filtering
Use the search bar to filter by title or author.  
Use the status filter to display Available or Borrowed books.


## Conclusion

This project demonstrates the implementation of a modern web application using Next.js and React.  
It showcases state management, component-based architecture, responsive design, and structured project organization.

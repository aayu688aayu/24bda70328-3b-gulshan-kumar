"use client";

import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { LibraryButton } from "@/components/library-button";

// Icons
import { BookOpen, User, Plus, Search, Trash2, Edit2, Calendar, Filter } from "lucide-react";

type BookStatus = "Available" | "Borrowed";

type Book = {
  id: number;
  title: string;
  author: string;
  category: string;
  status: BookStatus;
  dueDate: string | null; // ISO Date string
};

const CATEGORIES = ["Fiction", "Non-Fiction", "Sci-Fi", "Mystery", "Biography", "History", "Technology"];

export default function LibraryPage() {
  // State
  const [books, setBooks] = useState<Book[]>([]);
  
  // Form State
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);

  // Filter/Search State
  const [searchQuery, setSearchQuery] = useState("");
  const [filterStatus, setFilterStatus] = useState<"All" | BookStatus>("All");
  
  // Edit State
  const [editingId, setEditingId] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editAuthor, setEditAuthor] = useState("");
  const [editCategory, setEditCategory] = useState("");

  // Statistics
  const totalBooks = books.length;
  const borrowedBooks = books.filter(b => b.status === "Borrowed").length;
  const availableBooks = totalBooks - borrowedBooks;

  // Load initial sample data if empty (optional, for demo)
  useEffect(() => {
    if (books.length === 0) {
      // You could load from local storage here
    }
  }, []);

  // --- Actions ---

  const handleAddBook = () => {
    if (!title.trim() || !author.trim()) return;

    const newBook: Book = {
      id: Date.now(),
      title: title.trim(),
      author: author.trim(),
      category,
      status: "Available",
      dueDate: null,
    };

    setBooks([newBook, ...books]);
    setTitle("");
    setAuthor("");
    setCategory(CATEGORIES[0]);
  };

  const handleRemoveBook = (id: number) => {
    setBooks(books.filter((b) => b.id !== id));
    if (editingId === id) cancelEdit();
  };

  const handleBorrowBook = (id: number) => {
    const dueDate = new Date();
    dueDate.setDate(dueDate.getDate() + 14); // 2 weeks from now

    setBooks(books.map(b => 
      b.id === id ? { ...b, status: "Borrowed", dueDate: dueDate.toISOString() } : b
    ));
  };

  const handleReturnBook = (id: number) => {
    setBooks(books.map(b => 
      b.id === id ? { ...b, status: "Available", dueDate: null } : b
    ));
  };

  // --- Edit Logic ---

  const startEdit = (book: Book) => {
    setEditingId(book.id);
    setEditTitle(book.title);
    setEditAuthor(book.author);
    setEditCategory(book.category);
  };

  const saveEdit = () => {
    if (!editTitle.trim() || !editAuthor.trim()) return;

    setBooks(books.map(b => 
      b.id === editingId ? { ...b, title: editTitle, author: editAuthor, category: editCategory } : b
    ));
    cancelEdit();
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditTitle("");
    setEditAuthor("");
    setEditCategory("");
  };

  // --- Filtering ---

  const filteredBooks = books.filter(book => {
    const matchesSearch = 
      book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      book.author.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = filterStatus === "All" || book.status === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  // --- Render Helpers ---

  const formatDate = (dateStr: string | null) => {
    if (!dateStr) return "-";
    return new Date(dateStr).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getStatusColor = (status: BookStatus) => {
    return status === "Available" 
      ? "bg-green-100 text-green-700 border-green-200" 
      : "bg-amber-100 text-amber-700 border-amber-200";
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-slate-100 p-4 sm:p-8 font-sans text-slate-900">
      <div className="mx-auto max-w-6xl space-y-8">
        
        {/* Header Section */}
        <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 flex items-center gap-3">
              <BookOpen className="h-10 w-10 text-blue-600" />
              Library System
            </h1>
            <p className="text-slate-500 mt-2">Manage your collection efficiently.</p>
          </div>
          
          {/* Stats Cards */}
          <div className="flex gap-4">
            <StatsCard label="Total" value={totalBooks} />
            <StatsCard label="Available" value={availableBooks} color="text-green-600" />
            <StatsCard label="Borrowed" value={borrowedBooks} color="text-amber-600" />
          </div>
        </header>

        {/* Add Book Section */}
        <Card className="border-slate-200 shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Plus className="h-5 w-5 text-blue-600" />
              Add New Book
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-4 sm:grid-cols-4 items-end">
              <div className="sm:col-span-1">
                <Input 
                  placeholder="Title" 
                  value={title} 
                  onChange={(e) => setTitle(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <Input 
                  placeholder="Author" 
                  value={author} 
                  onChange={(e) => setAuthor(e.target.value)}
                  className="bg-white"
                />
              </div>
              <div className="sm:col-span-1">
                <select 
                  className="flex h-10 w-full items-center justify-between rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <Button onClick={handleAddBook} className="w-full bg-blue-600 hover:bg-blue-700 transition-colors">
                <Plus className="mr-2 h-4 w-4" /> Add Book
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Controls Section (Search & Filter) */}
        <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-white/80 backdrop-blur-sm p-4 rounded-lg border border-slate-200 shadow-lg">
          <div className="relative w-full sm:w-96">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input 
              placeholder="Search by title or author..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9 bg-white"
            />
          </div>
          
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-slate-500" />
            <select 
              className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value as any)}
            >
              <option value="All">All Status</option>
              <option value="Available">Available</option>
              <option value="Borrowed">Borrowed</option>
            </select>
          </div>
        </div>

        {/* Books Grid */}
        <section>
          {filteredBooks.length === 0 ? (
            <div className="text-center py-20 bg-white/60 backdrop-blur-sm rounded-lg border border-dashed border-slate-300">
              <BookOpen className="h-12 w-12 text-slate-300 mx-auto mb-3" />
              <p className="text-slate-500 font-medium">No books found matching your criteria.</p>
              {books.length === 0 && <p className="text-slate-400 text-sm mt-1">Start by adding a book above.</p>}
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="overflow-hidden hover:shadow-xl transition-all duration-300 group border-slate-200 bg-white/90 backdrop-blur-sm hover:-translate-y-1">
                  {editingId === book.id ? (
                    // Edit Mode
                    <div className="p-4 space-y-3 bg-slate-50/50 h-full flex flex-col">
                      <div className="flex-1 space-y-3">
                        <Input value={editTitle} onChange={(e) => setEditTitle(e.target.value)} placeholder="Title" autoFocus />
                        <Input value={editAuthor} onChange={(e) => setEditAuthor(e.target.value)} placeholder="Author" />
                        <select 
                          className="w-full h-10 rounded-md border border-input px-3 text-sm bg-white"
                          value={editCategory}
                          onChange={(e) => setEditCategory(e.target.value)}
                        >
                          {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                        </select>
                      </div>
                      <div className="flex gap-2 mt-4">
                        <Button size="sm" onClick={saveEdit} className="flex-1 bg-green-600 hover:bg-green-700">Save</Button>
                        <Button size="sm" variant="outline" onClick={cancelEdit} className="flex-1">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    // View Mode
                    <>
                      <div className={`h-2 w-full transition-all ${book.status === 'Available' ? 'bg-gradient-to-r from-green-400 to-green-600' : 'bg-gradient-to-r from-amber-400 to-amber-600'}`} />
                      <CardContent className="p-5">
                        <div className="flex justify-between items-start mb-3">
                          <span className={`px-2.5 py-1 rounded-full text-xs font-semibold border ${getStatusColor(book.status)}`}>
                            {book.status}
                          </span>
                          <span className="text-xs text-slate-500 font-medium px-2.5 py-1 bg-slate-100 rounded-full">
                            {book.category}
                          </span>
                        </div>
                        
                        <h3 className="font-bold text-lg leading-tight text-slate-800 mb-2 line-clamp-2" title={book.title}>
                          {book.title}
                        </h3>
                        <p className="text-slate-500 text-sm mb-4 flex items-center gap-1.5">
                          <User className="h-3.5 w-3.5" /> {book.author}
                        </p>

                        {book.status === 'Borrowed' && (
                          <div className="mb-4 text-xs bg-amber-50 text-amber-800 p-2.5 rounded-lg flex items-center gap-2 border border-amber-200">
                            <Calendar className="h-3.5 w-3.5" />
                            <span className="font-medium">Due: {formatDate(book.dueDate)}</span>
                          </div>
                        )}

                        <div className="flex gap-2 mt-4 pt-4 border-t border-slate-100">
                           {book.status === 'Available' ? (
                             <Button 
                               size="sm" 
                               variant="outline" 
                               className="flex-1 text-green-700 hover:text-green-800 hover:bg-green-50 border-green-200 font-medium"
                               onClick={() => handleBorrowBook(book.id)}
                             >
                               Borrow
                             </Button>
                           ) : (
                             <Button 
                               size="sm" 
                               variant="outline"
                               className="flex-1 text-amber-700 hover:text-amber-800 hover:bg-amber-50 border-amber-200 font-medium"
                               onClick={() => handleReturnBook(book.id)}
                             >
                               Return
                             </Button>
                           )}
                           
                           <div className="flex gap-1">
                             <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-blue-600 hover:bg-blue-50" onClick={() => startEdit(book)}>
                               <Edit2 className="h-4 w-4" />
                             </Button>
                             <Button size="icon" variant="ghost" className="h-8 w-8 text-slate-400 hover:text-red-600 hover:bg-red-50" onClick={() => handleRemoveBook(book.id)}>
                               <Trash2 className="h-4 w-4" />
                             </Button>
                           </div>
                        </div>
                      </CardContent>
                    </>
                  )}
                </Card>
              ))}
            </div>
          )}
        </section>
      </div>
    </main>
  );
}

// Stats Card Component
function StatsCard({ label, value, color = "text-slate-900" }: { label: string, value: number, color?: string }) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-lg border border-slate-200 p-3 sm:px-5 sm:py-3 shadow-lg min-w-[100px] text-center sm:text-left hover:shadow-xl transition-shadow">
      <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">{label}</p>
      <p className={`text-2xl font-bold ${color}`}>{value}</p>
    </div>
  );
}

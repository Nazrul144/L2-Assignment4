import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import { toast } from "react-toastify";

interface Book {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description: string;
  copies: number;
  available: boolean;
  createdAt: string;
  updatedAt: string;
}

const AddBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [editingBook, setEditingBook] = useState<Book | null>(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  // Form state for edit/add (you can separate if needed)
  const [form, setForm] = useState({
    title: "",
    author: "",
    genre: "",
    isbn: "",
    description: "",
    copies: 0,
  });

  useEffect(() => {
    fetch("https://library-management-api-five.vercel.app/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  const openAddDialog = () => {
    setForm({
      title: "",
      author: "",
      genre: "",
      isbn: "",
      description: "",
      copies: 0,
    });
    setIsAddDialogOpen(true);
  };

  const handleEditClick = (book: Book) => {
    setEditingBook(book);
    setForm({
      title: book.title,
      author: book.author,
      genre: book.genre,
      isbn: book.isbn,
      description: book.description,
      copies: book.copies,
    });
    setIsEditDialogOpen(true);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "copies" ? Number(value) : value,
    }));
  };

  const handleEditSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBook) return;

    const updatedBook = {
      ...editingBook,
      ...form,
      available: form.copies > 0,
    };

    try {
      const res = await fetch(
        `https://library-management-api-five.vercel.app/api/books/${editingBook._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedBook),
        }
      );
      if (!res.ok) throw new Error("Failed to update book");

      setBooks((prev) =>
        prev.map((b) => (b._id === editingBook._id ? updatedBook : b))
      );
      setIsEditDialogOpen(false);
      setEditingBook(null);
    } catch (error) {
      console.error(error);
      alert("Failed to update book");
    }
  };

  const handleAddSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Add business logic for available
    const newBook = {
      ...form,
      available: form.copies > 0,
    };

    try {
      const res = await fetch(
        "https://library-management-api-five.vercel.app/api/books",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newBook),
        }
      );
      if (!res.ok) throw new Error("Failed to add book");

      const createdBook = await res.json();

      setBooks((prev) => [...prev, createdBook.data]);
      setIsAddDialogOpen(false);
    } catch (error) {
      console.error(error);
      alert("Failed to add book");
    }
  };

  const handleDeleteClick = async (bookId: string) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success"
        });
      }
    });

    try {
      const res = await fetch(`https://library-management-api-five.vercel.app/api/books/${bookId}`,
        {
          method: "DELETE",
        }
      );
      if (res.ok) {
        toast.success("Book deleted successfully");
      }
      else if (!res.ok) {
        toast.error("Failed to delete book");
      }

      setBooks((prev) => prev.filter((book) => book._id !== bookId));
    } catch (error) {
      console.error(error);
      toast.error("Failed to delete book");
    }
  }

  return (
    <div>
      <div className="container mx-auto p-4 gap-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <h1 className="font-bold text-xl">Book List</h1>

          {/* Add New Book Dialog */}
          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button
                variant="outline"
                className="font-bold bg-amber-400 cursor-pointer"
                onClick={openAddDialog}
              >
                Add New Book
              </Button>
            </DialogTrigger>

            <DialogContent className="sm:max-w-[425px]">
              <form onSubmit={handleAddSubmit}>
                <DialogHeader>
                  <DialogTitle>Add New Book</DialogTitle>
                  <DialogDescription>
                    Fill the form to add a new book.
                  </DialogDescription>
                </DialogHeader>

                <div className="grid gap-4">
                  {/* Inputs same as edit form */}
                  <div className="grid gap-2">
                    <Label htmlFor="title">Title</Label>
                    <Input
                      id="title"
                      name="title"
                      value={form.title}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="author">Author</Label>
                    <Input
                      id="author"
                      name="author"
                      value={form.author}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="genre">Genre</Label>
                    <Input
                      id="genre"
                      name="genre"
                      value={form.genre}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="isbn">ISBN</Label>
                    <Input
                      id="isbn"
                      name="isbn"
                      value={form.isbn}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="description">Description</Label>
                    <Input
                      id="description"
                      name="description"
                      value={form.description}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="copies">Copies</Label>
                    <Input
                      type="number"
                      id="copies"
                      name="copies"
                      value={form.copies}
                      onChange={handleInputChange}
                      min={0}
                      required
                    />
                  </div>
                </div>

                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Add Book</Button>
                </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
        </div>

        {/* Edit Book Dialog */}
        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent className="sm:max-w-[425px]">
            <form onSubmit={handleEditSubmit}>
              <DialogHeader>
                <DialogTitle>Edit Book</DialogTitle>
                <DialogDescription>
                  Update book details and click save.
                </DialogDescription>
              </DialogHeader>

              <div className="grid gap-4">
                {/* Inputs same as add form */}
                <div className="grid gap-2">
                  <Label htmlFor="title-edit">Title</Label>
                  <Input
                    id="title-edit"
                    name="title"
                    value={form.title}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="author-edit">Author</Label>
                  <Input
                    id="author-edit"
                    name="author"
                    value={form.author}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="genre-edit">Genre</Label>
                  <Input
                    id="genre-edit"
                    name="genre"
                    value={form.genre}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="isbn-edit">ISBN</Label>
                  <Input
                    id="isbn-edit"
                    name="isbn"
                    value={form.isbn}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="description-edit">Description</Label>
                  <Input
                    id="description-edit"
                    name="description"
                    value={form.description}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="copies-edit">Copies</Label>
                  <Input
                    type="number"
                    id="copies-edit"
                    name="copies"
                    value={form.copies}
                    onChange={handleInputChange}
                    min={0}
                    required
                  />
                </div>
              </div>

              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Update Book</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>

        {/* Book Table */}
        <Table>
          <TableCaption>Complete list of books available in the library.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold">Title</TableHead>
              <TableHead className="font-bold">Author</TableHead>
              <TableHead className="font-bold">Genre</TableHead>
              <TableHead className="text-right font-bold">ISBN</TableHead>
              <TableHead className="text-right font-bold">Copies</TableHead>
              <TableHead className="text-right font-bold">Status</TableHead>
              <TableHead className="text-right font-bold">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {books.map((book) => (
              <TableRow key={book._id}>
                <TableCell className="font-medium">{book.title}</TableCell>
                <TableCell>{book.author}</TableCell>
                <TableCell>{book.genre}</TableCell>
                <TableCell className="text-right">{book.isbn}</TableCell>
                <TableCell className="text-right">{book.copies}</TableCell>
                <TableCell className="text-right">
                  {book.available ? "Yes" : "No"}
                </TableCell>
                <TableCell className="text-right space-x-2 flex justify-end items-center">
                  <button
                    className="btn btn-sm btn-primary"
                    onClick={() => handleEditClick(book)}
                  >
                    Edit
                  </button>
                  <button onClick={() => handleDeleteClick(book._id)} className="btn btn-sm btn-error">Delete</button>
                  <button
                    className="btn btn-sm btn-success"
                    disabled={!book.available}
                  >
                    Borrow
                  </button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default AddBooks;

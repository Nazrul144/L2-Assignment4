import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "../ui/dialog";
import { Label } from "../ui/label";

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

  useEffect(() => {
    fetch("https://library-management-api-five.vercel.app/api/books")
      .then((res) => res.json())
      .then((data) => setBooks(data.data))
      .catch((error) => console.error("Error fetching books:", error));
  }, []);

  return (
    <div>
      <div className="container mx-auto p-4 gap-4 mt-8">
        <div className="flex justify-between items-center mb-4">
          <div><h1 className="font-bold text-2xl">Book List</h1></div>
          <div> <Dialog>
            <form>
              <DialogTrigger asChild>
                <Button variant="outline">Open Dialog</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Edit profile</DialogTitle>
                  <DialogDescription>
                    Make changes to your profile here. Click save when you&apos;re
                    done.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-4">
                  <div className="grid gap-3">
                    <Label htmlFor="name-1">Name</Label>
                    <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
                  </div>
                  <div className="grid gap-3">
                    <Label htmlFor="username-1">Username</Label>
                    <Input id="username-1" name="username" defaultValue="@peduarte" />
                  </div>
                </div>
                <DialogFooter>
                  <DialogClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DialogClose>
                  <Button type="submit">Save changes</Button>
                </DialogFooter>
              </DialogContent>
            </form>
          </Dialog></div>
        </div>
        <Table>
          <TableCaption>Complete list of books available in the library.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px] font-bold text-xl">Title</TableHead>
              <TableHead className="font-bold text-xl">Author</TableHead>
              <TableHead className="font-bold text-xl">Genre</TableHead>
              <TableHead className="text-right font-bold text-xl">ISBN</TableHead>
              <TableHead className="text-right font-bold text-xl">Copies</TableHead>
              <TableHead className="text-right font-bold text-xl">Status</TableHead>
              <TableHead className="text-right font-bold text-xl">Action</TableHead>
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
                <TableCell className="text-right space-x-2">
                  <button className="btn btn-sm btn-primary">Edit</button>
                  <button className="btn btn-sm btn-error">Delete</button>
                  <button className="btn btn-sm btn-success" disabled={!book.available}>
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

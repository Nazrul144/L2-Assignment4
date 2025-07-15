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
      <div>
        <div>
          <div>Book List</div>
          <div><Button></Button></div>
        </div>
        <Table>
          <TableCaption>A list of your recent invoices.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Title</TableHead>
              <TableHead>Author</TableHead>
              <TableHead>Genre</TableHead>
              <TableHead className="text-right">ISBN</TableHead>
              <TableHead className="text-right">Copies</TableHead>
              <TableHead className="text-right">Status</TableHead>
              <TableHead className="text-right">Action</TableHead>
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
                  <Button className="btn btn-sm btn-primary">Edit</Button>
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

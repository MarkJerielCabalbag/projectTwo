import { useQuery, useMutation } from "@tanstack/react-query";

async function createBook(formData) {
  return await fetch("http://localhost:8000/api/book/createBook", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(formData),
  }).then(async (res) => {
    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "An Error Occured");
    }
    return response;
  });
}

async function getBooks() {
  return await fetch("http://localhost:8000/api/book/getBooks").then((res) =>
    res.json()
  );
}

async function deleteBook(bookId) {
  try {
    const res = await fetch(
      `http://localhost:8000/api/book/deleteBook/${bookId}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      // Handle non-JSON response
      const text = await res.text();
      throw new Error(`Unexpected response: ${text}`);
    }

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "An error occurred");
    }

    return response;
  } catch (error) {
    console.error("Error deleting the book:", error);
    throw error;
  }
}

async function editBook({ id, bookTitle, bookAuthor, bookPublishYear }) {
  try {
    const res = await fetch(`http://localhost:8000/api/book/updateBook/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id, bookAuthor, bookTitle, bookPublishYear }),
    });

    const contentType = res.headers.get("content-type");

    if (!contentType || !contentType.includes("application/json")) {
      // Handle non-JSON response
      const text = await res.text();
      throw new Error(`Unexpected response: ${text}`);
    }

    const response = await res.json();

    if (!res.ok) {
      throw new Error(response.message || "An error occurred");
    }

    return response;
  } catch (error) {
    console.error("Error updating the book:", error);
    throw error;
  }
}

export const useCreateBook = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: createBook,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useGetBooks = ({ onSuccess, onError }) => {
  return useQuery({
    queryKey: ["book"],
    queryFn: getBooks,
    onSuccess: onSuccess,
    onError: onError,
  });
};

export const useDeleteBook = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: deleteBook,
    onSuccess,
    onError,
  });
};

export const useUpdateBook = ({ onSuccess, onError }) => {
  return useMutation({
    mutationFn: editBook,
    onSuccess,
    onError,
  });
};

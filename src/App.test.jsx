import App from "./App";
import { test, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom/vitest';

test("renders header", () => {
    render(<App />);
    const header = screen.getByText(/My Todolist/i);
    expect(header).toBeInTheDocument();
});

test("add todo", () => {
    render(<App />);
    const desc = screen.getByPlaceholderText("Description"); //declaring variables
    const date = screen.getByPlaceholderText("Date");
    const add = screen.getByText("Add");
    const clear = screen.getByText("Clear");
    const table = screen.getByRole("table");

    fireEvent.change(desc, { target: { value: "Go to coffee" } }); //filling fields
    fireEvent.change(date, { target: { value: "29.01.2023" } });
    fireEvent.click(add);    //adding todos
    fireEvent.change(desc, { target: { value: "qwerty" } });
    fireEvent.click(add);
    fireEvent.change(date, { target: { value: "asdf" } });
    fireEvent.click(add);

    expect(table).toHaveTextContent(/go to coffee/i); //testing if added todos exist
    expect(table).toHaveTextContent(/qwerty/i);
    expect(table).toHaveTextContent(/asdf/i);
    fireEvent.click(clear); //clearing todos
    expect(table).not.toHaveTextContent(/go to coffee/i); //testing if added todos are cleared
    expect(table).not.toHaveTextContent(/qwerty/i);
    expect(table).not.toHaveTextContent(/asdf/i);
});
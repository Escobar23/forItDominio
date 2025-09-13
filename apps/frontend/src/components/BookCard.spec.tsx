import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, test, expect, vi } from "vitest";
import { BookCard } from "./BookCard";

describe("BookCard", () => {
  test("deshabilita Prestar cuando no hay copias", async () => {
    const onBorrow = vi.fn();
    const onReturn = vi.fn();
    render(
      <BookCard
        book={{ id: "2", title: "1984", author: "George Orwell", state: "RETURNED", availableCopies: 0 }}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );
    expect(screen.getByRole("button", { name: /prestar/i })).toBeDisabled();
  });

  test("llama onBorrow cuando hay copias", async () => {
    const onBorrow = vi.fn();
    const onReturn = vi.fn();
    render(
      <BookCard
        book={{ id: "1", title: "El Principito", author: "Antoine de Saint-Exupéry", state: "RETURNED", availableCopies: 2 }}
        onBorrow={onBorrow}
        onReturn={onReturn}
      />
    );
    await userEvent.click(screen.getByRole("button", { name: /prestar/i }));
    expect(onBorrow).toHaveBeenCalledWith("1");
  });
});

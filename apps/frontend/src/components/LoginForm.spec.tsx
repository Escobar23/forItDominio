import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { expect, test, describe, vi } from "vitest";
import { LoginForm } from "./LoginForm";

describe("LoginForm", () => {
  test("envía email y password", async () => {
    const onSubmit = vi.fn();
    render(<LoginForm onSubmit={onSubmit} />);

    await userEvent.clear(screen.getByPlaceholderText("email"));
    await userEvent.type(screen.getByPlaceholderText("email"), "user@test.com");
    await userEvent.clear(screen.getByPlaceholderText("password"));
    await userEvent.type(screen.getByPlaceholderText("password"), "abcd");
    await userEvent.click(screen.getByRole("button", { name: /ingresar/i }));

    expect(onSubmit).toHaveBeenCalledWith("user@test.com", "abcd");
  });
});

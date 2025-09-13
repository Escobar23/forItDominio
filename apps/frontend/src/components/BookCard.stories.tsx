import type { Meta, StoryObj } from "@storybook/react";
import { BookCard } from "./BookCard";

const meta: Meta<typeof BookCard> = {
  title: "Books/BookCard",
  component: BookCard,
};
export default meta;
type Story = StoryObj<typeof BookCard>;

export const Disponible: Story = {
  args: {
    book: {
      id: "1",
      title: "El Principito",
      author: "Antoine de Saint-Exupéry",
      state: "RETURNED",
      availableCopies: 3,
    },
    onBorrow: async () => {},
    onReturn: async () => {},
  },
};

export const SinCopias: Story = {
  args: {
    book: {
      id: "2",
      title: "1984",
      author: "George Orwell",
      state: "RETURNED",
      availableCopies: 0,
    },
    onBorrow: async () => {},
    onReturn: async () => {},
  },
};

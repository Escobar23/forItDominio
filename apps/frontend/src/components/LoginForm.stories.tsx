import type { Meta, StoryObj } from "@storybook/react";
import { LoginForm } from "./LoginForm";

const meta: Meta<typeof LoginForm> = {
  title: "Auth/LoginForm",
  component: LoginForm,
};
export default meta;
type Story = StoryObj<typeof LoginForm>;

export const Default: Story = {
  args: { onSubmit: async () => {}, loading: false, error: null },
};

export const Loading: Story = {
  args: { onSubmit: async () => {}, loading: true, error: null },
};

export const Error: Story = {
  args: { onSubmit: async () => {}, loading: false, error: "Credenciales inválidas" },
};

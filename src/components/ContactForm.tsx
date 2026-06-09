"use client";

import { useForm } from "react-hook-form";

type ContactFormValues = {
  name: string;
  email: string;
  message: string;
};

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<ContactFormValues>({
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (values: ContactFormValues) => {
    console.log("Form values:", values);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="rounded-md border border-neutral-gray bg-white p-6 shadow-xl"
      noValidate
    >
      <h2 className="text-2xl font-black text-text-default">Validated form</h2>
      <p className="mt-2 text-sm leading-6 text-text-secondary">
        Built with react-hook-form. Replace this with your real form.
      </p>

      <div className="mt-6 space-y-4">
        <FieldError message={errors.name?.message} />
        <label className="block">
          <span className="text-sm font-semibold text-text-default">Name</span>
          <input
            className="mt-2 w-full rounded-md border border-neutral-gray bg-bg px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="Your name"
            {...register("name", { required: "Name is required." })}
          />
        </label>

        <FieldError message={errors.email?.message} />
        <label className="block">
          <span className="text-sm font-semibold text-text-default">Email</span>
          <input
            className="mt-2 w-full rounded-md border border-neutral-gray bg-bg px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="you@example.com"
            type="email"
            {...register("email", {
              required: "Email is required.",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Enter a valid email address.",
              },
            })}
          />
        </label>

        <FieldError message={errors.message?.message} />
        <label className="block">
          <span className="text-sm font-semibold text-text-default">Message</span>
          <textarea
            className="mt-2 min-h-32 w-full resize-y rounded-md border border-neutral-gray bg-bg px-4 py-3 outline-none transition focus:border-primary focus:ring-2 focus:ring-primary/20"
            placeholder="How can we help?"
            {...register("message", {
              required: "Message is required.",
              minLength: {
                value: 10,
                message: "Message must be at least 10 characters.",
              },
            })}
          />
        </label>
      </div>

      {isSubmitSuccessful ? (
        <p className="mt-4 rounded-md bg-success/15 px-4 py-3 text-sm font-semibold text-text-default">
          Form submitted successfully.
        </p>
      ) : null}

      <button
        type="submit"
        className="mt-6 w-full rounded-md bg-primary px-5 py-3 font-bold text-white transition hover:bg-secondary"
      >
        Submit
      </button>
    </form>
  );
}

function FieldError({ message }: { message?: string }) {
  if (!message) return null;

  return (
    <p className="rounded-md bg-error/10 px-3 py-2 text-sm font-semibold text-error">
      {message}
    </p>
  );
}

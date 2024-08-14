"use client";

import * as Yup from "yup";
import { Button } from "@/components/ui/button";
import { useFormik } from "formik";

interface InputType {
  type?: string;
  name: string;
  value: string | number;
  placeholder: string;
  touched?: boolean | undefined;
  error?: string | undefined;
}

const FormSection = () => {
  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(2, "Name must be at least 2 characters")
      .trim()
      .matches(
        /^[A-Za-z]+(?: [A-Za-z]+)*$/,
        "Invalid name: Only alphabetic characters and a single space between the names are allowed"
      ),
    email: Yup.string()
      .email("Invalid email address")
      .matches(
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Invalid email address"
      )
      .required("Email is required"),
    message: Yup.string()
      .min(10, "Message must be at least 10 characters")
      .max(200, "Message can be of atmost 200 characters")
      .required("Message is required"),
  });

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },

    validationSchema,
    onSubmit: async (values, { resetForm }) => {
      try {
        resetForm();
      } catch (error) {
        console.error(error);
      }
    },
  });

  const inputTemplate = ({
    type = "text",
    name,
    value,
    placeholder,
    touched,
    error,
  }: InputType) => (
    <div className="w-full mb-5 flex flex-col gap-3">
      <label className="text-base">{placeholder}</label>

      <input
        type={type}
        name={name}
        value={value}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        className="w-full border border-seperator outline-none bg-[#1612215E] text-white rounded-md p-4"
      />
      {touched && error && <div className=" text-sm text-red-600">{error}</div>}
    </div>
  );

  return (
    <section className="h-full py-9 px-5 sm:px-10 border border-seperator backdrop-filter backdrop-blur-lg bg-opacity-20 bg-[#333] rounded-3xl flex flex-col items-center justify-center">
      <h1 className="mb-6 text-2xl text-center">Contact Us</h1>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit();
        }}
        className="w-full"
      >
        {inputTemplate({
          name: "name",
          placeholder: "Name",
          value: formik.values.name,
          touched: formik.touched.name,
          error: formik.errors.name,
        })}

        {inputTemplate({
          name: "email",
          placeholder: "Email",
          value: formik.values.email,
          touched: formik.touched.email,
          error: formik.errors.email,
        })}

        <div className="w-full mb-10 flex flex-col gap-3">
          <label className="text-base">Message</label>

          <textarea
            name="message"
            value={formik.values.message}
            rows={3}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            className="w-full border border-seperator outline-none bg-[#1612215E] text-white rounded-md p-2"
          />
          {formik.touched.message && formik.errors.message && (
            <div className="text-sm text-red-600">{formik.errors.message}</div>
          )}
        </div>

        <Button variant="primary" type="submit" className="h-[3.125rem]">
          Submit
        </Button>
      </form>
    </section>
  );
};

export default FormSection;

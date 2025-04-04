import { useRef } from "react";
import { addTodo } from "../api/POST";
import { ToastContainer, toast } from "react-toastify";

export default function AddTodo() {
  const titleRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLInputElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  async function handleAddNewTodo() {
    try {
      const newTodoData = {
        title: titleRef?.current?.value,
        body: bodyRef?.current?.value,
      };

      const { data: newTodo, error } = await addTodo(newTodoData);

      if (error) {
        toast(error, {
          type: "error",
        });
        throw Error(error);
      }

      toast(`New todo added with title: ${newTodo?.title}`, {
        type: "success",
      });
    } catch (error) {
      console.error(error);
    } finally {
      formRef?.current?.reset();
    }
  }

  return (
    <section>
      <form ref={formRef}>
        <button type="button" onClick={handleAddNewTodo}>
          Add new todo
        </button>
        <label htmlFor="title" />
        <input type="text" name="title" ref={titleRef} />

        <label htmlFor="body" />
        <input type="text" name="body" ref={bodyRef} />
      </form>
      <ToastContainer />
    </section>
  );
}

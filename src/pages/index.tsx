import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";
import { useState } from "react";
import toast from "react-hot-toast";
import { api } from "~/utils/api";

const CreateSubscription = () => {
  const [input, setInput] = useState("");
  const ctx = api.useContext();
  const { mutate, isLoading: isSubscribing } =
    api.subscriptions.create.useMutation({
      onSuccess: () => {
        setInput("");
        ctx.subscriptions.getAll.invalidate();
      },
      onError: (error) => {
        const defaultErrorMessage = "Something went wrong";
        const zodErrorMessage = error.data?.zodError?.fieldErrors.content;
        const prismaErrorMessage = error.message;
        if (zodErrorMessage) {
          toast.error(zodErrorMessage.join(". "));
        } else if (prismaErrorMessage) {
          toast.error(prismaErrorMessage);
        } else {
          toast.error(defaultErrorMessage);
        }
      },
    });

  return (
    <div className="flex gap-2">
      <input
        className="rounded-md border-2 border-blue-500 p-2 outline-none"
        type="text"
        value={input}
        placeholder="email"
        onChange={(e) => {
          setInput(e.target.value);
        }}
        onKeyDown={(e) => {
          if (e.key == "Enter") {
            e.preventDefault();
            mutate({ content: input });
          }
        }}
        disabled={isSubscribing}
      />
      {isSubscribing ? (
        <div>loading...</div>
      ) : (
        <button
          className="rounded-lg bg-blue-500 p-2 text-white"
          onClick={() => mutate({ content: input })}
        >
          submit
        </button>
      )}
    </div>
  );
};

const Home: NextPage = () => {
  const { data, isLoading } = api.subscriptions.getAll.useQuery();

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (!data) {
    return <div>something went wrong</div>;
  }

  return (
    <>
      <Head>
        <title>Mind Over Body</title>
        <meta name="description" content="Mind Over Body" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center gap-4">
        <section>Getting started</section>
        <section>
          {data.map(({ id, email }) => (
            <div key={id}>{email}</div>
          ))}
        </section>
        <CreateSubscription />
      </main>
    </>
  );
};

export default Home;

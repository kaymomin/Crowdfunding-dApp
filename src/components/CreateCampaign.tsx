import { DEBUG } from "../constants";
import type { Crowdfactory } from "../contract-types/Crowdfactory";
import { useCrowdFactoryFunctionWriter } from "../hooks";
import { toWei } from "../utils";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { useAccount } from "wagmi";

function CreateCampaign() {
  const [title, setTitle] = useState<string>("");
  const [amount, setAmount] = useState<string>("");
  const [story, setStory] = useState<string>("");

  const { address } = useAccount();

  // custom hook we made in hooks.ts for writing functions
  const { writeAsync, isError } =
    useCrowdFactoryFunctionWriter("createProject");

  // rainbow kit txn handler
  const addRecentTransaction = useAddRecentTransaction();

  // onChange handler for title
  const handleTitle = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    DEBUG && console.log("title: ", value);

    // set title
    setTitle(value);
  };

  // onChange handler for amount
  const handleAmount = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const value = e.target.value;
    DEBUG && console.log("amount: ", value);

    // set amount
    setAmount(value);
  };

  // onChange handler for story
  const handleStory = (e: ChangeEvent<HTMLTextAreaElement>) => {
    e.preventDefault();

    const value = e.target.value;
    DEBUG && console.log("story: ", value);

    // set story
    setStory(value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    if (!title || !amount || !story || !address) {
      return;
    }

    try {
      e.preventDefault();

      console.log("submit!");

      DEBUG && console.log({ title, amount, story });

      const amountToWei = toWei(amount);
      DEBUG && console.log("amountToWei: ", amountToWei);

      const functionArgs: Parameters<Crowdfactory["createProject"]> = [
        title,
        amountToWei,
        story,
        address,
      ];
      const tx = await writeAsync({
        args: functionArgs,
      });
      console.log("tx >>> ", tx);

      addRecentTransaction({
        hash: tx.hash,
        description: "Create Project Transaction",
      });
    } catch (error) {
      console.log("errror >>> ", error);
    }
  };

  return (
    <>
      <div className="text-center font-bold text-xl mb-2">
        Create Crowdfunding Project
      </div>

      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Campaign Title
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white"
              type="text"
              placeholder="Campaign Title"
              onChange={handleTitle}
              required
            />
          </div>

          <div className="w-full md:w-1/2 px-3">
            <label
              className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
              htmlFor="grid-password"
            >
              Required Amount
            </label>
            <input
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              type="number"
              min={0}
              step="0.01"
              placeholder="0.00"
              onChange={handleAmount}
              required
            />
          </div>
        </div>

        <div className="flex flex-wrap -mx-3 mb-6">
          <div className="w-full px-3">
            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2">
              Story
            </label>
            <textarea
              className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
              placeholder="Story"
              onChange={handleStory}
              required
            />
          </div>
        </div>

        <div className="md:flex md:items-center">
          <div className="md:w-1/3"></div>
          <div className="md:w-2/3">
            <button
              className="shadow bg-purple-500 hover:bg-purple-400 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
              type="submit"
            >
              Create Campaign
            </button>
          </div>

          {/* if error occures display text to try again */}
          {isError && (
            <p className="text-red-500 text-xs italic">
              Error occured! Please try again!.
            </p>
          )}
        </div>
      </form>
    </>
  );
}

export default CreateCampaign;
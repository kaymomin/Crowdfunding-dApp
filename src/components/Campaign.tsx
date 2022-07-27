import { DEBUG } from "../constants";
import { useCrowdfundingProjectFunctionWriter } from "../hooks";
import {
  useGoalAmount,
  useProjDescription,
  useProjTitle,
  usePublishedProjs,
  useRaisedAmount,
} from "../read";
import { fromWei, toWei } from "../utils";
import { useAddRecentTransaction } from "@rainbow-me/rainbowkit";
import type { ChangeEvent, MouseEvent } from "react";
import { useState } from "react";

export type CampaignProps = { projectNumber: number };

function Campaign({ projectNumber }: CampaignProps) {
  DEBUG && console.log("projectNumber: ", projectNumber);

  const [value, setValue] = useState<string>("");

  const publishedProjsAddress = usePublishedProjs(projectNumber);

  const projTitle = useProjTitle(publishedProjsAddress || "");
  const projDescription = useProjDescription(publishedProjsAddress || "");
  const goalAmount = useGoalAmount(publishedProjsAddress || "");
  const raisedAmount = useRaisedAmount(publishedProjsAddress || "");

  DEBUG &&
    console.log({
      publishedProjsAddress,
      projTitle,
      projDescription,
      goalAmount,
      raisedAmount,
    });

  // rainbow kit txn handler
  const addRecentTransaction = useAddRecentTransaction();

  // custom hook we made in hooks.ts for writing functions
  const { writeAsync, isError } = useCrowdfundingProjectFunctionWriter({
    contractAddress: publishedProjsAddress || "",
    functionName: "makeDonation",
  });

  const handleValue = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const inputValue = e.target.value;
    DEBUG && console.log("value: ", inputValue);

    // set value
    setValue(inputValue);
  };

  const handleDonate = async (e: MouseEvent<HTMLButtonElement>) => {
    try {
      e.preventDefault();

      const valueToWei = toWei(value);
      DEBUG && console.log("valueToWei: ", valueToWei);

      const tx = await writeAsync({
        overrides: {
          value: valueToWei,
        },
      });
      console.log("tx >>> ", tx);

      addRecentTransaction({
        hash: tx.hash,
        description: `Donate ${value} MATIC`,
      });
    } catch (error) {
      console.log("errror >>> ", error);
    }
  };

  if (
    !publishedProjsAddress ||
    !projTitle ||
    !projDescription ||
    !goalAmount ||
    !raisedAmount
  ) {
    return null;
  }

  return (
    <div className="max-w-sm rounded overflow-hidden shadow-lg">
      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{projTitle}</div>
        <p className="text-gray-700 text-base">{projDescription}</p>
      </div>
      <div className="px-6 pt-4 pb-2">
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Goal Amount:
          <span className="text-purple-700">{fromWei(goalAmount)} MATIC</span>
        </span>
        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
          Raised Amount:
          <span className="text-purple-700">{fromWei(raisedAmount)} MATIC</span>
        </span>

        <div className="flex items-center py-2">
          <input
            className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
            type="number"
            placeholder="0.000"
            min={0}
            step="0.001"
            required
            onChange={handleValue}
          />
          <button
            className="flex-shrink-0 bg-purple-500 hover:bg-purple-400 border-purple-500 hover:border-purple-400 text-sm border-4 text-white py-1 px-2 rounded"
            type="button"
            onClick={handleDonate}
          >
            Donate
          </button>
        </div>

        {/* if error occures display text to try again */}
        {isError && (
          <p className="text-red-500 text-xs italic">
            Error occured! Please try again!.
          </p>
        )}
      </div>
    </div>
  );
}

export default Campaign;

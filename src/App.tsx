import Campaigns from "./components/Campaigns";
import CreateCampaign from "./components/CreateCampaign";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";

function App() {
  const { isConnected } = useAccount();

  return (
    <div className="flex flex-col items-center py-8">
      <h1 className="flex justify-center text-sm sm:text-base md:text-3xl lg:text-4xl pb-10">
        Crowdfunding 💜 Show love to your fav project!
      </h1>

      <div className="flex justify-center">
        <ConnectButton
          showBalance={false}
          accountStatus={{
            smallScreen: "avatar",
            largeScreen: "full",
          }}
        />
      </div>

      {!isConnected ? (
        <div className="text-center font-bold text-xl m-8">
          Please connect to wallet
        </div>
      ) : (
        <>
          <div className="flex gap-6 mt-8">
            <div className="flex flex-col">
              <CreateCampaign />
            </div>
          </div>

          <div className="flex gap-6 mt-8">
            <div className="flex flex-col">
              <Campaigns />
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
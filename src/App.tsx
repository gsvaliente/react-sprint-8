import { Balance } from "./components/Balance";
import { ChartSection } from "./components/ChartSection";
import { FlagList } from "./components/FlagList";

function App() {
  return (
    <div className="flex h-dvh flex-col items-center justify-center bg-[#F6E6D6]">
      <div className="w-3/4 space-y-5 sm:w-1/2">
        <FlagList />
        <Balance />
        <ChartSection />
      </div>
    </div>
  );
}

export default App;

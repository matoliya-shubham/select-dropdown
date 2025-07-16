import { SelectDropdown } from "./SelectDropdown";
import { Toaster } from "@/components/ui/sonner";

function App() {
  return (
    <div className="w-screen h-screen  flex justify-center items-start  ">
      <SelectDropdown />
      <Toaster />
    </div>
  );
}

export default App;

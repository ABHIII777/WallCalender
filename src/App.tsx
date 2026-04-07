import "./App.css"
import CalenderCard from "./ui/CalenderCard";

export default function App() {
  return (
    <div className="flex h-screen items-center justify-center">
      {/* <h1 className="text-4xl font-bold">Welcome to WallCalender</h1> */}
      <CalenderCard />
    </div>
  );
}

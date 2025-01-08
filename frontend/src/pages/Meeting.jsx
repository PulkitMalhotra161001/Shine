
import { useParams } from "react-router-dom";
import Whiteboard from "../components/Whiteboard";


const Meeting = () => {
  const { id } = useParams();

  return (
    <div className="h-screen bg-gray-100">
      <header className="p-4 bg-white shadow">
        <h1 className="text-lg font-bold">Room ID: {id}</h1>
      </header>
      <main className="h-full">
        <Whiteboard whiteboardId={id}/>
      </main>
    </div>
  );
};

export default Meeting;

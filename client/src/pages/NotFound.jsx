import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { FileX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SmoothCursor } from "@/components/ui/smooth-cursor";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-reddit-cream flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        <div className="transform rotate-2">
          <div className="bg-white border-4 border-black shadow-brutal p-8 text-center">
            <div className="bg-blue-600 border-4 border-black shadow-brutal-lg inline-block p-4 mb-6 transform -rotate-3">
              <FileX className="h-20 w-20 text-black" />
            </div>
            
            <h1 className="text-6xl font-black mb-4 text-black">404</h1>
            <p className="text-xl font-bold mb-8">Oops! That page doesn't exist</p>
            
            <div className="bg-white border-4 border-black p-4 mb-8 text-left">
              <p className="text-lg">
                The page at <span className="font-mono font-bold">{location.pathname}</span> wasn't found.
              </p>
            </div>
            
            <Link to="/">
              <Button className="bg-blue-400 hover:bg-reddit-orange text-black text-xl font-bold py-6 px-8 border-4 border-black shadow-brutal transform transition-transform hover:translate-y-[-2px] hover:translate-x-[2px] hover:shadow-brutal-lg rounded-sm w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
        

      </div>
      <SmoothCursor />
    </div>
  );
};

export default NotFound;
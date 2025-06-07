import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { SmoothCursor } from "@/components/ui/smooth-cursor";
import { Slider } from "@/components/ui/slider";
import { useNavigate } from "react-router-dom";
import { AlertCircleIcon } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import axios from "axios";

function Main() {
  const [input, setInput] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.github.com/users/${encodeURIComponent(input)}`
      );

      if (input.length > 4 && response.status === 200) {
        navigate(`/wrap?user=${encodeURIComponent(input)}`);
      } else {
        setShowAlert(true);
      }
    } catch (error) {
      console.error("Could not validate user:", error);
      setShowAlert(true);
    }
  };

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      <div className="flex items-center justify-center pt-4 md:pt-7 px-4">
        <Card className="w-full max-w-[550px] bg-blue-600 transform rotate-1">
          <div className="text-4xl md:text-6xl font-extrabold pl-4 md:pl-7">
            GitHub Wrapped
          </div>
        </Card>
      </div>
      <div className="text-center md:text-left px-4 md:pl-[499px] pt-5 text-xl md:text-2xl font-base">
        Let AI digs into your GitHub so you don't have to <br />{" "}
        <span className="md:pl-16">uncover your coding personality!</span>
      </div>

      <div className="flex items-center justify-center pt-6 md:pt-9 px-4">
        <div className="inline-block transform -rotate-1 w-full max-w-[750px]">
          <Card className="w-full bg-sky-50">
            <CardContent className={"transform rotate-1 p-4 md:p-6"}>
              <form>
                <div className="flex flex-col gap-6">
                  <div className="grid gap-2">
                    <Label className={"font-bold text-lg"}>
                      Enter your GitHub username
                    </Label>
                    <Input
                      id="username"
                      type="username"
                      value={input}
                      onChange={(e) => setInput(e.target.value)}
                      placeholder="Username without pefix or suffix"
                      required
                      className="w-full"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label className={"font-bold text-lg"}>
                      Repos <span className="text-blue-600">*</span>
                    </Label>
                    <RadioGroup
                      defaultValue="comfortable"
                      className="flex flex-col md:flex-row md:space-x-4 space-y-2 md:space-y-0"
                    >
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="default" id="r1" />
                        <Label className={"font-medium text-md"} htmlFor="r1">
                          Recent
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value="comfortable" id="r2" />
                        <Label className={"font-medium text-md"} htmlFor="r2">
                          All time
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid gap-2">
                    <Label className={"font-bold text-lg"}>
                      Roast level <span className="text-blue-600">*</span>
                    </Label>
                    <Slider defaultValue={[33]} max={100} step={1} />
                  </div>

                  <Button
                    onClick={handleSubmit}
                    className={"font-bold text-2xl h-14"}
                  >
                    Generate GitHub Wrapped
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
      {showAlert && (
        <div className="fixed top-5 right-5 z-50 w-[90%] md:w-auto md:min-w-[300px]">
          <Alert>
            <AlertCircleIcon />
            <div>
              <AlertTitle>Error !</AlertTitle>
              <AlertDescription>Invalid username</AlertDescription>
            </div>
          </Alert>
        </div>
      )}
      <SmoothCursor />
    </>
  );
}

export default Main;

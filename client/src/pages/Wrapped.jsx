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
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageCard from "@/components/ui/image-card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { Pie, PieChart } from "recharts";
import { Badge } from "@/components/ui/badge";
import {
  Copy,
  CheckCircle2Icon,
  Newspaper,
  Download,
  BadgeAlert,
} from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Progress } from "@/components/ui/progress";

function Wrapped() {
  const [showAlert, setShowAlert] = useState(false);
  const [showAlerts, setShowAlerts] = useState(false);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const wrap = searchParams.get("user");
  const [mockdata, setMockData] = useState(null);
  const [basedata, setBaseData] = useState(null);
  const [progress, setProgress] = useState(0);

  const [chartData, setChartData] = useState([]);
  const [chartConfig, setChartConfig] = useState({
    visitors: { label: "Percentage" },
  });

  useEffect(() => {
    if (!wrap) return;

    setProgress(13);
    const progressTimer = setTimeout(() => setProgress(66), 500);

    const startTime = Date.now();

    const fetchWrapData = fetch(`http://localhost:3000/wrap/${wrap}`).then(
      (res) => res.json()
    );
    const fetchOtherData = fetch(`https://api.github.com/users/${wrap}`).then(
      (res) => res.json()
    );

    Promise.all([fetchWrapData, fetchOtherData])
      .then(([res1, res2]) => {
        const endTime = Date.now();
        const responseTime = endTime - startTime;

        setProgress(100);
        setMockData(res1);
        setBaseData(res2);

        const time = res1?.data?.time_analysis;
        if (time) {
          const rawActivities = [
            {
              key: time.primary_activity || "Primary",
              value: parseFloat(time.primary_percentage) || 0,
              color: "var(--chart-1)",
            },
            {
              key: time.secondary_activity || "Secondary",
              value: parseFloat(time.secondary_percentage) || 0,
              color: "var(--chart-2)",
            },
            {
              key: time.tertiary_activty || "Tertiary",
              value: parseFloat(time.tertiary_percentage) || 0,
              color: "var(--chart-3)",
            },
          ];

          const formattedChartData = rawActivities.map((item) => ({
            browser: item.key,
            visitors: item.value,
            fill: item.color,
          }));

          const dynamicChartConfig = {
            visitors: { label: "Percentage" },
          };

          rawActivities.forEach((item) => {
            dynamicChartConfig[item.key] = {
              label: item.key,
              color: item.color,
            };
          });

          setChartData(formattedChartData);
          setChartConfig(dynamicChartConfig);
        }
      })
      .catch((error) => {
        console.error("Error creating wrap:", error);
        setProgress(0); 
      });

    return () => {
      clearTimeout(progressTimer);
    };
  }, [wrap]);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setShowAlert(true);
      setTimeout(() => setShowAlert(false), 5000);
    } catch (err) {
      console.error("Failed to copy link: ", err);
    }
  };

  const handleEvidence = async () => {
    try {
      setShowAlerts(true);
      setTimeout(() => setShowAlerts(false), 5000);
    } catch (err) {
      console.error("Failed ", err);
    }
  };

  return (
    <>
      {!mockdata && (
        <div className="fixed inset-0 bg-white/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="w-full max-w-[750px] px-4">
            <div className="text-center mb-4 text-xl font-semibold">
              Digging through your GitHub history...{" "}
            </div>
            <Progress value={progress} className="w-full" />
          </div>
        </div>
      )}

      <div
        className={`${!mockdata ? "blur-sm" : ""} transition-all duration-300`}
      >
        <div className="flex items-center justify-center pt-7">
          <Card className="w-[450px] bg-blue-500">
            <div className="text-5xl font-extrabold pl-7">GitHub Wrapped</div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[250px] h-5 bg-green-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Profile Summary
                </div>
              </Card>
            </CardContent>

            <div className="pl-7 flex flex-row space-x-4 gap-5">
              <ImageCard
                className={"h-44 w-44"}
                caption={basedata ? basedata.login : "Loading..."}
                imageUrl={
                  basedata
                    ? basedata.avatar_url
                    : "https://avatars.githubusercontent.com/u/14347752?v=4"
                }
              />
              <ScrollArea className="rounded-base h-[180px] w-[470px] text-main-foreground border-2 border-border bg-main p-4 shadow-shadow">
                <div className="gap-56">
                  {basedata ? (
                    <>
                      <div>Name: {basedata.name || "N/A"}</div>
                      <div>Company: {basedata.company || "N/A"}</div>
                      <div>Location: {basedata.location || "N/A"}</div>
                      <div>
                        Created:{" "}
                        {new Date(basedata.created_at).toLocaleDateString()}
                      </div>
                      <div>Bio: {basedata.bio || "N/A"}</div>
                    </>
                  ) : (
                    <div>Loading...</div>
                  )}
                </div>
              </ScrollArea>
            </div>

            <div className="pl-7">
              <div className="w-[690px] border-4 border-black">
                <div className="text-md pl-1.5">
                  {mockdata?.data?.profile_summary?.roast || "Loading..."}
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[210px] h-5 bg-yellow-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Critical Roast
                </div>
              </Card>
            </CardContent>

            <div className="pl-5">
              <div className="text-md pl-1.5">
                {mockdata?.data?.critical_roasts?.roasts?.map(
                  (roast, index) => (
                    <div key={index}>
                      * {roast}
                      <br />
                      <br />
                    </div>
                  )
                ) || "Loading..."}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[250px] h-5 bg-orange-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Top Repositories
                </div>
              </Card>
            </CardContent>
            <div className="">
              <div className="max-w-4xl mx-auto p-6 space-y-4">
                {mockdata?.data?.top_repositories?.repos?.map((repo, index) => (
                  <div className="flex items-stretch" key={index}>
                    <div className="flex-shrink-0 w-12 bg-blue-500 flex items-center justify-center text-white font-bold text-lg border-2 border-gray-800">
                      {repo.rank}
                    </div>
                    <div className="flex-1 bg-gray-100 border-2 border-gray-800 border-l-0 px-4 py-3 flex items-center">
                      <span className="text-gray-800 font-medium">
                        {repo.name}
                      </span>
                    </div>
                  </div>
                )) || "Loading..."}
              </div>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[370px] h-5 bg-red-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Your time spend on github
                </div>
              </Card>
            </CardContent>
            <div className="pl-5">
              <ChartContainer
                config={chartConfig}
                className="mx-auto aspect-square max-h-[420px]"
              >
                <PieChart>
                  <Pie data={chartData} dataKey="visitors" nameKey="browser" />
                  <ChartLegend
                    content={<ChartLegendContent nameKey="browser" />}
                    className="-translate-y-2 text-sm flex-wrap gap- *:basis-1/4 *:justify-center"
                  />
                </PieChart>
              </ChartContainer>
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[450px] h-5 bg-pink-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Languages You Pretend to Know
                </div>
              </Card>
            </CardContent>

            <div className="pl-5 pt-5 flex flex-col gap-6">
              {mockdata?.data?.language_analysis?.languages?.map(
                (lang, index) => (
                  <Badge
                    key={index}
                    className="h-10 w-[700px] flex justify-between items-center"
                  >
                    <div className="text-xl">{lang.name}</div>
                    <div className="text-md italic font-mono text-right">
                      {lang.roast}
                    </div>
                  </Badge>
                )
              ) || "Loading..."}
            </div>
          </Card>
        </div>
      </div>

      <div className="flex items-center justify-center pt-9">
        <div className="inline-block">
          <Card className="w-[750px] bg-sky-50">
            <CardContent>
              <Card className="w-[360px] h-5 bg-teal-400">
                <div className="text-2xl font-extrabold pl-6 -translate-y-4">
                  Share Your GitHub Shame!
                </div>
              </Card>
            </CardContent>

            <div className="pl-5">
              {showAlert && (
                <div className="fixed top-5 right-5 z-50 min-w-[300px]">
                  <Alert>
                    <CheckCircle2Icon />
                    <div>
                      <AlertTitle>Success! Link Copied</AlertTitle>
                      <AlertDescription>
                        Share your embarrassment with the world!
                      </AlertDescription>
                    </div>
                  </Alert>
                </div>
              )}

              <div className="flex items-center">
                <div className="w-[490px] h-10 border-4 border-black mr-2 flex items-center overflow-hidden">
                  <div className="text-md pl-1.5 truncate">
                    https://github-wrapped.com/wrap?user={wrap}
                  </div>
                </div>
                <Button variant="noShadow" onClick={handleCopyLink}>
                  <Copy />
                  Copy Link
                </Button>
              </div>

              {showAlerts && (
                <div className="fixed top-5 right-5 z-50 min-w-[300px]">
                  <Alert>
                    <BadgeAlert />
                    <div>
                      <AlertTitle>Coming soon!</AlertTitle>
                      <AlertDescription>
                        Why would you want evidence of this? But okay...
                      </AlertDescription>
                    </div>
                  </Alert>
                </div>
              )}
              <Button
                onClick={handleEvidence}
                className={"mt-3 w-[620px] text-xl"}
              >
                Download Evidence <Download />
              </Button>
              <Button
                onClick={() => navigate("/")}
                className={"mt-3 w-[620px] text-xl"}
              >
                Create Another Roast <Newspaper />
              </Button>
              <div className="pt-8 text-center">
                <div className="inline-block border-2 border-black bg-red-200 px-3 py-1 text-xs transform rotate-1">
                  * Warning: Sharing may result in unexpected job offers or
                  career interventions
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
      <div>
        {/* Built with 3 a.m. logic and a prayer. 🦉 */}
        <br />
      </div>
      <SmoothCursor />
    </>
  );
}

export default Wrapped;

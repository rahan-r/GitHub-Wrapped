const express = require("express");
const axios = require("axios");
const router = express.Router();
router.use(express.json());

const apiKey = process.env.API_KEY;
const apiUrl = process.env.API_URL;
const sysPrompt = process.env.SYS_PROMPT;

let profileData = null;
let repoData = null;

router.get("/", function (req, res) {
  res.json({ Msg: "Server running" });
});

router.get("/wrap/:username", async (req, res) => {
  const gitUsername = req.params.username;
  const headers = {
    Accept: "application/vnd.github+json",
    Authorization: `Bearer ${process.env.GITHUB_KEY}`,
    "X-GitHub-Api-Version": "2022-11-28",
  };

  try {
    const response = await axios.get(
      `https://api.github.com/users/${gitUsername}`,
      { headers }
    );

    if (response.status === 200) {
      const response2 = await axios.get(
        `https://api.github.com/users/${gitUsername}/repos`,
        { headers }
      );
      const reposArr = response2.data;
      const numberOfObjects = reposArr.length;

      if (numberOfObjects > 3) {
        repoData = reposArr;
        profileData = response.data;

        const requestBody = {
          model: "google/gemini-2.0-flash-exp:free",
          messages: [
            {
              role: "system",
              content: sysPrompt,
            },
            {
              role: "user",
              content: `profile\n${JSON.stringify(
                profileData,
                null,
                2
              )}\n\nrepos\n${JSON.stringify(repoData, null, 2)}`,
            },
          ],
        };

        const response3 = await axios.post(apiUrl, requestBody, {
          headers: {
            Authorization: `Bearer ${apiKey}`,
          },
        });

        if (response3.status === 200) {
          let roastData = response3.data.choices[0].message.content;

          const cleanedRoastData = roastData
            .replace("```json\n", "")
            .replace("\n```", "");
          const parsedRoastData = JSON.parse(cleanedRoastData);

          return res.status(200).json({
            data: parsedRoastData,
          });
        } else {
          return res.status(500).json({
            error: "Failed to get a valid response from OpenAI",
          });
        }
      } else {
        return res.status(400).json({
          msg: "Not enough data to wrap",
        });
      }
    } else {
      return res.status(404).json({
        msg: "User not found",
      });
    }
  } catch (error) {
    console.error("Error:", error.message);
    console.error("Response Data:", error.response.data);

    if (error.response && error.response.status === 404) {
      return res.status(404).json({
        msg: "Invalid user",
      });
    } else {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
});

module.exports = router;

const express = require("express");

const SilentDuressCodec =
  require("./sos/duressCodec");

const app = express();

app.use(express.json());

app.use(express.static(__dirname + "/MAIN-APP"));

const codec = new SilentDuressCodec();

const TRUE_PIN = "1234";


app.post("/api/sos", (req, res) => {

  const pin = req.body.pin;

  if (!pin) {
    return res.status(400).json({
      success: false,
      message: "PIN is required"
    });
  }

  const result =
    codec.evaluatePIN(
      String(pin),
      TRUE_PIN
    );

  if (result.action === "NORMAL_DISMISSAL") {

    return res.json({
      success: true,
      sosTriggered: false,
      message: "SOS cancelled."
    });

  }

  if (
    result.action ===
    "SILENT_DURESS_TRIGGERED"
  ) {

    console.log(
      "SOS DEMO EVENT:",
      new Date().toISOString()
    );

    return res.json({
      success: true,
      sosTriggered: true,
      message:
        "SOS assistance request recorded.",
      triageCode:
        result.triageCode
    });

  }

  return res.status(401).json({
    success: false,
    sosTriggered: false,
    message: "Invalid PIN"
  });

});


app.listen(3000, () => {

  console.log(
    "Sahaay is running at http://localhost:3000"
  );

});
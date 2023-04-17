import { test , expect } from "../playwright-support/fixture.ts";
import type { TooltipData } from "../playwright-support/edumeet-page.js";

test("Browser title", async ({ page }) => {
  await expect(page).toHaveTitle("edumeet");
});

test("eduMeet Logo is visible", async ({ page }) => {
  const logo = page.getByRole("img", { name: "Logo" });
  await expect(logo).toBeVisible();
});

test("Join is disabled when no name", async ({ eduMeetPage }) => {
  const joinButton = eduMeetPage.getJoinButton;

  await expect(joinButton).toBeVisible();
  await expect(joinButton).toBeDisabled();
  await expect(joinButton).toContainText("Join");
});

test("Join become enable when fill name", async ({ eduMeetPage, page }) => {
  const joinButton = eduMeetPage.getJoinButton;
  const dispalyName = eduMeetPage.getDisplayName;

  await expect(dispalyName).toBeVisible();
  await dispalyName.fill("TestName");
  await expect(dispalyName).toHaveValue("TestName");

  await expect(joinButton).toBeVisible();
  await expect(joinButton).toBeEnabled();
  await joinButton.click();

  await page.locator("text=Leav").waitFor();

  await expect(page.locator("text=Leav")).toBeVisible();
});

test("Room name", async ({ eduMeetPage, page }) => {
  const roomId = eduMeetPage.getRoomId;
  await expect(roomId).not.toBeEmpty();

  const roomIdValue = await roomId.getAttribute("value");
  await expect(page).toHaveURL("/" + roomIdValue);

  await roomId.fill("roomId123");
  await expect(page).toHaveURL("/" + "roomid123");
});


// const toggleButtons =[
//   {
//     testName: "Camera and Microphone",
//     testToggleButton: "getMicCamToggleButton",
//   },
//   {
//     testName: "Camera and Microphone",
//     testToggleButton: "getMicCamToggleButton",
//   },
//   {
//     testName: "Camera and Microphone",
//     testToggleButton: "getMicCamToggleButton",
//   },
//   {
//     testName: "Camera and Microphone",
//     testToggleButton: "getMicCamToggleButton",
//   },
// ]

// for(const toggleButton of toggleButtons) {

//   test(`${toggleButton.testName} toggle button`, async ({ eduMeetPage }) => {

//     const micCamToggleButton = eduMeetPage["getMicCamToggleButton"];
//     const camToggleButton = eduMeetPage["getCamToggleButton"];
  
//     let micCamButtonPressed = await micCamToggleButton.getAttribute(
//       "aria-pressed"
//     );
//     let camButtonPressed = await camToggleButton.getAttribute("aria-pressed");
  
//     await expect(micCamToggleButton).toBeVisible();
//     await expect(micCamToggleButton).toBeEnabled();
//     expect(micCamButtonPressed).toEqual("true");
  
//     let color = await micCamToggleButton.evaluate((ele) => {
//       return window.getComputedStyle(ele).getPropertyValue("background-color");
//     });
  
//     expect(color).toBe("rgb(95, 155, 45)");
  
//     await expect(camToggleButton).toBeVisible();
//     await expect(camToggleButton).toBeEnabled();
//     expect(camButtonPressed).toEqual("false");
//     await camToggleButton.click();
  
//     color = await micCamToggleButton.evaluate((ele) => {
//       return window.getComputedStyle(ele).getPropertyValue("background-color");
//     });
  
//     expect(color).toBe("rgba(0, 0, 0, 0)");
  
//     micCamButtonPressed = await micCamToggleButton.getAttribute("aria-pressed");
//     camButtonPressed = await camToggleButton.getAttribute("aria-pressed");
  
//     expect(micCamButtonPressed).toEqual("false");
//     expect(camButtonPressed).toEqual("true");
//   });

// }

test("Camera and Microphone toggle button", async ({ eduMeetPage }) => {

  const micCamToggleButton = eduMeetPage["getMicCamToggleButton"];
  const camToggleButton = eduMeetPage["getCamToggleButton"];

  let micCamButtonPressed = await micCamToggleButton.getAttribute(
    "aria-pressed"
  );
  let camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  await expect(micCamToggleButton).toBeVisible();
  await expect(micCamToggleButton).toBeEnabled();
  expect(micCamButtonPressed).toEqual("true");

  let color = await micCamToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgb(95, 155, 45)");

  await expect(camToggleButton).toBeVisible();
  await expect(camToggleButton).toBeEnabled();
  expect(camButtonPressed).toEqual("false");
  await camToggleButton.click();

  color = await micCamToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgba(0, 0, 0, 0)");

  micCamButtonPressed = await micCamToggleButton.getAttribute("aria-pressed");
  camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("false");
  expect(camButtonPressed).toEqual("true");
});

test("Camera toggle button", async ({ eduMeetPage }) => {

  const camToggleButton = eduMeetPage.getCamToggleButton;
  const micCamToggleButton = eduMeetPage.getMicCamToggleButton;

  let camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  let color = await camToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgba(0, 0, 0, 0)");

  await expect(camToggleButton).toBeVisible();
  await expect(camToggleButton).toBeEnabled();
  expect(camButtonPressed).toEqual("false");
  await camToggleButton.click();

  color = await camToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgb(95, 155, 45)");

  let micCamButtonPressed = await micCamToggleButton.getAttribute(
    "aria-pressed"
  );
  camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("false");
  expect(camButtonPressed).toEqual("true");
});

test("Microphone toggle button", async ({ eduMeetPage }) => {

  const micToggleButton = eduMeetPage.getMicToggleButton;
  const micCamToggleButton = eduMeetPage.getMicCamToggleButton;

  let micButtonPressed = await micToggleButton.getAttribute("aria-pressed");

  let color = await micToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgba(0, 0, 0, 0)");

  await expect(micToggleButton).toBeVisible();
  await expect(micToggleButton).toBeEnabled();
  expect(micButtonPressed).toEqual("false");
  await micToggleButton.click();

  color = await micToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgb(95, 155, 45)");

  let micCamButtonPressed = await micCamToggleButton.getAttribute(
    "aria-pressed"
  );
  micButtonPressed = await micToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("false");
  expect(micButtonPressed).toEqual("true");
});

test("Disable toggle button", async ({ eduMeetPage }) => {

  const disableToggleButton = eduMeetPage.getDisableToggleButton;
  const micCamToggleButton = eduMeetPage.getMicCamToggleButton;

  let disableButtonPressed = await disableToggleButton.getAttribute(
    "aria-pressed"
  );

  let color = await disableToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgba(0, 0, 0, 0)");

  await expect(disableToggleButton).toBeVisible();
  await expect(disableToggleButton).toBeEnabled();
  expect(disableButtonPressed).toEqual("false");
  await disableToggleButton.click();

  color = await disableToggleButton.evaluate((ele) => {
    return window.getComputedStyle(ele).getPropertyValue("background-color");
  });

  expect(color).toBe("rgb(245, 0, 87)");

  let micCamButtonPressed = await micCamToggleButton.getAttribute(
    "aria-pressed"
  );
  disableButtonPressed = await disableToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("false");
  expect(disableButtonPressed).toEqual("true");
});

test("Only one active button", async ({ eduMeetPage }) => {

  const disableToggleButton = eduMeetPage.getDisableToggleButton;
  const micCamToggleButton = eduMeetPage.getMicCamToggleButton;
  const micToggleButton = eduMeetPage.getMicToggleButton;
  const camToggleButton = eduMeetPage.getCamToggleButton;

  let micCamButtonPressed = await micCamToggleButton.getAttribute(
    "aria-pressed"
  );
  let micButtonPressed = await micToggleButton.getAttribute("aria-pressed");
  let disableButtonPressed = await disableToggleButton.getAttribute(
    "aria-pressed"
  );
  let camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("true");
  expect(micButtonPressed).toEqual("false");
  expect(disableButtonPressed).toEqual("false");
  expect(camButtonPressed).toEqual("false");

  await disableToggleButton.click();

  micCamButtonPressed = await micCamToggleButton.getAttribute("aria-pressed");
  micButtonPressed = await micToggleButton.getAttribute("aria-pressed");
  disableButtonPressed = await disableToggleButton.getAttribute("aria-pressed");
  camButtonPressed = await camToggleButton.getAttribute("aria-pressed");

  expect(micCamButtonPressed).toEqual("false");
  expect(micButtonPressed).toEqual("false");
  expect(disableButtonPressed).toEqual("true");
  expect(camButtonPressed).toEqual("false");
});

test("Test Microphone and Camera tooltip", async ({ eduMeetPage }) => {

  const tooltipData: TooltipData = {
    parentTooltipLocator: "data-testid=mic-cam-tooltip",
    parentTooltipTitle: "title",
    tooltipText: "Enable both Microphone and Camera",
    hoverElmentLocator: "data-testid=mic-cam-toggleButton",
    toolTipLocator: "role=tooltip",
  };

  await eduMeetPage.tooltipTest(tooltipData);
});

test("Test Camera tooltip", async ({ eduMeetPage }) => {

  const tooltipData: TooltipData = {
    parentTooltipLocator: "data-testid=cam-tooltip",
    parentTooltipTitle: "title",
    tooltipText: "Enable only Camera",
    hoverElmentLocator: "data-testid=cam-toggleButton",
    toolTipLocator: "role=tooltip",
  };

  await eduMeetPage.tooltipTest(tooltipData);
});

test("Test Microphone tooltip", async ({ eduMeetPage }) => {

  const tooltipData: TooltipData = {
    parentTooltipLocator: "data-testid=mic-tooltip",
    parentTooltipTitle: "title",
    tooltipText: "Enable only Microphone",
    hoverElmentLocator: "data-testid=mic-toggleButton",
    toolTipLocator: "role=tooltip",
  };

  await eduMeetPage.tooltipTest(tooltipData);
});

test("Test Disable tooltip", async ({ eduMeetPage }) => {

  const tooltipData: TooltipData = {
    parentTooltipLocator: "data-testid=disable-tooltip",
    parentTooltipTitle: "title",
    tooltipText: "Disable both Microphone and Camera",
    hoverElmentLocator: "data-testid=disable-toggleButton",
    toolTipLocator: "role=tooltip",
  };

  await eduMeetPage.tooltipTest(tooltipData);
});

test("Test localization", async ({ eduMeetPage, page }) => {

  const localeButton = eduMeetPage.getLocaleButton;
  const joinButton = eduMeetPage.getJoinButton;

  await expect(joinButton).toContainText("Join");
  await localeButton.click();
  const hunButton = page.locator("text=Hungarian");
  await hunButton.click();
  await expect(joinButton).toContainText("Kapcsolódás");
});

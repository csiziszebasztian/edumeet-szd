import { test, expect, chromium, firefox } from "@playwright/test";
import { EduMeetPage } from "../playwright-support/edumeet-page.js";

test("Lock room: chromium", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Lock room: chromium";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getLockRoomButton.click();
  await expect(edumeetPage1.getShowLobbyButton).not.toBeVisible();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);

  await expect(edumeetPage2.getLeaveButton).not.toBeVisible();
  
  await expect(edumeetPage1.getLobbyDialog).not.toBeVisible();
  await expect(edumeetPage1.getShowLobbyButton).toBeVisible();
  await edumeetPage1.getShowLobbyButton.click();
  await expect(edumeetPage1.getLobbyDialog).toBeVisible();
  await edumeetPage1.getPromoteAllLobby.click();

  await expect(edumeetPage2.getLeaveButton).toBeVisible();

  context.close();
  browser.close();
  
});

test("Lock room: firefox", async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Lock room: firefox";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getLockRoomButton.click();
  await expect(edumeetPage1.getShowLobbyButton).not.toBeVisible();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);

  await expect(edumeetPage2.getLeaveButton).not.toBeVisible();
  
  await expect(edumeetPage1.getLobbyDialog).not.toBeVisible();
  await expect(edumeetPage1.getShowLobbyButton).toBeVisible();
  await edumeetPage1.getShowLobbyButton.click();
  await expect(edumeetPage1.getLobbyDialog).toBeVisible();
  await edumeetPage1.getPromoteAllLobby.click();

  await expect(edumeetPage2.getLeaveButton).toBeVisible();

  context.close();
  browser.close();

});

test("Participnats button badget show number of user: chromium", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Participnats button: chromium";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getLockRoomButton.click();
  await expect(edumeetPage1.getShowLobbyButton).not.toBeVisible();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);

  await expect(edumeetPage2.getLeaveButton).not.toBeVisible();
  
  await expect(edumeetPage1.getLobbyDialog).not.toBeVisible();
  await expect(edumeetPage1.getShowLobbyButton).toBeVisible();
  await edumeetPage1.getShowLobbyButton.click();
  await expect(edumeetPage1.getLobbyDialog).toBeVisible();
  await edumeetPage1.getPromoteAllLobby.click();

  await expect(edumeetPage2.getLeaveButton).toBeVisible();

  context.close();
  browser.close();

});

test("Participnats button badget show number of user: firefox", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Participnats button: firefox";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getLockRoomButton.click();
  await expect(edumeetPage1.getShowLobbyButton).not.toBeVisible();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);

  await expect(edumeetPage2.getLeaveButton).not.toBeVisible();
  
  await expect(edumeetPage1.getLobbyDialog).not.toBeVisible();
  await expect(edumeetPage1.getShowLobbyButton).toBeVisible();
  await edumeetPage1.getShowLobbyButton.click();
  await expect(edumeetPage1.getLobbyDialog).toBeVisible();
  await edumeetPage1.getPromoteAllLobby.click();

  await expect(edumeetPage2.getLeaveButton).toBeVisible();

  context.close();
  browser.close();

});


test("Participnats test: chromium", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Participnats test: chromium";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getParticipantsButton.click();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);
  await edumeetPage2.getParticipantsButton.click();

  await expect(page2.getByTestId("isRaisedHand")).not.toBeVisible();
  await expect(page2.getByTestId("participantsTab").getByText("1")).not.toBeVisible();
  await edumeetPage1.getDrawerRaiseHand.click();
  await expect(page2.getByTestId("isRaisedHand")).toBeVisible();
  await expect(page2.getByTestId("participantsTab").getByText("1")).toBeVisible();

  await expect(page2.getByTestId("participantList").getByText(userId1).first()).toBeVisible();
  await expect(page2.getByTestId("meContainer").getByText(userId2)).toBeVisible();

  await expect(page2.getByTestId("isSpeaker")).toBeVisible();
  await expect(page2.getByTestId("isSpeaker")).toBeEnabled();
  await expect(page2.locator("role=tooltip")).not.toBeVisible();
  await page2.getByTestId("isSpeaker").hover();
  await expect(page2.locator("role=tooltip")).toBeVisible();
  await expect(page2.locator("role=tooltip")).toHaveText("Active speaker");

  await expect(page2.getByTestId("muteParticipant")).toBeVisible();
  await expect(page2.getByTestId("muteParticipant")).toBeEnabled();
  await page2.getByTestId("muteParticipant").hover();
  await expect(page2.locator("role=tooltip").nth(1)).toBeVisible();
  await expect(page2.locator("role=tooltip").nth(1)).toHaveText("Mute audio");

  await expect(page2.getByTestId("participantsMoreActionsButton")).toBeVisible();
  await expect(page2.getByTestId("participantsMoreActionsButton")).toBeEnabled();
  await page2.getByTestId("participantsMoreActionsButton").hover();
  await expect(page2.locator("role=tooltip").last()).toBeVisible();
  await expect(page2.locator("role=tooltip").last()).toHaveText("More actions");
  
  await expect(page2.getByTestId("participnatsMoreActions")).not.toBeVisible();
  await page2.getByTestId("participantsMoreActionsButton").click();
  await expect(page2.getByTestId("participnatsMoreActions")).toBeVisible();

  await expect(page2.getByTestId("participantsVolumeSlider")).toBeVisible();
  await expect(page2.getByTestId("participantsMuteVideo")).toBeVisible();
  await expect(page2.getByTestId("participantsScreensShare")).toBeVisible();
  await expect(page2.getByTestId("participantToSpotlight")).toBeVisible();

  context.close();
  browser.close();

});

test("Participnats test: firefox", async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EduMeetPage(page1);
  const edumeetPage2 = new EduMeetPage(page2);

  const roomId = "Participnats test: firefox";
  const userId1 = "User1";
  const userId2 = "User2";

  await edumeetPage1.goto();
  await edumeetPage1.login(roomId, userId1);
  await edumeetPage1.getParticipantsButton.click();

  await edumeetPage2.goto();
  await edumeetPage2.login(roomId, userId2);
  await edumeetPage2.getParticipantsButton.click();

  await expect(page2.getByTestId("isRaisedHand")).not.toBeVisible();
  await expect(page2.getByTestId("participantsTab").getByText("1")).not.toBeVisible();
  await edumeetPage1.getDrawerRaiseHand.click();
  await expect(page2.getByTestId("isRaisedHand")).toBeVisible();
  await expect(page2.getByTestId("participantsTab").getByText("1")).toBeVisible();

  await expect(page2.getByTestId("participantList").getByText(userId1).first()).toBeVisible();
  await expect(page2.getByTestId("meContainer").getByText(userId2)).toBeVisible();
  
  await expect(page2.getByTestId("muteParticipant")).toBeVisible();
  await expect(page2.getByTestId("muteParticipant")).toBeEnabled();
  await page2.getByTestId("muteParticipant").hover();
  await expect(page2.locator("role=tooltip").first()).toBeVisible();
  await expect(page2.locator("role=tooltip").first()).toHaveText("Mute audio");

  await expect(page2.getByTestId("participantsMoreActionsButton")).toBeVisible();
  await expect(page2.getByTestId("participantsMoreActionsButton")).toBeEnabled();
  await page2.getByTestId("participantsMoreActionsButton").hover();
  await expect(page2.locator("role=tooltip").last()).toBeVisible();
  await expect(page2.locator("role=tooltip").last()).toHaveText("More actions");
  
  await expect(page2.getByTestId("participnatsMoreActions")).not.toBeVisible();
  await page2.getByTestId("participantsMoreActionsButton").click();
  await expect(page2.getByTestId("participnatsMoreActions")).toBeVisible();

  await expect(page2.getByTestId("participantsVolumeSlider")).toBeVisible();
  await expect(page2.getByTestId("participantsMuteVideo")).toBeVisible();
  await expect(page2.getByTestId("participantsScreensShare")).toBeVisible();
  await expect(page2.getByTestId("participantToSpotlight")).toBeVisible();

  context.close();
  browser.close();

});
import { test, expect, chromium, firefox } from "@playwright/test";
import { EdummetPage } from "../playwright-support/edummet-page.js";

test("Lock room: chromium", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EdummetPage(page1);
  const edumeetPage2 = new EdummetPage(page2);

  const roomId = "Playwright";
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

});

test("Lock room: firefox", async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  const edumeetPage1 = new EdummetPage(page1);
  const edumeetPage2 = new EdummetPage(page2);

  const roomId = "Playwright";
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


});

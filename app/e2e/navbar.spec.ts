import { test, expect } from "@playwright/test";
import { EdummetPage } from "../playwright-support/edummet-page.js";

test.beforeEach(async ({ page }, testInfo) => {
  const edumeetPage = new EdummetPage(page);
  edumeetPage.goto();
  edumeetPage.login("Playwright", "User1");
});

test.describe("Leave button", async () => {
  test("Standard", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const leaveButton = edumeetPage.getLeaveButton;
    await expect(leaveButton).toBeVisible();
    await expect(leaveButton).toHaveText("Leave");
    await expect(leaveButton).toBeEnabled();
  });


  test("Click but not leave", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const leaveButton = edumeetPage.getLeaveButton;
    const leaveDialog = edumeetPage.getLeaveDialog;
    const leaveDialogNo = edumeetPage.getLeaveDialogNo;
    await expect(leaveDialog).not.toBeVisible();
    await leaveButton.click();
    await expect(leaveDialog).toBeVisible();
    await leaveDialogNo.click();
    await expect(leaveButton).toBeVisible();
  });

  test("Click and leave", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const leaveButton = edumeetPage.getLeaveButton;
    const leaveDialog = edumeetPage.getLeaveDialog;
    const leaveDialogYes = edumeetPage.getLeaveDialogYes;
    const loginDialog = edumeetPage.getLoginDialog;

    await expect(leaveDialog).not.toBeVisible();
    await leaveButton.click();
    await expect(leaveDialog).toBeVisible();
    await expect(loginDialog).not.toBeVisible();
    await leaveDialogYes.click();
    await expect(leaveButton).not.toBeVisible();
    await expect(loginDialog).toBeVisible();
  });
});

test("Local menu", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const localButton = edumeetPage.getLocaleButton;
  const leaveButton = edumeetPage.getLeaveButton;

  await expect(leaveButton).toContainText("Leave");

  await localButton.click();

  const hunButton = page.locator("text=Hungarian");
  await hunButton.click();
  await expect(leaveButton).toContainText("Kilépés");
});

test("Lock room button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const lockRoomButton = edumeetPage.getLockRoomButton;
  const tooltip = page.locator("role=tooltip");

  await expect(lockRoomButton).toBeVisible();
  await expect(lockRoomButton).toBeEnabled();

  await expect(tooltip).not.toBeVisible();
  await lockRoomButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Lock room");
});

test("Setting button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const settingButton = edumeetPage.getSettingsButton;
  const settingDialog = edumeetPage.getSettingDialog;
  const tooltip = page.locator("role=tooltip");

  await expect(settingButton).toBeVisible();
  await expect(settingButton).toBeEnabled();

  await expect(tooltip).not.toBeVisible();
  await settingButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Show settings");

  await expect(settingDialog).not.toBeVisible();
  await settingButton.click();
  await expect(settingDialog).toBeVisible();
});

test("Participants button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const participantsButton = edumeetPage.getParticipantsButton;
  const drawer = edumeetPage.getDrawerRaiseHand;
  const tooltip = page.locator("role=tooltip");

  await expect(participantsButton).toBeVisible();
  await expect(participantsButton).toBeEnabled();

  await expect(tooltip).not.toBeVisible();
  await participantsButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Show participants");

  await expect(drawer).not.toBeVisible();
  await participantsButton.click();
  await expect(drawer).toBeVisible();
});

test("Fullscreen button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const fullScreenButton = edumeetPage.getFullScreenButton;
  const tooltip = page.locator("role=tooltip");

  await expect(fullScreenButton).toBeVisible();

  await expect(tooltip).not.toBeVisible();
  await fullScreenButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Enter fullscreen");
});

test("More actions button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const moreActionButton = edumeetPage.getMoreActionButton;
  const moreActionList = edumeetPage.getMoreActionList;
  const tooltip = page.locator("role=tooltip");

  await expect(moreActionButton).toBeVisible();
  await expect(moreActionButton).toBeEnabled();

  await expect(tooltip).not.toBeVisible();
  await moreActionButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("More actions");

  await expect(moreActionList).not.toBeVisible();
  await moreActionButton.click();
  await expect(moreActionList).toBeVisible();
});

test("Open drawer button", async ({ page }) => {
  const edumeetPage = new EdummetPage(page);

  const openDrawerButton = edumeetPage.getOpenDrawerButton;
  const drawer = edumeetPage.getDrawer;

  await expect(openDrawerButton).toBeVisible();
  await expect(openDrawerButton).toBeEnabled();

  await expect(drawer).not.toBeVisible();
  await openDrawerButton.click();
  await expect(drawer).toBeVisible();
});

test.describe("More actions list", async () => {

  test("Add new video input", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const moreActionButton = edumeetPage.getMoreActionButton;
    const addVideo = edumeetPage.getAddVideo;
    const addVideoDialog = edumeetPage.getAddVideoDialog;

    await expect(addVideoDialog).not.toBeVisible();

    await moreActionButton.click();
    await addVideo.click();

    await expect(addVideoDialog).toBeVisible();

  });

  test("Add and remove self view", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const moreActionButton = edumeetPage.getMoreActionButton;
    const hideSelfView = edumeetPage.getHideSelfView;
    const meCameraVideo = edumeetPage.getMeCameraVideo;

    await expect(meCameraVideo).toBeVisible();

    await moreActionButton.click();
    await hideSelfView.click();

    await expect(meCameraVideo).not.toBeVisible();

    await moreActionButton.click();
    await hideSelfView.click();

    await expect(meCameraVideo).toBeVisible();
  });

  test("Click Help", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);
    const moreActionButton = edumeetPage.getMoreActionButton;
    const help = edumeetPage.getHelp;
    const helpDialog = edumeetPage.getHelpDialog;

    await expect(helpDialog).not.toBeVisible();

    await moreActionButton.click();
    await help.click();

    await expect(helpDialog).toBeVisible();
  });

  test("Click Abaut", async ({ page }) => {
    const edumeetPage = new EdummetPage(page);

    const moreActionButton = edumeetPage.getMoreActionButton;
    const abaut = edumeetPage.getAbaut;
    const abautDialog = edumeetPage.getAbautDialog;

    await expect(abautDialog).not.toBeVisible();

    await moreActionButton.click();
    await abaut.click();

    await expect(abautDialog).toBeVisible();

  });
});

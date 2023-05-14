import { test, expect } from "../playwright-support/fixture.ts";

test("Standard", async ({ joinedEduMeetPage }) => {
  const leaveButton = joinedEduMeetPage.getLeaveButton;
  await expect(leaveButton).toBeVisible();
  await expect(leaveButton).toHaveText("Leave");
  await expect(leaveButton).toBeEnabled();
});

test("Click but not leave", async ({ joinedEduMeetPage }) => {
  const leaveButton = joinedEduMeetPage.getLeaveButton;
  const leaveDialog = joinedEduMeetPage.getLeaveDialog;
  const leaveDialogNo = joinedEduMeetPage.getLeaveDialogNo;
  await expect(leaveDialog).not.toBeVisible();
  await leaveButton.click();
  await expect(leaveDialog).toBeVisible();
  await leaveDialogNo.click();
  await expect(leaveButton).toBeVisible();
});

test("Click and leave", async ({ joinedEduMeetPage }) => {
  const leaveButton = joinedEduMeetPage.getLeaveButton;
  const leaveDialog = joinedEduMeetPage.getLeaveDialog;
  const leaveDialogYes = joinedEduMeetPage.getLeaveDialogYes;
  const loginDialog = joinedEduMeetPage.getLoginDialog;

  await expect(leaveDialog).not.toBeVisible();
  await leaveButton.click();
  await expect(leaveDialog).toBeVisible();
  await expect(loginDialog).not.toBeVisible();
  await leaveDialogYes.click();
  await expect(leaveButton).not.toBeVisible();
  await expect(loginDialog).toBeVisible();
});

test("Local menu", async ({ joinedEduMeetPage, page }) => {
  const localButton = joinedEduMeetPage.getLocaleButton;
  const leaveButton = joinedEduMeetPage.getLeaveButton;

  await expect(leaveButton).toContainText("Leave");
  
  await localButton.click();

  const hunButton = page.locator("text=Hungarian");
  await hunButton.click();
  await expect(leaveButton).toContainText("Kilépés");
});

test("Lock room button", async ({ joinedEduMeetPage, page }) => {
  const lockRoomButton = joinedEduMeetPage.getLockRoomButton;
  const tooltip = page.locator("role=tooltip");

  await expect(lockRoomButton).toBeVisible();
  await expect(lockRoomButton).toBeEnabled();

  await expect(tooltip).not.toBeVisible();
  await lockRoomButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Lock room");
});

test("Setting button", async ({ joinedEduMeetPage, page }) => {

  const settingButton = joinedEduMeetPage.getSettingsButton;
  const settingDialog = joinedEduMeetPage.getSettingDialog;
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

test("Participants button", async ({ joinedEduMeetPage, page }) => {

  const participantsButton = joinedEduMeetPage.getParticipantsButton;
  const drawer = joinedEduMeetPage.getDrawerRaiseHand;
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

test("Fullscreen button", async ({ joinedEduMeetPage, page }) => {

  const fullScreenButton = joinedEduMeetPage.getFullScreenButton;
  const tooltip = page.locator("role=tooltip");

  await expect(fullScreenButton).toBeVisible();

  await expect(tooltip).not.toBeVisible();
  await fullScreenButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText("Enter fullscreen");
});

test("More actions button", async ({ joinedEduMeetPage, page }) => {

  const moreActionButton = joinedEduMeetPage.getMoreActionButton;
  const moreActionList = joinedEduMeetPage.getMoreActionList;
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

test("Open drawer button", async ({ joinedEduMeetPage }) => {

  const openDrawerButton = joinedEduMeetPage.getOpenDrawerButton;
  const drawer = joinedEduMeetPage.getDrawer;

  await expect(openDrawerButton).toBeVisible();
  await expect(openDrawerButton).toBeEnabled();

  await expect(drawer).not.toBeVisible();
  await openDrawerButton.click();
  await expect(drawer).toBeVisible();
});

test("Add new video input", async ({ joinedEduMeetPage }) => {

  const moreActionButton = joinedEduMeetPage.getMoreActionButton;
  const addVideo = joinedEduMeetPage.getAddVideo;
  const addVideoDialog = joinedEduMeetPage.getAddVideoDialog;

  await expect(addVideoDialog).not.toBeVisible();

  await moreActionButton.click();
  await addVideo.click();

  await expect(addVideoDialog).toBeVisible();
});

test("Add and remove self view", async ({ joinedEduMeetPage }) => {

  const moreActionButton = joinedEduMeetPage.getMoreActionButton;
  const hideSelfView = joinedEduMeetPage.getHideSelfView;
  const meCameraVideo = joinedEduMeetPage.getMeCameraVideo;

  await expect(meCameraVideo).toBeVisible();

  await moreActionButton.click();
  await hideSelfView.click();

  await expect(meCameraVideo).not.toBeVisible();

  await moreActionButton.click();
  await hideSelfView.click();

  await expect(meCameraVideo).toBeVisible();
});

test("Click Help", async ({ joinedEduMeetPage }) => {

  const moreActionButton = joinedEduMeetPage.getMoreActionButton;
  const help = joinedEduMeetPage.getHelp;
  const helpDialog = joinedEduMeetPage.getHelpDialog;

  await expect(helpDialog).not.toBeVisible();

  await moreActionButton.click();
  await help.click();

  await expect(helpDialog).toBeVisible();
});

test("Click Abaut", async ({ joinedEduMeetPage }) => {

  const moreActionButton = joinedEduMeetPage.getMoreActionButton;
  const abaut = joinedEduMeetPage.getAbaut;
  const abautDialog = joinedEduMeetPage.getAbautDialog;

  await expect(abautDialog).not.toBeVisible();

  await moreActionButton.click();
  await abaut.click();

  await expect(abautDialog).toBeVisible();
});

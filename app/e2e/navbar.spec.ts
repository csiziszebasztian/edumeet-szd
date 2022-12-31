import { test, expect } from '@playwright/test';
import { EdummetPage } from '../playwright-support/edummet-page.js';

test.beforeEach(async ({ page }, testInfo) => {
  const edumeetPage = new EdummetPage(page);
  edumeetPage.goto();
  edumeetPage.login();
});

test.describe('Leave button', async () => {

  test('Standard test',async ({page}) => {
    const edumeetPage = new EdummetPage(page);
    const leaveButton = edumeetPage.getLeaveButton;
    await expect(leaveButton).toBeVisible();
    await expect(leaveButton).toHaveText('Leave');
    await expect(leaveButton).toBeEnabled();
  });

  test('Click but not leave',async ({page}) => {

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

  test('Click and leave',async ({page}) => {
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

test('Local menu',async ({page}) => {

  const edumeetPage = new EdummetPage(page);

  const localButton = edumeetPage.getLocaleButton;;
  const leaveButton = edumeetPage.getLeaveButton;

  await expect(leaveButton).toContainText('Leave');
  await localButton.click();

  const hunButton = page.locator('text=Hungarian');
  await hunButton.click();
  await expect(leaveButton).toContainText('Kilépés');

});


test('Lock room button test',async ({page}) => {

  const edumeetPage = new EdummetPage(page);
  
  const lockRoomButton = edumeetPage.getLockRoomButton;
  const tooltip = page.locator('role=tooltip');
  
  await expect(lockRoomButton).toBeVisible();
  await expect(lockRoomButton).toBeEnabled();
  
  await expect(tooltip).not.toBeVisible();
  await lockRoomButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Lock room');

});


test('Setting button test',async ({page}) => {

  const edumeetPage = new EdummetPage(page);
  
  const settingButton = edumeetPage.getSettingsButton;
  const settingDialog = edumeetPage.getSettingDialog;
  const tooltip = page.locator('role=tooltip');
  
  await expect(settingButton).toBeVisible();
  await expect(settingButton).toBeEnabled();
  
  await expect(tooltip).not.toBeVisible();
  await settingButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Show settings');

  await expect(settingDialog).not.toBeVisible();
  await settingButton.click();
  await expect(settingDialog).toBeVisible();

});

test('Participants button test',async ({page}) => {

  const edumeetPage = new EdummetPage(page);
  
  const participantsButton = edumeetPage.getParticipantsButton;
  const drawer = edumeetPage.getDrawerRaiseHand;
  const tooltip = page.locator('role=tooltip');
  
  await expect(participantsButton).toBeVisible();
  await expect(participantsButton).toBeEnabled();
  
  await expect(tooltip).not.toBeVisible();
  await participantsButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Show participants');

  await expect(drawer).not.toBeVisible();
  await participantsButton.click();
  await expect(drawer).toBeVisible();

});

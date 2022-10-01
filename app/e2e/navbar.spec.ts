import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
  await page.locator('id=roomId').fill('playwrightRoom');
  await page.locator('id=displayname').fill('testUser1');
  await page.locator('id=joinButton').click();
});


test('Test displayname is equal to testUser1.', async ({ page }) => {

    await expect(page.locator('text=testUser1')).toBeVisible();
  
});

test.describe('Leave button', async () => {

  test('Standard test',async ({page}) => {
    const leaveButton = page.locator('data-testid=leaveButton');
    await expect(leaveButton).toBeVisible();
    await expect(leaveButton).toHaveText('Leave');
    await expect(leaveButton).toBeEnabled();
  });

  test('Click but not leave',async ({page}) => {
    const leaveButton = page.locator('data-testid=leaveButton');
    const leaveDialog = page.locator('data-testid=leaveDialog');
    const leaveDialogNo = page.locator('data-testid=leaveDialogNo');
    await expect(leaveDialog).not.toBeVisible();
    await leaveButton.click();
    await expect(leaveDialog).toBeVisible();
    await leaveDialogNo.click();
    await expect(leaveButton).toBeVisible();
  });

  test('Click and leave',async ({page}) => {
    const leaveButton = page.locator('data-testid=leaveButton');
    const leaveDialog = page.locator('data-testid=leaveDialog');
    const leaveDialogYes = page.locator('data-testid=leaveDialogYes');
    const loginDialog = page.locator('data-testid=loginDialog');
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
  
  const localButton = page.locator('data-testid=localeButton');
  const leaveButton = page.locator('data-testid=leaveButton');
  await expect(leaveButton).toContainText('Leave');
  await localButton.click();

  const hunButton = page.locator('text=Hungarian');
  await hunButton.click();
  await expect(leaveButton).toContainText('Kilépés');

});


test('Lock room button test',async ({page}) => {
  const lockRoomButton = page.locator('data-testid=lockRoomButton');
  const tooltip = page.locator('role=tooltip');
  await expect(lockRoomButton).toBeVisible();
  await expect(lockRoomButton).toBeEnabled();
  await expect(tooltip).not.toBeVisible();
  await lockRoomButton.hover();
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Lock room');
  await lockRoomButton.click();
});



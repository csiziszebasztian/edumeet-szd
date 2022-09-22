import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }, testInfo) => {
  await page.goto('/');
});


test('Browser title', async ({ page }) => {

  await expect(page).toHaveTitle("edumeet");

});

test('Join is disabled when no name', async ({ page }) => {

  const joinButton = page.locator('id=joinButton');

  await expect(joinButton).toBeVisible();
  await expect(joinButton).toBeDisabled();
  await expect(joinButton).toContainText("Join");

});

test('Join become enable when fill name', async ({ page }) => {

  const joinButton = page.locator('id=joinButton');
  const dispalyName = page.locator('id=displayname');

  await expect(dispalyName).toBeVisible();
  await dispalyName.fill('TestName');
  await expect(dispalyName).toHaveValue('TestName');

  await expect(joinButton).toBeVisible();
  await expect(joinButton).toBeEnabled();
  await joinButton.click();

  await page.locator('text=Leav').waitFor();

  await expect(page.locator('text=Leav')).toBeVisible();

});

test('Room name',async ({page}) => {

  const roomId = page.locator('id=roomId');
  await expect(roomId).not.toBeEmpty();

  const roomIdValue = await roomId.getAttribute('value');
  await expect(page).toHaveURL('/' + roomIdValue);

  await roomId.fill('roomId123');
  await expect(page).toHaveURL('/' + 'roomid123');

});



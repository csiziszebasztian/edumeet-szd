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

test('Media buttons',async ({page}) => {

  const micCamToggleButton = page.locator('data-testid=mic-cam-toggleButton');
  const camToggleButton = page.locator('data-testid=cam-toggleButton');
  let camMicButtonPressed = await micCamToggleButton.getAttribute('aria-pressed');
  let camButtonPressed = await camToggleButton.getAttribute('aria-pressed');

  await expect(micCamToggleButton).toBeVisible();
  await expect(micCamToggleButton).toBeEnabled();
  expect(camMicButtonPressed).toEqual('true');

  await expect(camToggleButton).toBeVisible();
  await expect(camToggleButton).toBeEnabled();
  expect(camButtonPressed).toEqual('false');
  await camToggleButton.click();

  camMicButtonPressed = await micCamToggleButton.getAttribute('aria-pressed');
  camButtonPressed = await camToggleButton.getAttribute('aria-pressed');

  expect(camMicButtonPressed).toEqual('false');
  expect(camButtonPressed).toEqual('true');

});

test('Test Microphone and Camera tooltip',async ({page}) => {

  const parentTooltip = page.locator('data-testid=mic-cam-tooltip');

  const parentTooltipText = await parentTooltip .getAttribute('title');
  expect(parentTooltipText).toEqual('Enable both Microphone and Camera');

  const toggleButton = page.locator('data-testid=mic-cam-toggleButton');
  await toggleButton.hover();
  const tooltip = page.locator('role=tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Enable both Microphone and Camera');

});

test('Test Camera tooltip',async ({page}) => {

  const parentTooltip = page.locator('data-testid=cam-tooltip');

  const parentTooltipText = await parentTooltip .getAttribute('title');
  expect(parentTooltipText).toEqual('Enable only Camera');

  const toggleButton = page.locator('data-testid=cam-toggleButton');
  await toggleButton.hover();
  const tooltip = page.locator('role=tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Enable only Camera');

});

test('Test Microphone tooltip',async ({page}) => {

  /*const tooltipData: TooltipData = {
    parentTooltipLocator: 'data-testid=mic-tooltip',
    parentTooltipTitle: 'title',
    parentTooltipText: 'Enable only Microphone',
    hoverelmentLocator: 'data-testid=mic-toggleButton',
    toolTipLocator: 'role=tooltip',
  };

  edumeetTooltipTest(page, 'Microphone', tooltipData);*/

  const parentTooltip = page.locator('data-testid=mic-tooltip');

  const parentTooltipText = await parentTooltip.getAttribute('title');
  expect(parentTooltipText).toEqual('Enable only Microphone');

  const toggleButton = page.locator('data-testid=mic-toggleButton');
  await toggleButton.hover();
  const tooltip = page.locator('role=tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Enable only Microphone');

});

test('Test Disable tooltip',async ({page}) => {

  const parentTooltip = page.locator('data-testid=disable-tooltip');

  const parentTooltipText = await parentTooltip .getAttribute('title');
  expect(parentTooltipText).toEqual('Disable both Microphone and Camera');

  const toggleButton = page.locator('data-testid=disable-toggleButton');
  await toggleButton.hover();
  const tooltip = page.locator('role=tooltip');
  await expect(tooltip).toBeVisible();
  await expect(tooltip).toHaveText('Enable only Microphone');

});

test('Test localization',async ({page}) => {

  const localeButton = page.locator('data-testid=localeButton');
  const joinButton = page.locator('id=joinButton');
  await expect(joinButton).toContainText("Join");
  await localeButton.click();
  const hunButton = page.locator('text=Hungarian');
  await hunButton.click();
  await expect(joinButton).toContainText("Kapcsolódás");

});
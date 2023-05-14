import { test, expect, chromium, firefox } from "@playwright/test";

test("Chat test: chromium", async () => {
  const browser = await chromium.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto("https://localhost:4443/");
  await page1.locator("id=roomId").fill("edumeetChromiumRoom");
  await page1.locator("id=displayname").fill("testUser1");
  await page1.locator("id=joinButton").click();

  await page1.locator("data-testid=openDrawer").click();

  await expect(page1.locator("text=ABC12345")).not.toBeVisible();
  await expect(page1.locator("role=textbox")).toBeVisible();
  await expect(page1.locator("role=textbox")).toBeEnabled();
  await page1.locator("role=textbox").fill("ABC12345");
  await page1.locator('[aria-label="Send"]').click();
  await page1.locator("role=textbox").fill("XYZ12345");
  await page1.locator("role=textbox").press("Enter");
  await expect(page1.locator("text=ABC12345")).toBeVisible();
  await expect(page1.locator("text=XYZ12345")).toBeVisible();

  await page2.goto("https://localhost:4443/");
  await page2.locator("id=roomId").fill("edumeetChromiumRoom");
  await page2.locator("id=displayname").fill("testUser2");
  await page2.locator("id=joinButton").click();
  await page2.locator("data-testid=openDrawer").click();
  await expect(page1.locator("text=ABC12345")).toBeVisible();
  await expect(page1.locator("text=XYZ12345")).toBeVisible();

  context.close();
  browser.close();

});

test("Chat test: firefox", async () => {
  const browser = await firefox.launch();
  const context = await browser.newContext({ ignoreHTTPSErrors: true });
  const page1 = await context.newPage();
  const page2 = await context.newPage();

  await page1.goto("https://localhost:4443/");
  await page1.locator("id=roomId").fill("edumeetFirefoxRoom");
  await page1.locator("id=displayname").fill("testUser1");
  await page1.locator("id=joinButton").click();

  await page1.locator("data-testid=openDrawer").click();

  await expect(page1.locator("text=ABC12345")).not.toBeVisible();
  await expect(page1.locator("role=textbox")).toBeVisible();
  await expect(page1.locator("role=textbox")).toBeEnabled();
  await page1.locator("role=textbox").fill("ABC12345");
  await page1.locator('[aria-label="Send"]').click();
  await page1.locator("role=textbox").fill("XYZ12345");
  await page1.locator("role=textbox").press("Enter");
  await expect(page1.locator("text=ABC12345")).toBeVisible();
  await expect(page1.locator("text=XYZ12345")).toBeVisible();

  await page2.goto("https://localhost:4443/");
  await page2.locator("id=roomId").fill("edumeetFirefoxRoom");
  await page2.locator("id=displayname").fill("testUser2");
  await page2.locator("id=joinButton").click();
  await page2.locator("data-testid=openDrawer").click();
  await expect(page2.locator("text=ABC12345")).toBeVisible();
  await expect(page1.locator("text=XYZ12345")).toBeVisible();

  context.close();
  browser.close();
});

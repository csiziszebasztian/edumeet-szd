import { test as base } from "@playwright/test";
import { EduMeetPage } from "./edumeet-page.js";

export const test = base.extend<{ eduMeetPage: EduMeetPage, joinedEduMeetPage: EduMeetPage, settingsMediaPage: EduMeetPage }>({
    page: async ({ page }, use) => {
      await page.goto("/");
      await use(page);
    },
    eduMeetPage: async ({ page }, use) => {
      const eduMeetPage = new EduMeetPage(page);
      await use(eduMeetPage);
    },
    joinedEduMeetPage: async ({ page }, use) => {
      const joinedEduMeetPage = new EduMeetPage(page);
      await joinedEduMeetPage.login("Playwright", "User1");
      await use(joinedEduMeetPage);
    },
    settingsMediaPage: async ({ page }, use) => {
      const settingsMediaPage = new EduMeetPage(page);
      await settingsMediaPage.login("Playwright", "User1");
      await settingsMediaPage.getSettingsButton.click();
      await use(settingsMediaPage);
    },
  });

  export { expect } from "@playwright/test";
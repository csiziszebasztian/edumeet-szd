import { test as base } from "@playwright/test";
import { EduMeetPage } from "./edumeet-page.js";

export const test = base.extend<{ eduMeetPage: EduMeetPage, joinedEduMeetPage: EduMeetPage }>({
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
      joinedEduMeetPage.login("Playwright", "User1");
      await use(joinedEduMeetPage);
    },
  });

  export { expect } from "@playwright/test";
import { test } from "../playwright-support/fixture.ts";
import type {
  SelectorData,
  SwitchData,
} from "../playwright-support/edumeet-page.js";

test("Number of visible videos", async ({ settingsMediaPage }) => {
  await settingsMediaPage.getPage.getByTestId("advancedSetting").click();

  const selectorData: SelectorData = {
    label: "Number of visible videos",
    locator: "lastn",
    defaultValue: "4",
    selectedValue: "1",
  };

  await settingsMediaPage.selectorTest(selectorData);
});

const switchSettings: Array<SwitchData> = [
  {
    label: "Advanced mode",
    locator: "advancedMode",
    switchLocator: "advancedModeSwitch",
    isChecked: false,
  },
  {
    label: "Notification sounds",
    locator: "notificationSounds",
    switchLocator: "notificationSoundsSwitch",
    isChecked: true,
  },
];

for (const switchSetting of switchSettings) {
  test(`Advanced switch settings: ${switchSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    await settingsMediaPage.getPage.getByTestId("advancedSetting").click();
    await settingsMediaPage.switchTest(switchSetting);
  });
}

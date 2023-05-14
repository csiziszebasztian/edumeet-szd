import { test } from "../playwright-support/fixture.ts";
import type {
  SelectorData,
  SwitchData,
} from "../playwright-support/edumeet-page.js";


const selectorSettings: Array<SelectorData> = [
  {
    label: "Select language",
    locator: "selectLanguage",
    defaultValue: "en",
    selectedValue: "hu",
  },
  {
    label: "Select room layout",
    locator: "selectRoomLayout",
    defaultValue: "democratic",
    selectedValue: "filmstrip",
  },
  {
    label: "Select video aspect ratio",
    locator: "selectAspectRatio",
    defaultValue: "1.777",
    selectedValue: "1.333",
  },
];

for (const selectorSetting of selectorSettings) {
  test(`Appearance selector settings: ${selectorSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    await settingsMediaPage.getPage.getByText("Appearance").click();
    await settingsMediaPage.selectorTest(selectorSetting);
  });
}

const switchSettings: Array<SwitchData> = [
  {
    label: "Mirror view of own video",
    locator: "mirrorOwnVideo",
    switchLocator: "mirrorOwnVideoSwitch",
    isChecked: true,
  },
  {
    label: "Hide participants with no video",
    locator: "hideNoVideoParticipants",
    switchLocator: "hideNoVideoParticipantsSwitch",
    isChecked: false,
  },
  {
    label: "Permanent top bar",
    locator: "permanentTopBar",
    switchLocator: "permanentTopBarSwitch",
    isChecked: true,
  },
  {
    label: "Hidden media controls",
    locator: "hiddenControls",
    switchLocator: "hiddenControlsSwitch",
    isChecked: false,
  },
  {
    label: "Separate media controls",
    locator: "buttonControlBar",
    switchLocator: "buttonControlBarSwitch",
    isChecked: false,
  },
  {
    label: "Side drawer over content",
    locator: "drawerOverlayed",
    switchLocator: "drawerOverlayedSwitch",
    isChecked: true,
  },
  {
    label: "Show notifications",
    locator: "showNotifications",
    switchLocator: "showNotificationsSwitch",
    isChecked: true,
  },
];

for (const switchSetting of switchSettings) {
  test(`Audio switch settings: ${switchSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    await settingsMediaPage.getPage.getByText("Appearance").click();
    await settingsMediaPage.switchTest(switchSetting);
  });
}

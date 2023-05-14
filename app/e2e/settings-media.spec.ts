import { test, expect } from "../playwright-support/fixture.ts";
import type {
  SelectorData,
  SwitchData,
} from "../playwright-support/edumeet-page.js";

test("Upload avatar image text", async ({ settingsMediaPage }) => {
  await expect(
    settingsMediaPage.getPage.getByText(
      "Max. file size: 5MB, accepted: jpg, jpeg, png"
    )
  ).toBeVisible();
});

test("Upload avatar image button", async ({ settingsMediaPage }) => {
  const setMyPhotoButton =
    settingsMediaPage.getPage.locator(".chooseFileButton");
  await expect(setMyPhotoButton).toBeVisible();
  await expect(setMyPhotoButton).toBeEnabled();
  await expect(setMyPhotoButton).toHaveText("Set my photo");
});

test("Video and Audio settings tab", async ({ settingsMediaPage }) => {
  const mediaSettingsVideoTab = settingsMediaPage.getMediaSettingsVideoTab;
  const mediaSettingsAudioTab = settingsMediaPage.getMediaSettingsAudioTab;

  await expect(mediaSettingsVideoTab).toBeVisible();
  await expect(mediaSettingsVideoTab).toBeEnabled();
  await expect(mediaSettingsVideoTab).toHaveText("Video settings");
  expect(await mediaSettingsVideoTab.getAttribute("aria-selected")).toEqual(
    "true"
  );

  await expect(mediaSettingsAudioTab).toBeVisible();
  await expect(mediaSettingsAudioTab).toBeEnabled();
  await expect(mediaSettingsAudioTab).toHaveText("Audio settings");
  expect(await mediaSettingsAudioTab.getAttribute("aria-selected")).toEqual(
    "false"
  );
  await mediaSettingsAudioTab.click();

  expect(await mediaSettingsAudioTab.getAttribute("aria-selected")).toEqual(
    "true"
  );
  expect(await mediaSettingsVideoTab.getAttribute("aria-selected")).toEqual(
    "false"
  );
});

test("Advanced video settings accordion", async ({ settingsMediaPage }) => {
  const advancedVideoSettingsAccordion = settingsMediaPage.getPage.getByText(
    "Advanced video settings"
  );
  await expect(advancedVideoSettingsAccordion).toBeVisible();
  await expect(advancedVideoSettingsAccordion).toBeEnabled();
});

const videoSettings: Array<SelectorData> = [
  {
    label: "Select your video resolution",
    locator: "resolution",
    defaultValue: "medium",
    selectedValue: "high",
  },
  {
    label: "Select your webcam frame rate",
    locator: "webcamFrameRate",
    defaultValue: "15",
    selectedValue: "20",
  },
  {
    label: "Select your screen sharing frame rate",
    locator: "screenSharingFrameRate",
    defaultValue: "5",
    selectedValue: "10",
  },
  {
    label: "Select your preferred video mime type",
    locator: "recordingsPreferredMimeType",
    defaultValue: "video/webm",
    selectedValue: "video/webm",
  },
];

for (const videoSetting of videoSettings) {
  test(`Advanced video settings: ${videoSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    const advancedVideoSettingsAccordion = settingsMediaPage.getPage.getByText(
      "Advanced video settings"
    );
    await advancedVideoSettingsAccordion.click();

    await settingsMediaPage.selectorTest(videoSetting);
  });
}

const audioSelectorSettings: Array<SelectorData> = [
  {
    label: "Select the audio preset",
    locator: "audioPreset",
    defaultValue: "conference",
    selectedValue: "hifi",
  },
  {
    label: "Select the audio sample rate",
    locator: "sampleRate",
    defaultValue: "48000",
    selectedValue: "8000",
  },
  {
    label: "Select the audio channel count",
    locator: "channelCount",
    defaultValue: "1",
    selectedValue: "2",
  },
  {
    label: "Select the audio sample size",
    locator: "sampleSize",
    defaultValue: "16",
    selectedValue: "32",
  },
  {
    label: "Select the Opus frame size",
    locator: "opusPtime",
    defaultValue: "20",
    selectedValue: "50",
  },
];

for (const audioSetting of audioSelectorSettings) {
  test(`Audio selector settings: ${audioSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    const mediaSettingsAudioTab = settingsMediaPage.getPage.getByTestId(
      "mediaSettingsAudioTab"
    );
    await mediaSettingsAudioTab.click();
    const advancedAudioSettingsAccordion = settingsMediaPage.getPage.getByText(
      "Advanced audio settings"
    );
    await advancedAudioSettingsAccordion.click();

    await settingsMediaPage.selectorTest(audioSetting);
  });
}

const audioSettings: Array<SwitchData> = [
  {
    label: "Echo cancellation",
    locator: "echoCancellation",
    switchLocator: "echoCancellationSwitch",
    isChecked: true,
  },
  {
    label: "Auto gain control",
    locator: "autoGainControl",
    switchLocator: "autoGainControlSwitch",
    isChecked: true,
  },
  {
    label: "Noise suppression",
    locator: "noiseSuppression",
    switchLocator: "noiseSuppressionSwitch",
    isChecked: true,
  },
  {
    label: "Voice activated unmute",
    locator: "voiceActivatedUnmute",
    switchLocator: "voiceActivatedUnmuteSwitch",
    isChecked: false,
  },
  {
    label: "Enable Opus Discontinuous Transmission (DTX)",
    locator: "opusDtx",
    switchLocator: "opusDtxSwitch",
    isChecked: true,
  },
  {
    label: "Enable Opus Forward Error Correction (FEC)",
    locator: "opusFec",
    switchLocator: "opusFecSwitch",
    isChecked: true,
  },
];

for (const audioSetting of audioSettings) {
  test(`Audio switch settings: ${audioSetting.label}`, async ({
    settingsMediaPage,
  }) => {
    const mediaSettingsAudioTab = settingsMediaPage.getPage.getByTestId(
      "mediaSettingsAudioTab"
    );
    await mediaSettingsAudioTab.click();
    const advancedAudioSettingsAccordion = settingsMediaPage.getPage.getByText(
      "Advanced audio settings"
    );
    await advancedAudioSettingsAccordion.click();
    await settingsMediaPage.switchTest(audioSetting);
  });
}

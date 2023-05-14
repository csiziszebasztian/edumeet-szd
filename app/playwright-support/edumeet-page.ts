import { expect } from "@playwright/test";
import type { Locator } from "@playwright/test";
import type { Page } from "@playwright/test";

export interface TooltipData {
  parentTooltipLocator: string;
  parentTooltipTitle: string;
  tooltipText: string;
  hoverElmentLocator: string;
  toolTipLocator: string;
}

export interface LocalData {
  localeButtonLocator: string;
}

export interface LoginData {
  roomLocator: string;
  roomContent: string;
  nameLocator: string;
  nameContent: string;
  joinLocator: string;
}

export interface SelectorData {
  label: string;
  locator: string;
  defaultValue?: string;
  selectedValue?: string;
}

export interface SwitchData {
  label: string;
  locator: string;
  switchLocator: string;
  isChecked: boolean;
}

export class EduMeetPage {
  private readonly page: Page;

  //Login-locatores
  private readonly joinButton: Locator;
  private readonly displayName: Locator;
  private readonly roomId: Locator;
  private readonly micCamToggleButton: Locator;
  private readonly camToggleButton: Locator;
  private readonly micToggleButton: Locator;
  private readonly disableToggleButton: Locator;
  private readonly micCamTooltip: Locator;
  private readonly camTooltip: Locator;
  private readonly micTooltip: Locator;
  private readonly disableTooltip: Locator;
  private readonly loginDialog: Locator;

  //Global-locators
  private readonly localeButton: Locator;

  //Room-locator
  private readonly leaveButton: Locator;
  private readonly leaveDialog: Locator;
  private readonly leaveDialogNo: Locator;
  private readonly leaveDialogYes: Locator;
  private readonly lockRoomButton: Locator;
  private readonly settingsButton: Locator;
  private readonly participantsButton: Locator;
  private readonly settingDialog: Locator;
  private readonly fullScreenButton: Locator;
  private readonly moreActionButton: Locator;
  private readonly openDrawerButton: Locator;
  private readonly recordButtton: Locator;
  private readonly drawerRaiseHand: Locator;
  private readonly drawer: Locator;
  private readonly moreActionList: Locator;
  private readonly addVideo: Locator;
  private readonly addVideoDialog: Locator;
  private readonly hideSelfView: Locator;
  private readonly meCameraVideo: Locator;
  private readonly helpDialog: Locator;
  private readonly help: Locator;
  private readonly abaut: Locator;
  private readonly abautDialog: Locator;
  private readonly showLobbyButton: Locator;
  private readonly lobbyDialog: Locator;
  private readonly promoteAllLobby: Locator;
  private readonly mediaSettingsVideoTab: Locator;
  private readonly mediaSettingsAudioTab: Locator;

  constructor(page: Page) {
    this.page = page;

    //Login-locators
    this.joinButton = this.page.locator("id=joinButton");
    this.displayName = this.page.locator("id=displayname");
    this.roomId = this.page.locator("id=roomId");
    this.micCamToggleButton = this.page.getByTestId("mic-cam-toggleButton");
    this.camToggleButton = this.page.getByTestId("cam-toggleButton");
    this.micToggleButton = this.page.getByTestId("mic-toggleButton");
    this.disableToggleButton = this.page.getByTestId("disable-toggleButton");
    this.micCamTooltip = this.page.getByTestId("mic-cam-tooltip");
    this.camTooltip = this.page.getByTestId("cam-tooltip");
    this.micTooltip = this.page.getByTestId("mic-tooltip");
    this.disableTooltip = this.page.getByTestId("disable-tooltip");
    this.loginDialog = this.page.getByTestId("loginDialog");

    //Global-getByTestIds
    this.localeButton = this.page.getByTestId("localeButton");

    //Room-getByTestId
    this.leaveButton = this.page.getByTestId("leaveButton");
    this.leaveDialog = this.page.getByTestId("leaveDialog");
    this.leaveDialogNo = this.page.getByTestId("leaveDialogNo");
    this.leaveDialogYes = this.page.getByTestId("leaveDialogYes");
    this.lockRoomButton = this.page.getByTestId("lockRoomButton");
    this.settingsButton = this.page.getByTestId("settingsButton");
    this.settingDialog = this.page.getByTestId("settingDialog");
    this.participantsButton = this.page.getByTestId("participantsButton");
    this.drawerRaiseHand = this.page.getByTestId("drawerRaiseHand");
    this.fullScreenButton = this.page.getByTestId("fullscreenButton");
    this.moreActionButton = this.page.getByTestId("moreActions");
    this.openDrawerButton = this.page.getByTestId("openDrawer");
    this.recordButtton = this.page.getByTestId("recordButton");
    this.drawer = this.page.getByTestId("drawer");
    this.moreActionList = this.page.getByTestId("moreActionList");
    this.addVideo = this.page.getByTestId("addVideo");
    this.addVideoDialog = this.page.getByTestId("addVideoDialog");
    this.meCameraVideo = this.page.getByTestId("meCameraVideo");
    this.hideSelfView = this.page.getByTestId("hideSelfView");
    this.help = this.page.getByTestId("help");
    this.helpDialog = this.page.getByTestId("helpDialog");
    this.abaut = this.page.getByTestId("abaut");
    this.abautDialog = this.page.getByTestId("abautDialog");
    this.showLobbyButton = this.page.getByTestId("showLobbyButton");
    this.lobbyDialog = this.page.getByTestId("lobbyDialog");
    this.promoteAllLobby = this.page.getByTestId("promoteAllLobby");
    this.mediaSettingsVideoTab = this.page.getByTestId("mediaSettingsVideoTab");
    this.mediaSettingsAudioTab = this.page.getByTestId("mediaSettingsAudioTab");
  }

  get getPage(): Page {
    return this.page;
  }

  get getJoinButton(): Locator {
    return this.joinButton;
  }

  get getDisplayName(): Locator {
    return this.displayName;
  }

  get getRoomId(): Locator {
    return this.roomId;
  }

  get getMicCamToggleButton(): Locator {
    return this.micCamToggleButton;
  }

  get getCamToggleButton(): Locator {
    return this.camToggleButton;
  }

  get getMicToggleButton(): Locator {
    return this.micToggleButton;
  }

  get getDisableToggleButton(): Locator {
    return this.disableToggleButton;
  }

  get getMicCamTooltip(): Locator {
    return this.micCamTooltip;
  }

  get getCamTooltip(): Locator {
    return this.camTooltip;
  }

  get getMicTooltip(): Locator {
    return this.micTooltip;
  }

  get getDisableTooltip(): Locator {
    return this.disableTooltip;
  }

  get getLoginDialog(): Locator {
    return this.loginDialog;
  }

  get getLocaleButton(): Locator {
    return this.localeButton;
  }

  get getLeaveButton(): Locator {
    return this.leaveButton;
  }

  get getLeaveDialog(): Locator {
    return this.leaveDialog;
  }

  get getLeaveDialogNo(): Locator {
    return this.leaveDialogNo;
  }

  get getLeaveDialogYes(): Locator {
    return this.leaveDialogYes;
  }

  get getLockRoomButton(): Locator {
    return this.lockRoomButton;
  }

  get getSettingsButton(): Locator {
    return this.settingsButton;
  }

  get getSettingDialog(): Locator {
    return this.settingDialog;
  }

  get getParticipantsButton(): Locator {
    return this.participantsButton;
  }

  get getDrawerRaiseHand(): Locator {
    return this.drawerRaiseHand;
  }

  get getFullScreenButton(): Locator {
    return this.fullScreenButton;
  }

  get getMoreActionButton(): Locator {
    return this.moreActionButton;
  }

  get getOpenDrawerButton(): Locator {
    return this.openDrawerButton;
  }

  get getRecordButtton(): Locator {
    return this.recordButtton;
  }

  get getDrawer(): Locator {
    return this.drawer;
  }

  get getMoreActionList(): Locator {
    return this.moreActionList;
  }

  get getAddVideo(): Locator {
    return this.addVideo;
  }

  get getAddVideoDialog(): Locator {
    return this.addVideoDialog;
  }

  get getMeCameraVideo(): Locator {
    return this.meCameraVideo;
  }

  get getHideSelfView(): Locator {
    return this.hideSelfView;
  }

  get getHelp(): Locator {
    return this.help;
  }

  get getHelpDialog(): Locator {
    return this.helpDialog;
  }

  get getAbaut(): Locator {
    return this.abaut;
  }

  get getAbautDialog(): Locator {
    return this.abautDialog;
  }

  get getShowLobbyButton(): Locator {
    return this.showLobbyButton;
  }

  get getLobbyDialog(): Locator {
    return this.lobbyDialog;
  }

  get getPromoteAllLobby(): Locator {
    return this.promoteAllLobby;
  }

  get getMediaSettingsVideoTab(): Locator {
    return this.mediaSettingsVideoTab;
  }

  get getMediaSettingsAudioTab(): Locator {
    return this.mediaSettingsAudioTab;
  }

  async goto() {
    await this.page.goto("/");
  }

  async login(roomId: string, displayName: string) {
    await this.roomId.fill(roomId);
    await this.displayName.fill(displayName);
    await this.joinButton.click();
  }

  async customLogin(loginData: LoginData) {
    await this.page.locator(loginData.roomLocator).fill(loginData.roomContent);
    await this.page.locator(loginData.nameLocator).fill(loginData.nameContent);
    await this.page.locator(loginData.joinLocator).click();
  }

  async tooltipTest(tooltipData: TooltipData) {
    const parentTooltip = this.page.locator(tooltipData.parentTooltipLocator);

    const tooltipText = await parentTooltip.getAttribute(
      tooltipData.parentTooltipTitle
    );
    expect(tooltipText).toEqual(tooltipData.tooltipText);

    const hoverElment = this.page.locator(tooltipData.hoverElmentLocator);
    await hoverElment.hover();
    const tooltip = this.page.locator(tooltipData.toolTipLocator);
    await expect(tooltip).toBeVisible();
    await expect(tooltip).toHaveText(tooltipData.tooltipText);
  }

  async selectorTest(selectorData: SelectorData) {
    const setting = this.page.getByTestId(selectorData.locator);

    await expect(setting).toBeVisible();
    await expect(setting).toBeEnabled();
    await expect(setting).toContainText(selectorData.label);

    if (selectorData?.defaultValue && selectorData?.selectedValue) {
      const selector = setting.getByRole("button");
      const input = setting.locator("input");
      expect(await input.inputValue()).toEqual(selectorData.defaultValue);
      await selector.click();
      await this.page
        .locator(`li[data-value="${selectorData.selectedValue}"]`)
        .click();
      expect(await input.inputValue()).toEqual(selectorData.selectedValue);
    }
  }

  async switchTest(switchData: SwitchData) {
    const setting = this.page.getByTestId(switchData.locator);
    await expect(setting).toBeVisible();
    await expect(setting).toBeEnabled();

    if (switchData.switchLocator) {
      const switchElement = this.page.getByTestId(
        switchData.switchLocator
      );
      const attribute = "class";
      const checked = "checked";
      const defaultValue = switchData.isChecked;

      let switchElementAttribute = await switchElement.getAttribute(attribute);
      let isChecked = switchElementAttribute?.includes(checked);
      expect(isChecked).toEqual(defaultValue);
      await switchElement.click();
      switchElementAttribute = await switchElement.getAttribute(attribute);
      isChecked = switchElementAttribute?.includes(checked);
      expect(isChecked).toEqual(!defaultValue);
    }
  }
}

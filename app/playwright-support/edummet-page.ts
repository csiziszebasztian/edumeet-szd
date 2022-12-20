import { expect } from '@playwright/test';
import type { Locator } from '@playwright/test';
import type {Page} from '@playwright/test';


export interface TooltipData {
    parentTooltipLocator: string;
    parentTooltipTitle: string;
    tooltipText: string;
    hoverElmentLocator: string;
    toolTipLocator: string;
}

export interface LocalData {
    localeButtonLocator: string
}

export interface LoginData {
    roomLocator: string;
    roomContent: string;
    nameLocator: string;
    nameContent: string;
    joinLocator: string;
}

export class EdummetPage {

    readonly page: Page;

    //Login-locatores
    private readonly joinButton: Locator;
    private readonly displayName: Locator;
    private readonly roomId: Locator;
    private readonly micCamToggleButton: Locator;
    private readonly camToggleButton: Locator;
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



    constructor(page: Page) {

        this.page = page;

        //Login-locators
        this.joinButton = this.page.locator('id=joinButton');
        this.displayName = this.page.locator('id=displayname');
        this.roomId = this.page.locator('id=roomId');
        this.micCamToggleButton = this.page.locator('data-testid=mic-cam-toggleButton');
        this.camToggleButton = this.page.locator('data-testid=cam-toggleButton');
        this.micCamTooltip = this.page.locator('data-testid=mic-cam-tooltip');
        this.camTooltip = this.page.locator('data-testid=cam-tooltip');
        this.micTooltip = this.page.locator('data-testid=mic-tooltip');
        this.disableTooltip = this.page.locator('data-testid=disable-tooltip');
        this.loginDialog = this.page.locator('data-testid=loginDialog');

        //Global-locators
        this.localeButton = this.page.locator('data-testid=localeButton');

        //Room-locator
        this.leaveButton = this.page.locator('data-testid=leaveButton');
        this.leaveDialog = this.page.locator('data-testid=leaveDialog');
        this.leaveDialogNo = this.page.locator('data-testid=leaveDialogNo');
        this.leaveDialogYes = this.page.locator('data-testid=leaveDialogYes');

    }

    get getJoinButton() : Locator {
        return this.joinButton;
    }

    get getDisplayName() : Locator {
        return this.displayName;
    }

    get getRoomId() : Locator {
        return this.roomId;
    }

    get getMicCamToggleButton() : Locator {
        return this.micCamToggleButton;
    } 

    get getCamToggleButton() : Locator {
        return this.camToggleButton;
    }

    get getMicCamTooltip() : Locator {
        return this.micCamTooltip;
    }

    get getCamTooltip() : Locator {
        return this.camTooltip;
    }

    get getMicTooltip() : Locator {
        return this.micTooltip;
    }

    get getDisableTooltip() : Locator {
        return this.disableTooltip;
    }

    get getLoginDialog() : Locator {
        return this.loginDialog;
    }

    get getLocaleButton() : Locator {
        return this.localeButton;
    }

    get getLeaveButton() : Locator {
        return this.leaveButton;
    }

    get getLeaveDialog() : Locator {
        return this.leaveDialog;
    }

    get getLeaveDialogNo() : Locator {
        return this.leaveDialogNo;
    }

    get getLeaveDialogYes() : Locator {
        return this.leaveDialogYes;
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(){
        await this.roomId.fill('playwrightRoom');
        await this.displayName.fill('testUser1');
        await this.joinButton.click();
    }

    async customLogin(loginDate: LoginData){
        await this.page.locator(loginDate.roomLocator).fill(loginDate.roomContent);
        await this.page.locator(loginDate.nameLocator).fill(loginDate.nameContent);
        await this.page.locator(loginDate.joinLocator).click();
    }

    async tooltipTest(tooltipData: TooltipData ) {

        const parentTooltip = this.page.locator(tooltipData.parentTooltipLocator);

        const tooltipText = await parentTooltip.getAttribute(tooltipData.parentTooltipTitle);
        expect(tooltipText).toEqual(tooltipData.tooltipText);

        const hoverElment = this.page.locator(tooltipData.hoverElmentLocator);
        await hoverElment.hover();
        const tooltip = this.page.locator(tooltipData.toolTipLocator);
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveText(tooltipData.tooltipText);
    }

    async localizationTest() {
        const localeButton = this.page.locator('data-testid=localeButton');
        const joinButton = this.page.locator('id=joinButton');
        await expect(joinButton).toContainText('Join');
        await localeButton.click();
        const hunButton = this.page.locator('text=Hungarian');
        await hunButton.click();
        await expect(joinButton).toContainText('Kapcsolódás');
    }
};
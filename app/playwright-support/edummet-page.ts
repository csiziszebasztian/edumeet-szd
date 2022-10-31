import { expect } from '@playwright/test';
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

    constructor(page: Page) {
        this.page = page;
    }

    JOIN_BUTTON  = 'id=joinButton';
    DISPLAY_NAME = 'id=displayname'; 


    getJoinButton() {
        return this.page.locator(this.JOIN_BUTTON);
    }

    getDisplayName() {
        return this.page.locator(this.DISPLAY_NAME);
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(){
        await this.page.locator('id=roomId').fill('playwrightRoom');
        await this.page.locator('id=displayname').fill('testUser1');
        await this.page.locator('id=joinButton').click();
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
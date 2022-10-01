import { expect, Page, test } from '@playwright/test';


export interface TooltipData {
    parentTooltipLocator: string;
    parentTooltipTitle: string;
    parentTooltipText: string;
    hoverelmentLocator: string;
    toolTipLocator: string;
}


export function edumeetTooltipTest(page: Page,testName: string, tooltipData: TooltipData ) {


    test(`Test ${testName} tooltip`,async () => {

        const parentTooltip = page.locator(tooltipData.parentTooltipLocator);
      
        const parentTooltipText = await parentTooltip.getAttribute(tooltipData.parentTooltipTitle);
        expect(parentTooltipText).toEqual(tooltipData.parentTooltipText);
      
        const toggleButton = page.locator(tooltipData.hoverelmentLocator);
        await toggleButton.hover();
        const tooltip = page.locator(tooltipData.toolTipLocator);
        await expect(tooltip).toBeVisible();
        await expect(tooltip).toHaveText(tooltipData.parentTooltipText);
      
      });

}
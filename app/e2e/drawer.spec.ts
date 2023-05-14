import { test, expect } from "../playwright-support/fixture.ts";

test("Participants Me container test", async ({ joinedEduMeetPage }) => {
    await joinedEduMeetPage.getParticipantsButton.click();
    await expect(joinedEduMeetPage.getPage.getByTestId("participantMeHeader")).toBeVisible();
    await expect(joinedEduMeetPage.getPage.getByTestId("participantMeHeader")).toContainText("Me");

    let color = await joinedEduMeetPage.getDrawerRaiseHand.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("color");
      });
    
      expect(color).toBe("rgb(49, 49, 49)");
    
      await joinedEduMeetPage.getDrawerRaiseHand.click();
    
      color = await joinedEduMeetPage.getDrawerRaiseHand.evaluate((ele) => {
        return window.getComputedStyle(ele).getPropertyValue("color");
      });
    
      expect(color).toBe("rgb(0, 153, 0)");
    
});

const drawerButtons = [
  {
    locator: "drawerBoldButton", 
    toolTipText: "Bold",
  },
  {
    locator: "drawerItalicButton",
    toolTipText: "Italic",
  },
  {
    locator: "drawerUnderlineButton",
    toolTipText: "Underline",
  },
  {
    locator: "drawerSortAscendingButton",
    toolTipText: "Sort ascending",
  },
  {
    locator: "drawerSortDescendingButton",
    toolTipText: "Sort descending",
  },
  {
    locator: "drawerSaveChatButton",
    toolTipText: "Save Chat",
  },
  {
    locator: "drawerShareFileButton",
    toolTipText: "Share file",
  }
];

for(const drawerButton of drawerButtons) {
  test(`${drawerButton.toolTipText}`, async ({ joinedEduMeetPage }) => {
    await joinedEduMeetPage.getOpenDrawerButton.click();
    if(drawerButton.locator.includes("Sort")){
      await joinedEduMeetPage.getPage.locator("role=textbox").fill("Test");
      await joinedEduMeetPage.getPage.locator("role=textbox").press("Enter");
    }
    if(drawerButton.locator === "drawerSortDescendingButton") {
      await joinedEduMeetPage.getPage.getByTestId("drawerSortAscendingButton").click();
    }
    await expect(joinedEduMeetPage.getPage.getByTestId(drawerButton.locator)).toBeVisible();
    await expect(joinedEduMeetPage.getPage.getByTestId(drawerButton.locator)).toBeEnabled();
    await joinedEduMeetPage.getPage.getByTestId(drawerButton.locator).hover();
    await expect(joinedEduMeetPage.getPage.locator("role=tooltip")).toBeVisible();
    await expect(joinedEduMeetPage.getPage.locator("role=tooltip")).toHaveText(drawerButton.toolTipText);
  })
};
import { expect } from '@playwright/test';
import type {Page} from '@playwright/test';


export class EdummetPage {
    
    readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }
    
};
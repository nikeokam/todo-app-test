import { expect, Locator, Page } from '@playwright/test'
import { BaseAtom } from './BaseAtom'

export class ToDoItem extends BaseAtom{

    constructor(container: Page | Locator, dataTestId: string /* "test-123" */) {
        super(container, dataTestId)
    }

    async checkCount(count: number): Promise<void> {
        await expect (this.atomLoc).toHaveCount(count)
    }

    async checkToDoItemText(text: string): Promise<void> {
        expect(await this.atomLoc.innerText()).toContain(text);
    }

}

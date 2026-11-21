import { expect, Locator, Page } from '@playwright/test'

export abstract class BaseAtom {
    container: Page | Locator
    atomLoc: Locator

    protected constructor(container: Page | Locator, dataTestId: string) {
        this.container = container
        this.atomLoc = container.getByTestId(dataTestId)
    }

    async press(): Promise<void> {
        await this.atomLoc.press('Enter')
    }

    async checkVisible(visible = true): Promise<void> {
        await expect(this.atomLoc).toBeVisible({ visible: visible })
    }

}

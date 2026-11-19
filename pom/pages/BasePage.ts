import { Button } from '../atoms/Button'
import { Locator, Page, expect } from '@playwright/test'
import { Input } from '../atoms/Input'
import {ToDoItem} from "../atoms/ToDoItem";




export class BasePage {
    readonly page: Page
    readonly todoInput: Input;
    readonly itemCountSpan:  Locator ;
    readonly main : Locator;
    readonly todoItem : ToDoItem;
    readonly activateButtonOnFirstItem: Button;
    readonly clearCompletedButton: Locator;
    readonly activeFilter : Locator;
    readonly completedFilter : Locator
    readonly exitBtn: Button;

    constructor(page: Page) {
        this.page = page;
        this.todoInput = new Input(page, 'text-input');
        this.itemCountSpan = page.locator('.todo-count');
        this.main = page.getByTestId('main');
        this.todoItem = new ToDoItem(this.main, 'todo-item');
        this.activateButtonOnFirstItem = new Button((this.todoItem.atomLoc.first()), 'todo-item-toggle');
        this.clearCompletedButton = page.locator('.clear-completed');
        this.activeFilter = page.getByRole("link", {name: 'Active'});
        this.completedFilter = page.getByRole("link", {name: 'Completed'});
        this.exitBtn = new Button(page,'todo-item-button');

    }

    async checkCounterVisible(visible = true): Promise<void> {
        await expect(this.itemCountSpan).toBeVisible({ visible });
    }

    async checkCounterText(text: string): Promise<void> {
        expect(await this.itemCountSpan.innerText()).toContain(text);
    }



    async clickOnActiveFilter(): Promise<void> {
        await this.activeFilter.click();
    }

    async clickOnCompletedFilter(): Promise<void> {
        await this.completedFilter.click();
    }

}


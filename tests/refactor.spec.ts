import { test, expect } from '@playwright/test';
import {BasePage} from "../pom/pages/BasePage";


test.describe("ToDo app tests", ()=>{

    let basePage : BasePage;

    test.beforeEach(async({page})=>{
        await page.goto('/');
        basePage = new BasePage(page);
    })
    test('TL-19-8 pom test ', async ({ page }) => {



    });


    test('TL-19-1 Create one Todo item', async ({ page }) => {

        await basePage.todoItem.checkVisible(false)
        await basePage.todoInput.fill('test todo item');
        await basePage.todoInput.press()
        await basePage.todoItem.checkVisible(true)

    });


    test('TL-19-2 Create two Todo item', async ({ page }) => {

        await basePage.checkCounterVisible(false);
        await basePage.todoInput.fill('test todo item');
        await basePage.todoInput.press()
        await basePage.todoInput.fill('test todo item 2');
        await basePage.todoInput.press()
        await basePage.checkCounterText('2')

    });

    test('TL-19-3 Create two Todo items -> click "clear completed"', async ({ page }) => {

        await basePage.todoItem.checkVisible(false)
        await basePage.todoInput.fill('test todo item');
        await basePage.todoInput.press()
        await basePage.todoInput.fill('test todo item 2');
        await basePage.todoInput.press()

        await basePage.todoItem.checkCount(2);
        await basePage.checkCounterText('2')
        await basePage.activateButtonOnFirstItem.click();
        await basePage.checkCounterText('1')
        await basePage.todoItem.checkCount(2);
        await basePage.clearCompletedButton.click();
        await basePage.checkCounterText('1')
        await basePage.todoItem.checkCount(1);

    });

    test('TL-19-4 Create two Todo items -> set active filter -> activate 1 on completed filter', async ({ page }) => {

        await basePage.todoItem.checkVisible(false)
        await basePage.todoInput.fill('activated');
        await basePage.todoInput.press();
        await basePage.todoInput.fill('not activated');
        await basePage.todoInput.press();
        await basePage.todoItem.checkCount(2);
        await basePage.clickOnActiveFilter();
        await basePage.activateButtonOnFirstItem.click();
        await basePage.checkCounterText('1');
        await basePage.todoItem.checkCount(1);
        await basePage.todoItem.checkToDoItemText('not activated');
        await basePage.clickOnCompletedFilter();
        await basePage.todoItem.checkCount(1);
        await basePage.todoItem.checkToDoItemText('activated');

    });

    test('TL-19-5 Create and activate item', async ({ page }) => {

        await basePage.todoItem.checkVisible(false);
        await basePage.todoInput.fill('test todo item');
        await basePage.todoInput.press();
        await basePage.todoItem.checkVisible(true);
        await basePage.activateButtonOnFirstItem.click();
        await basePage.completedFilter.click();
        await basePage.todoItem.checkCount(1);

    });

    test('TL-19-6 Create and delete item', async ({ page }) => {
        const todoInput = page.getByTestId('text-input');
        const main = page.getByTestId('main');
        const todoItem = main.getByTestId('todo-item');
        const exitBtn = page.getByTestId('todo-item-button');

        await expect(todoItem).not.toBeVisible();
        await todoInput.fill('test todo item');
        await todoInput.press('Enter');
        await expect(todoItem).toBeVisible();
        await todoItem.hover();
        await exitBtn.click();
        await expect(todoItem).not.toBeVisible();
    });

});
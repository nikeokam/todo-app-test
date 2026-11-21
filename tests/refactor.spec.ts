import { test } from '@playwright/test';
import {ToDoPage} from "../pom/pages/ToDoPage";


test.describe("ToDo app tests", ()=>{

    let toDoPage : ToDoPage;

    test.beforeEach(async({page})=>{
        await page.goto('/');
        toDoPage = new ToDoPage(page);
    })

    test('TL-19-1 Create one Todo item', async ({  }) => {

        await toDoPage.todoItem.checkVisible(false);
        await toDoPage.todoInput.fill('test todo item');
        await toDoPage.todoInput.press();
        await toDoPage.todoItem.checkVisible(true);

    });


    test('TL-19-2 Create two Todo item', async ({  }) => {

        await toDoPage.checkCounterVisible(false);
        await toDoPage.todoInput.fill('test todo item');
        await toDoPage.todoInput.press();
        await toDoPage.todoInput.fill('test todo item 2');
        await toDoPage.todoInput.press();
        await toDoPage.checkCounterText('2');

    });

    test('TL-19-3 Create two Todo items -> click "clear completed"', async ({  }) => {

        await toDoPage.todoItem.checkVisible(false);
        await toDoPage.todoInput.fill('test todo item');
        await toDoPage.todoInput.press();
        await toDoPage.todoInput.fill('test todo item 2');
        await toDoPage.todoInput.press();

        await toDoPage.todoItem.checkCount(2);
        await toDoPage.checkCounterText('2');
        await toDoPage.activateButtonOnFirstItem.click();
        await toDoPage.checkCounterText('1');
        await toDoPage.todoItem.checkCount(2);
        await toDoPage.clearCompletedButton.click();
        await toDoPage.checkCounterText('1');
        await toDoPage.todoItem.checkCount(1);

    });

    test('TL-19-4 Create two Todo items -> set active filter -> activate 1 on completed filter', async ({  }) => {

        await toDoPage.todoItem.checkVisible(false);
        await toDoPage.todoInput.fill('activated');
        await toDoPage.todoInput.press();
        await toDoPage.todoInput.fill('not activated');
        await toDoPage.todoInput.press();
        await toDoPage.todoItem.checkCount(2);

        await toDoPage.clickOnActiveFilter();
        await toDoPage.activateButtonOnFirstItem.click();
        await toDoPage.checkCounterText('1');
        await toDoPage.todoItem.checkCount(1);
        await toDoPage.todoItem.checkToDoItemText('not activated');

        await toDoPage.clickOnCompletedFilter();
        await toDoPage.todoItem.checkCount(1);
        await toDoPage.todoItem.checkToDoItemText('activated');

        await toDoPage.allFilter.click(); //returning to All filter and check
        await toDoPage.checkCounterText('1');

    });

    test('TL-19-5 Create and activate item', async ({  }) => {

        await toDoPage.todoItem.checkVisible(false);
        await toDoPage.todoInput.fill('test todo item');
        await toDoPage.todoInput.press();
        await toDoPage.todoItem.checkVisible(true);
        await toDoPage.activateButtonOnFirstItem.click();
        await toDoPage.completedFilter.click();
        await toDoPage.todoItem.checkCount(1);

    });

    test('TL-19-6 Create and delete item', async ({  }) => {

        await toDoPage.todoItem.checkVisible(false);
        await toDoPage.todoInput.fill('test todo item');
        await toDoPage.todoInput.press();
        await toDoPage.todoItem.checkVisible();
        await toDoPage.todoItem.hoverOnItem()
        await toDoPage.exitBtn.click(); //delete item check
        await toDoPage.todoItem.checkVisible(false);

    });

});
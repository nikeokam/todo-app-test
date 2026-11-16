import { test, expect } from '@playwright/test';



test.describe("ToDo app tests", ()=>{
  test.beforeEach(async({page})=>{
    await page.goto('/');
  })

  test('TL-19-1 Create one Todo item', async ({ page }) => {
    const todoInput = page.getByTestId('text-input');
    const main = page.getByTestId('main');
    const todoItem = main.getByTestId('todo-item');

    await expect(todoItem).not.toBeVisible();
    await todoInput.fill('test todo item');
    await todoInput.press('Enter');
    await expect(todoItem).toBeVisible()
  });


test('TL-19-2 Create two Todo item', async ({ page }) => {
  const todoInput = page.getByTestId('text-input');
  const itemCountSpan = page.locator('.todo-count')

  await expect(itemCountSpan).not.toBeVisible();
  await todoInput.fill('test todo item');
  await todoInput.press('Enter');
  await todoInput.fill('test todo item 2');
  await todoInput.press('Enter');
  expect(await itemCountSpan.innerText()).toContain('2');
  /*
  const countText = await itemCountSpan.innerText();
  const splitResult = countText.split(' ')
  const countNumber = Number(splitResult[0]);
  expect(countNumber).toBe(2);

  expect(countText.includes('2')).toBeTruthy();

   */
});
  test('TL-19-3 Create two Todo items -> click "clear completed"', async ({ page }) => {
    const todoInput = page.getByTestId('text-input');
    const main = page.getByTestId('main');
    const todoItem = main.getByTestId('todo-item');
    const itemCountSpan = page.locator('.todo-count')
    const activateButtonOnFirstItem = todoItem.first().getByTestId('todo-item-toggle');
    const clearCompletedButton = page.locator('.clear-completed')

    await expect(todoItem).not.toBeVisible();
    await todoInput.fill('test todo item');
    await todoInput.press('Enter');
    await todoInput.fill('test todo item 2');
    await todoInput.press('Enter');
    expect(await todoItem.count()).toBe(2);
    expect(await itemCountSpan.innerText()).toContain('2');
    await activateButtonOnFirstItem.click()
    expect(await itemCountSpan.innerText()).toContain('1');
    expect(await todoItem.count()).toBe(2);
    await clearCompletedButton.click();
    expect(await itemCountSpan.innerText()).toContain('1');
    expect(await todoItem.count()).toBe(1);


  });
  test('TL-19-4 Create two Todo items -> set active filter -> activate 1 on completed filter', async ({ page }) => {
    const todoInput = page.getByTestId('text-input');
    const main = page.getByTestId('main');
    const todoItem = main.getByTestId('todo-item');
    const itemCountSpan = page.locator('.todo-count')
    const activateButtonOnFirstItem = todoItem.first().getByTestId('todo-item-toggle');
    const activeFilter = page.getByRole("link", {name: 'Active'});
    const completedFilter = page.getByRole("link", {name: 'Completed'});

    await expect(todoItem).not.toBeVisible();
    await todoInput.fill('activated');
    await todoInput.press('Enter');
    await todoInput.fill('not activated');
    await todoInput.press('Enter');
    expect(await todoItem.count()).toBe(2);
    await activeFilter.click();
    await activateButtonOnFirstItem.click()
    expect(await itemCountSpan.innerText()).toContain('1');
    expect(await todoItem.count()).toBe(1);
    expect(await todoItem.innerText()).toBe('not activated');
    await completedFilter.click();
    expect(await todoItem.count()).toBe(1);
    expect(await todoItem.innerText()).toBe('activated');


  });

});
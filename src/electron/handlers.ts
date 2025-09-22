import { getAllBackendExpenseData, getAllCategoriesFromDatabase, getAllCategorySumValues } from "./main/resourceManager.js";
import { ipcMainHandle } from "./main/utils.js";

export function createHandlers(): void{
    ipcMainHandle("getAllBackendExpenseData", () => {
        return getAllBackendExpenseData();
    });

    ipcMainHandle("getAllCategories", () => {
        return getAllCategoriesFromDatabase();
    });

    ipcMainHandle("getAllCategorySumValues", () => {
        return getAllCategorySumValues();
    });
};
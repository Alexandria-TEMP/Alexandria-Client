const { expect, describe, it } = require("@jest/globals");
import "@testing-library/jest-dom";
import { onSubmit, FormData } from "@/login/lib/submit";

// TODO update tests when this is actually integrated with backend
describe("dummy onSubmit test", () => {
    const dumFormData = {
        email: "e@mail.com",
        password: "pass"
    }

    it("shows alert", () => {
        jest.spyOn(window, 'alert').mockImplementation(() => {});
        expect(onSubmit(dumFormData)).toBe(true);
        expect(window.alert).toBeCalledWith(dumFormData.email + ", " + dumFormData.password)
    })
})

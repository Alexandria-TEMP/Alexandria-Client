export type FormData = {
    email: string,
    password: string
}

export function onSubmit(data: FormData) {
    alert(data.email + ", " + data.password);
    return false;
}
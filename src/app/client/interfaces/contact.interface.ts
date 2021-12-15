export interface ContactResponse {
    ok       : boolean;
    msg     ?: string;
}

export interface Contact {
    name         : string;
    telephone    : string;
    email        : string;
    text         : string;
}
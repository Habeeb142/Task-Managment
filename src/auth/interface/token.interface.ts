export interface GenerateTokenInterface {
    email: string,
    id: number
}

export interface ValidateTokenInterface extends GenerateTokenInterface {
    token: string
}
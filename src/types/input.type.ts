const userInputs = ["username", "authority_group", "password", "name"] as const;

const inputNamesSet = new Set([...userInputs] as const);

export const InputFieldNames = Array.from(inputNamesSet);

export type InputFieldName = (typeof InputFieldNames)[number];

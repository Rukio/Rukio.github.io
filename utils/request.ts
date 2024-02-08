import {FetchOptions, ofetch} from "ofetch";

const baseURL = "https://dummyjson.com";
const headers = {
	Accept: "*/*",
};

export const getData = async (url: string, options?: FetchOptions) =>
	await ofetch(url, {
		baseURL,
		headers,
		...options,
		method: "GET",
	});
export const deleteData = async (url: string, options?: FetchOptions) =>
	await ofetch(url, {
		baseURL,
		headers,
		...options,
		method: "DELETE",
	});
export const postData = async (url: string, body: FetchOptions["body"], options?: FetchOptions) =>
	await ofetch(url, {
		baseURL,
		headers,
		...options,
		method: "POST",
		body: JSON.stringify(body),
	});
export const putData = async (url: string, body: FetchOptions["body"], options?: FetchOptions) =>
	await ofetch(url, {
		baseURL,
		headers,
		...options,
		method: "PUT",
		body: JSON.stringify(body),
	});
export const patchData = async (url: string, body: FetchOptions["body"], options?: FetchOptions) =>
	await ofetch(url, {
		baseURL,
		headers,
		...options,
		method: "PATCH",
		body: JSON.stringify(body),
	});

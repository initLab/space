function addTokenHeader(args = {}, token) {
    if (!token) {
        return args;
    }

    const authHeader = {
        authorization: 'Bearer '.concat(token),
    };

    if (typeof args[0] === 'object') {
        args[0].headers = {
            ...args[0].headers,
            ...authHeader,
        };
    }
    else {
        args[1] = {
            ...args?.[1],
            headers: {
                ...args?.[1]?.headers,
                ...authHeader,
            },
        };
    }

    return args;
}

export const fetcher = async (...args) => {
    const response = await fetch(...args);

    if (!response.ok) {
        const error = new Error(`HTTP error ${response.status.toString(10)} (${response.statusText})`);
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
    }

    if (response.status === 204) {
        return true;
    }

    return await response.json();
};

export const authenticatedFetcher = async ([key, token, ...options]) => {
    const args = addTokenHeader([key, ...options], token);

    return await fetcher(...args);
};

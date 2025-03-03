function addTokenHeader(args, token) {
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
}

export const fetcher = async (...args) => {
    const response = await fetch(...args);

    if (!response.ok) {
        const error = new Error('HTTP error '.concat(response.status));
        error.status = response.status;
        error.statusText = response.statusText;
        throw error;
    }

    return await response.json();
};

export const authenticatedFetcher = token => async (...args) => {
    addTokenHeader(args, token);

    return await fetcher(...args);
};

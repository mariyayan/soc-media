export async function sendGetReq(path){
    const request = await fetch(path);
    const response = await request.json();
    return response;
};

export async function sendPostReq(path, form){
    const request = await fetch(path, {
            method: 'POST',
            body: new FormData(form)
        });
    const response = await request.json();
    return response;
};

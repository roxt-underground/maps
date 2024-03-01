function post_message(text, klass='') {
    let messagebox = document.getElementById('messages')
    messagebox.textContent = text;
    messagebox.className = klass;
}


export function do_post(path, _obj) {
     (async () => {
        const response = await fetch(path, {
            method: 'POST',
            body: JSON.stringify(_obj),
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json'
            },
        }).catch((error) => {
            post_message(JSON.stringify(error), 'error')
        })
        if (response) {
            if (response.status > 299) {
                post_message(JSON.stringify(await response.json()), 'error')
            }
            else {
                post_message('ok', 'ok')
            }
        }
    })();
}

export async function get_as_object(path) {
    const response = await fetch(path, {
        method: 'GET',

    }).catch((error) => {
        post_message(error, 'error')
    })
    if (response) {
        if (response.status > 299) {
            post_message(JSON.stringify(await response.json()), 'error')
            throw 'invalid status: ' + response.status;
        } else {
            return await response.json();
        }
    }
    throw 'error';
}

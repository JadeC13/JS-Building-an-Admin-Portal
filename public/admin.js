async function main() {
    const response = await fetch('http://localhost:3001/listBooks')
    const data = await response.json()

    data.forEach(book => renderInput(book)) //loops through each book and does the renderInput function for each book
}

function renderInput(book) {
    const root = document.getElementById('root')

    const li = document.createElement('li')
    li.textContent = book.title

    const input = document.createElement('input')
    input.value = book.quantity

    const saveBtn = document.createElement('button')
    saveBtn.textContent = 'Save'

    saveBtn.addEventListener('click', async function () {
        await fetch('http://localhost:3001/updateBook', { //fetch has two parameters, the url u wanna request data from and the options
            method: 'PATCH',
            headers: { //some options like this header, has its own options/ objects. hence why they have curly brackets too
                'content-type': 'application/json'
            },
            body: JSON.stringify({
                id: book.id,
                quantity: input.value
            })
        })
    })

    li.append(input, saveBtn) //adding input and saveBtn to the li
    root.append(li) //adding the list items into the root div
}

main()

// i27.0.0.1 === localhost
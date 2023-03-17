const edit = document.querySelector('.edit')
const del = [...document.querySelectorAll('.del')]
console.log(del)
edit.addEventListener('click', editNote)
del.forEach(x => {
    x.addEventListener('click', deleteNote)
})


async function editNote(){

  const input = this.parentNode.childNodes[1].childNodes[0].getAttribute('data-id')
  const title = document.querySelector('input').value
  const textarea = document.querySelector('textarea').value
  console.log('lol')
  console.log(input)
  try{
      const response = await fetch(`/notes/display/${input}/edit`, {
          method: 'put',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
            "id": input,
            "title": title,
            "textarea": textarea
          })
        })
      const data = await response.json()
      console.log(data)
      location.reload()

  }catch(err){
      console.log(err)
  }
}

async function deleteNote(){
    let input; 
    if( this.parentNode.parentNode.parentNode.getAttribute('data-id') === null){
        input = this.parentNode.getAttribute('data-id')
    } else {
        input = this.parentNode.parentNode.parentNode.getAttribute('data-id')
    }
    try{
        const response = await fetch(`/notes/display/${input}/delete`, {
            method: 'delete',
            headers: {'Content-type': 'application/json'},
            body: JSON.stringify({
                "id": input,
            })
        })
        const data = await response.json()
        console.log(data)
    }catch(err){
        console.log(err)
    }
}
function addAttack() {
   let attackContainer = document.querySelector('#attack')
   let attacks = document.querySelectorAll('.attack');
   let clone_attacks = attacks[attacks.length - 1].cloneNode(true);
   if (attacks.length < 4) {
      if (attacks.length === 1) {
         clone_attacks.appendChild(createRomoveButton())
      }
      clone_attacks.querySelector("button").addEventListener('click', function () {
         removeAttack(this)
      })
      attackContainer.appendChild(clone_attacks)
      document.querySelector('#errorAttack').innerText = ""

   } else {
      document.querySelector('#errorAttack').innerText = "Vous ne pouvez ajouter que 4 attaques"
   }
}

function removeAttack(element) {
   document.querySelector('#errorAttack').innerText = ""
   let parentNode = element.parentNode
   parentNode.remove()
}

function createRomoveButton() {
   let spanRemove = document.createElement("button")
   spanRemove.setAttribute('type', 'button')
   spanRemove.setAttribute('id', 'remove-button')
   spanRemove.classList.add('btn', 'mb-3', 'bg-transparent')
   spanRemove.innerHTML = "X"
   return spanRemove
}




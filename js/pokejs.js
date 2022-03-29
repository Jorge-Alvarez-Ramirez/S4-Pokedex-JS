console.log("Pokémon")
//Llevara el id actual
let idPokemon = 0;
const min = 1;
const max = 898;

//Generar número aleatorio
function random(min, max) {
    return Math.floor((Math.random() * (max - min + 1)) + min);
}

//Consultar pokémon
function ConsultarPokemon(pokeDato){
    const url = `https://pokeapi.co/api/v2/pokemon/${pokeDato}`;
        fetch(url).then((res) => {
            if (res.status != "200") {
                pokeImage("img/no-encontrado.png");
                pokeNombre('?', "No encontrado");
                pokeInfo(false);
            }
            else {
                return res.json();
            }
        }).then((data) => {
            if (data) {
                idPokemon = data.id;
                const pokemon = {
                    id: data.id,
                    nombre : data.name,
                    imagen : data.sprites.front_default,
                    tipo : data.types[0].type.name,
                    base_experience : data.base_experience,
                    ps : data.stats[0].base_stat,
                    atk : data.stats[1].base_stat,
                    def : data.stats[2].base_stat,
                    sp_atk : data.stats[3].base_stat,
                    sp_def : data.stats[4].base_stat,
                    speed : data.stats[5].base_stat,
                    altura: (data.height / 10),
                    peso: (data.weight / 10)
                };
                pokeNombre(pokemon.id, pokemon.nombre)
                pokeImage(pokemon.imagen);
                pokeInfo(pokemon);
            }
        });
}

//boton buscar name or id
const BuscarPokemon = () => {
    const pokeNameInput = document.getElementById("pokeName");
    let pokeDato = pokeNameInput.value;
    if(pokeDato){
        pokeDato = pokeDato.toLowerCase();
        this.ConsultarPokemon(pokeDato);
    }
}

//boton buscar aleatorio
const BuscarAleatorio = () => {
    this.ConsultarPokemon(this.random(min , max));
    this.limpiarInput();
}

//botones cruz
const BuscarCruz = (valor) => {
    if((idPokemon + valor) < min){
        this.ConsultarPokemon(max);
    } else if ((idPokemon + valor) > max) {
        this.ConsultarPokemon(min);
    } else {
        this.ConsultarPokemon((idPokemon + valor))
    }
    this.limpiarInput();
}

//Asignar imagen a pantalla 1
const pokeImage = (url) => {
    const pokePhoto = document.getElementById("pokeImagen");
    pokePhoto.src = url;
}

//Asignar nombre a pantalla 1
const pokeNombre = (id ,name) => {
    const pokeNombre = document.getElementById("pokeNombre");
    pokeNombre.innerHTML = "#" + id + " - " + name;
}

//Asignar informacion pantalla 2
const pokeInfo = (pokemon) => {
    const pokeInfo = document.getElementById("pokeInfo");
    const indicadorUno = document.getElementById("indicadorUno");
    const indicadorDos = document.getElementById("indicadorDos");
    if(pokemon){
        pokeInfo.innerHTML = ` <p> Tipo: <span class="parrafo"> ${pokemon.tipo} </span> <br>
                                Experiencia: <span class="parrafo"> ${pokemon.base_experience} </span> </p>
                                <table>
                                    <tr>
                                       <td> <span> ${pokemon.ps} </span> </td> 
                                       <td> <span> ${pokemon.atk} </span> </td>
                                       <td> <span> ${pokemon.def} </span> </td>
                                       <td> <span> ${pokemon.sp_atk} </span> </td>
                                       <td> <span> ${pokemon.sp_def} </span> </td>
                                       <td> <span> ${pokemon.speed} </span> </td>
                                    </tr>
                                    <tr>
                                       <td>PS</td> 
                                       <td>ATK</td>
                                       <td>DEF</td>
                                       <td>SP.ATK</td>
                                       <td>SP.DEF</td>
                                       <td>SPEED</td>
                                    </tr>
                                </table>`;
        indicadorUno.innerHTML = `ALTURA: <span> ${pokemon.altura} M </span> `;   
        indicadorDos.innerHTML = `PESO: <span> ${pokemon.peso} KG </span> `
    } else {
        pokeInfo.innerHTML = `<p> <span> Pokémon no encontrado... </span></p>`;
        indicadorUno.innerHTML = `<span> ### </span> `;
        indicadorDos.innerHTML = `<span> ### </span> `;   
    }
}

function limpiarInput(){
    const pokeNameInput = document.getElementById("pokeName");
    pokeNameInput.value = '';
}
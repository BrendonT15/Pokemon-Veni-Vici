import { useState, useEffect } from 'react'

const PokemonCard = ({addToBanList, banList}) => {
    const [pokemonList, setPokemonList] = useState([])
    const [pokemon, setPokemon] = useState({})

    useEffect(() => {
        const fetchPokemonList = async () => {
            try {
                const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151');
                const data = await response.json();
                setPokemonList(data.results);
            } catch (err) {
                console.error(err);
            }
        };
        fetchPokemonList();
    }, []);

    const handleDiscover = async () => {
        const filteredPokemonList = await Promise.all(pokemonList.map(async (p) => {
            const response = await fetch(p.url);
            const data = await response.json();
            return data; 
        }));
    
        const nonBannedPokemon = filteredPokemonList.filter((pokemon) => {
            const isBannedType = pokemon.types.some(typeInfo => banList.includes(typeInfo.type.name));
            const isBannedAbility = pokemon.abilities.some(abilityInfo => banList.includes(abilityInfo.ability.name));
            return !(isBannedType || isBannedAbility); 
        });
    
        // Select a random Pokémon from the non-banned list
        if (nonBannedPokemon.length > 0) {
            const randomIndex = Math.floor(Math.random() * nonBannedPokemon.length);
            const randomPokemon = nonBannedPokemon[randomIndex];
            setPokemon(randomPokemon); // Update the Pokémon state
        } else {
            console.log("No available Pokémon after applying the ban list.");
        }
    };

    const handleClick = (item) => {
        addToBanList(item);
    };

    return (
        <div className="PokemonCard">
            <h1>Veni Vici!</h1>
            <h2>Discover your favorite Pokemon from generation 1!</h2>
            {pokemon && pokemon.name && pokemon.abilities && pokemon.types ? (
                <div>
                    <h2>Type:</h2>
                    {pokemon.types.map((typeInfo, index) => (
                        <button onClick={() => handleClick(typeInfo.type.name)} key={index}>{typeInfo.type.name.charAt(0).toUpperCase() + typeInfo.type.name.slice(1)}</button>
                    ))}
                    <h2>Abilities:</h2>
                    {pokemon.abilities.map((abilityInfo, index) => (
                        <button onClick={() => handleClick(abilityInfo.ability.name)} key={index}>{abilityInfo.ability.name.charAt(0).toUpperCase() + abilityInfo.ability.name.slice(1)}</button>
                    ))}
                    <h2>{pokemon.name.charAt(0).toUpperCase() + pokemon.name.slice(1)}</h2>
                    {pokemon.sprites && pokemon.sprites.front_default ? <img src={pokemon.sprites.front_default} alt={pokemon.name} /> : null}
                </div>
            ) : null }
            <button onClick={handleDiscover}>Discover!</button>
        </div>
    );
};

export default PokemonCard;

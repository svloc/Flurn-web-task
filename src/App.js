import React from "react";
import "./style.css";
import SearchPokemon from "./Pages/SearchPokemon";
import PokemonListing from "./Pages/PokemonListing";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./Pages/PokemonDetails";

export default function App() {
  return (
    <div>
      <h1>Hello StackBlitz!</h1>
      <p>Start editing to see some magic happen :)</p>
      <SearchPokemon></SearchPokemon>

      <PokemonListing />

      <Routes>
          <Route path="/:name" element={<PokemonDetails />} />
      </Routes>

    </div>
  );
}

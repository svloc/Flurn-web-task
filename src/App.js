import React from "react";
import "./style.css";
import SearchPokemon from "./Pages/SearchPokemon";
import PokemonListing from "./Pages/PokemonListing";
import { Route, Routes } from "react-router-dom";
import PokemonDetails from "./Pages/PokemonDetails";

export default function App() {
  return (
    <Routes>
      <Route path="/" exact element={<PokemonListing />} />
      <Route path="/:name" element={<PokemonDetails />} />
    </Routes>
  );
}

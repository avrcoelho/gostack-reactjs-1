import React, { useState, useEffect } from "react";

import Header from "./components/Header";
import api from "./services/api";

import "./App.css";
import logo from "./assets/logo.png";

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get("projects").then((response) => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddproject() {
    const response = await api.post("projects", {
      title: `Novo ${Date.now()}`,
      owner: "Andre Coelho",
    });

    setProjects([...projects, response.data]);
  }

  return (
    <Header title="Home page">
      <ul>
        <li>Projetos</li>
        <li>Apps</li>
      </ul>
      <ul>
        {projects.map((project) => (
          <li key={project.id}>{project.title}</li>
        ))}
      </ul>
      <button type="button" onClick={handleAddproject}>
        Adicionar projeto
      </button>

      <img src={logo} alt="ReactJS" />
    </Header>
  );
}

export default App;

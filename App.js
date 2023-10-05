import { useState, useEffect } from 'react';

import './App.css';

function AddTeam(setView) {
 let team;
 return (
     <div className="App">
       <header className="App-header">
       Adicionar um time
       </header>
       <div>
            <form>
              Nome do Time: <input type="text" placeholder={"Digite o nome do seu time"} defaultValue={""} value={team} onChange={(e) => { team = e.target.value }}/>
              <button type="button" onClick={() => {fetch('http://localhost:8080/clubs', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: team})
  });
              alert("Salvo com sucesso!")
              window.location.reload();
              }}>Salvar</button>
              <button type="button" onClick={() => {setView("home")}}>Cancelar</button>
            </form>
       </div>
     </div>
 )
}

function EditTeam(setView, team) {
 return (
     <div className="App">
       <header className="App-header">
       Editar um time
       </header>
       <div>
            <form>
              Nome do Time: <input type="text" placeholder={"Digite o nome do seu time"} defaultValue={team.name} onChange={(e) => { team.name = e.target.value }}/>
              <button type="button" onClick={() => {fetch('http://localhost:8080/clubs/' + team._id, {
    method: 'PATCH',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({name: team.name})
  });
              alert("Salvo com sucesso!")
              window.location.reload();
              }}>Salvar</button>
              <button type="button" onClick={() => {setView("listTeam")}}>Cancelar</button>
            </form>
       </div>
     </div>
 )
}

function ListTeam(teams, setTeams, setView, setTeam) {
  return (
      <div className="App">
        <header className="App-header">
            Listar times
        </header>
        <div className="flex-container">
          <table className="row">
            <thead>
              <tr>
               <th>ID</th>
               <th>Nome</th>
               <th>Ações</th>
              </tr>
            </thead>
            <tbody>
                {teams.map((club, idx) => {
                  return <tr key={idx} className="flex-item">
                      <th>{ club._id }</th>
                      <td>{ club.name }</td>
                      <td>
                        <button onClick={() => {
                            setView("editTeam")
                            setTeam(club)
                        } }>Editar</button>
                        <button onClick={() => {
                            fetch('http://localhost:8080/clubs/' + club._id, {
                                method: 'DELETE',
                            })
                            alert("Excluído com sucesso!")
                            window.location.reload();
                        } }>Excluir</button>
                        <button onClick={() => {
                          setTeam(club)
                          setView("addplayer")
                        } }> Adicionar jogador</button>
                        </td>
                  </tr>
                })}
            </tbody>
         </table>
        </div>
        <div>
          <button type="button" onClick={() => {setView("home")}}>Voltar para  Home</button>
        </div>
      </div>
  )
}

function Addplayer(setView, club) {
  console.log(club)
  let player = {name: "", age: "", position: "", club: club._id}
  return (
      <div className="App">
        <header className="App-header">
        Adicionar um jogador
        </header>
        <div>
             <form>              
             Nome do jogador : <input type="text" placeholder={"Digite o nome do Jogador"} defaultValue={""} onChange={(e) => {  player.name = e.target.value }}/>
             Idade do jogador : <input type="text" placeholder={"Digite a idade do jogador"} defaultValue={""} onChange={(e) => {  player.age = e.target.value }}/>
             Posição do jogador : <input type="text" placeholder={"Digite a posição"} defaultValue={""} onChange={(e) => {  player.position = e.target.value }}/>
             ID do time : <input type="text" placeholder={"Digite o id do time"} defaultValue={club._id} onChange={(e) => {  player.club = e.target.value }}/>
               <button type="button" onClick={() => {fetch('http://localhost:8080/players', {
     method: 'POST',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(player)
   });
               alert("Salvo com sucesso!")
               window.location.reload();
               }}>Salvar</button>
               <button type="button" onClick={() => {setView("home")}}>Cancelar</button>
             </form>
        </div>
      </div>
  )
 }
 
 function Editplayer(setView, player) {
  return (
      <div className="App">
        <header className="App-header">
        Editar um jogador
        </header>
        <div>
             <form>
             Nome do jogador : <input type="text" placeholder={"Digite o nome do Jogador"} defaultValue={player.name} onChange={(e) => {  player.name = e.target.value }}/>
             Idade do jogador : <input type="text" placeholder={"Digite a idade do jogador"} defaultValue={player.age} onChange={(e) => {  player.age = e.target.value }}/>
             Posição do jogador : <input type="text" placeholder={"Digite a posição"} defaultValue={player.position} onChange={(e) => {  player.position = e.target.value }}/>
             ID do time : <input type="text" placeholder={"Digite o id do time"} defaultValue={player.club} onChange={(e) => {  player.club = e.target.value }}/>
               <button type="button" onClick={() => {fetch("http://localhost:8080/players/" + player._id, {
     method: 'PATCH',
     headers: {
       'Accept': 'application/json',
       'Content-Type': 'application/json'
     },
     body: JSON.stringify(player)
   });
               alert("Salvo com sucesso!")
               window.location.reload();
               }}>Salvar</button>
               <button type="button" onClick={() => {setView("listplayer")}}>Cancelar</button>
             </form>
        </div>
      </div>
  )
 }
 
 function listplayer(players, setplayers, setView, setplayer) {
   return (
       <div className="App">
         <header className="App-header">
             Listar jogadores
         </header>
         <div className="flex-container">
           <table className="row">
             <thead>
               <tr>
                <th>ID</th>
                <th>Nome</th>
                <th>Ações</th>
               </tr>
             </thead>
             <tbody>
                 {players.map((player, idx) => {
                   return <tr key={idx} className="flex-item">
                       <th>{ player._id }</th>
                       <td>{ player.name }</td>
                       <td>
                         <button onClick={() => {
                             setView("editplayer")
                             setplayer(player)
                         } }>Editar</button>
                         <button onClick={() => {
                             fetch('http://localhost:8080/players/' + player._id, {
                                 method: 'DELETE',
                             })
                             alert("Excluído com sucesso!")
                             window.location.reload();
                         } }>Excluir</button>
                         </td>
                   </tr>
                 })}
             </tbody>
          </table>
         </div>
         <div>
           <button type="button" onClick={() => {setView("home")}}>Voltar para  Home</button>
         </div>
       </div>
   )
 }

function Home(setView) {
  return (
    <div className="App">
      <div>
          <button onClick={() => {
            setView("addTeam");
          }}>Adicionar time</button>
          <button onClick={() => {
            setView("listTeam");
          }}>Lista os times</button>
          <button onClick={() => {
            setView("listplayer");
          }}>Lista os jogadores</button>
      </div>
    </div>
  );
}



function renderView(view, setTeams, setView, teams, setTeam, team, setplayers, players, setplayer, player) {
  switch (view) {
    case 'home':
        return Home(setView);
    case 'addTeam':
        return AddTeam(setView);
    case "listTeam":
        return ListTeam(teams, setTeams, setView, setTeam);
    case "editTeam":
        return EditTeam(setView, team);
    case 'addplayer':
        return Addplayer(setView, team);
    case "listplayer":
        return listplayer(players, setplayers, setView, setplayer);
    case "editplayer":
        return Editplayer(setView, player);
    default:
        return Home(setView);
  }
}

function App() {
  const [view, setView] = useState('home');
  const [teams, setTeams] = useState(null);
  const [team, setTeam] = useState(null);
  const [players, setplayers] = useState(null);
  const [player, setplayer] = useState(null);
  useEffect(() => {
    async function fetchData() {
      const response = await fetch("http://localhost:8080/clubs");
      const data = await response.json();
      setTeams(data.data);
    }
    async function fetchPlayers() {
      const response = await fetch("http://localhost:8080/players");
      const data = await response.json();
      setplayers(data.data);
    }
    if (!teams && !players) {
      fetchData();
      fetchPlayers();
    }
  }, [teams]);
  return renderView(view, setTeams, setView, teams, setTeam, team, setplayers, players, setplayer, player);
}

export default App;
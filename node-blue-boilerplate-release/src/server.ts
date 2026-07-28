import fastify from 'fastify';
import cors from '@fastify/cors';

const server = fastify({ logger: true });
server.register(cors, {
    origin: "*",
});

const teams = [
    { id: 1, name: "Mclaren", base: "Woking, United Kingdom", teamPrincipal: "Andrea Stella", chassis: "MCL60", powerUnit: "Mercedes M14 E Performance", firstTeamEntry: 1966, worldChampionships: 8, polePositions: 181, fastestLaps: 173, podiums: 488 },
    { id: 2, name: "Red Bull Racing", base: "Milton Keynes, United Kingdom", teamPrincipal: "Christian Horner", chassis: "RB19", powerUnit: "Honda RA621H", firstTeamEntry: 2005, worldChampionships: 6, polePositions: 78, fastestLaps: 70, podiums: 183 },
    { id: 3, name: "Mercedes-AMG Petronas F1 Team", base: "Brackley, United Kingdom", teamPrincipal: "Toto Wolff", chassis: "W14", powerUnit: "Mercedes M14 E Performance", firstTeamEntry: 2010, worldChampionships: 8, polePositions: 132, fastestLaps: 122, podiums: 206 },
    { id: 4, name: "Scuderia Ferrari", base: "Maranello, Italy", teamPrincipal: "Frédéric Vasseur", chassis: "SF-23", powerUnit: "Ferrari 066/7", firstTeamEntry: 1950, worldChampionships: 16, polePositions: 243, fastestLaps: 253, podiums: 788 }
]

const drivers = [
    { id: 1, name: "Max Verstappen", team: "Red Bull Racing", nationality: "Dutch", dateOfBirth: "1997-09-30", worldChampionships: 2, polePositions: 19, fastestLaps: 15, podiums: 60 },
    { id: 2, name: "Lewis Hamilton", team: "Mercedes-AMG Petronas F1 Team", nationality: "British", dateOfBirth: "1985-01-07", worldChampionships: 7, polePositions: 103, fastestLaps: 61, podiums: 182 }, 
    { id: 3, name: "Charles Leclerc", team: "Scuderia Ferrari", nationality: "Monegasque", dateOfBirth: "1997-10-16", worldChampionships: 0, polePositions: 5, fastestLaps: 3, podiums: 15 },
    { id: 4, name: "Lando Norris", team: "Mclaren", nationality: "British", dateOfBirth: "1999-11-13", worldChampionships: 0, polePositions: 0, fastestLaps: 1, podiums: 3 }
]

server.get("/teams", async(request, reply) => {
  reply.type('application/json').code(200)

  return { teams, drivers};
});

interface DriversParams {
    id: string;
}

server.get<{Params: DriversParams}>("/drivers/:id", async(request, reply) => {
    const id = parseInt(request.params.id);
    const driver = drivers.find(driver => driver.id === id);

    if (!driver) {
        reply.type("application/json").code(404);
        return { error: "Driver not found" };
    } else {
        reply.type("application/json").code(200);
        return driver;
    }
});

server.listen({port: 3333, }, () => {
  console.log("Server running on port 3333");
});

server.get("/drivers", async(request, reply) => {
  reply.type('application/json').code(200)

  return { drivers };
});


# TrainingLog

En treningsdagbok-API med Docker og database


### Teknisk stack

- **Backend:** ASP.NET Core Web API (.NET 8)
- **Database:** PostgreSQL (kjøres i Docker)
- **ORM:** Entity Framework Core
- **Container:** Docker + Docker Compose
- **Frontend (valgfritt, dag 3):** React + Vite (TypeScript)
- **API-docs:** Swagger (Swashbuckle)



##### Starte prosjektet
```Bash
docker compose up -d db
dotnet ef database update
docker compose up --build
```


Her er et screen shot av swagger etter post, put, delete og get har blitt kjørt.
<img width="1615" height="1045" alt="image" src="https://github.com/user-attachments/assets/f68bada4-19ba-461e-ba2e-0d28dcdd251f" />

<br>

### Dag 1 – Docker + Database + Prosjektoppsett

**Mål:** Databasen kjører i Docker, EF Core er koblet til, og du kan lese/skrive data.

**Steg 1 – Opprett prosjektet**

Kjør i terminalen (hvor du vil ha prosjektet, f.eks. `~/projects/`):

bash

```bash
cd ~/projects
dotnet new webapi -n TrainingLog
cd TrainingLog
dotnet add package Microsoft.EntityFrameworkCore
dotnet add package Npgsql.EntityFrameworkCore.PostgreSQL
dotnet add package Microsoft.EntityFrameworkCore.Tools
```

**Steg 2 – Lag modellen**

Lag filen `Models/WorkoutSession.cs`:

csharp

```csharp
public class WorkoutSession
{
    public int Id { get; set; }
    public DateTime Date { get; set; }
    public string Type { get; set; } = string.Empty; // e.g. "Running", "Gym"
    public int DurationMinutes { get; set; }
    public string? Notes { get; set; }
}
```

**Steg 3 – DbContext og connection string**

Lag `Data/AppDbContext.cs`, koble til i `Program.cs` med connection string som peker til Docker-containeren.

**Steg 4 – Docker Compose**

Lag `docker-compose.yml` i rotmappen:

yaml

```yaml
services:
  db:
    image: postgres:16
    environment:
      POSTGRES_USER: traininguser
      POSTGRES_PASSWORD: trainingpass
      POSTGRES_DB: traininglog
    ports:
      - "5432:5432"
    volumes:
      - pgdata:/var/lib/postgresql/data

  api:
    build: .
    ports:
      - "5000:8080"
    environment:
      ConnectionStrings__Default: "Host=db;Port=5432;Database=traininglog;Username=traininguser;Password=trainingpass"
    depends_on:
      - db

volumes:
  pgdata:
```

**Steg 5 – EF Migrations**

Kjør i `~/projects/TrainingLog/`:

bash

```bash
dotnet ef migrations add InitialCreate
dotnet ef database update
```

(Databasen må kjøre først: `docker compose up db -d`)

**Sjekk:** Swagger åpnes på `http://localhost:5000/swagger` og databasen er tom men klar.

<br>

### Dag 2 – CRUD API med validering

**Mål:** Fullstendige endepunkter for å opprette, hente, oppdatere og slette treningsøkter.

Lag `Controllers/WorkoutSessionsController.cs` med disse endepunktene:

|Metode|Rute|Hva den gjør|
|---|---|---|
|GET|`/api/workoutsessions`|Hent alle øktene|
|GET|`/api/workoutsessions/{id}`|Hent én økt|
|POST|`/api/workoutsessions`|Opprett ny økt|
|PUT|`/api/workoutsessions/{id}`|Oppdater økt|
|DELETE|`/api/workoutsessions/{id}`|Slett økt|

Legg til enkel validering med Data Annotations på modellen (f.eks. `[Required]`, `[Range(1, 600)]` på varighet).

Bruk DTOs (Data Transfer Objects) for request/response — dette er god praksis og ser bra ut på GitHub.

**Sjekk:** Test alle endepunktene i Swagger manuelt.

<br>

### Dag 3 – Frontend (valgfritt) + Polering

**Alternativ A – Enkel React-frontend**

Kjør i `~/projects/`:

bash

```bash
npm create vite@latest training-log-frontend -- --template react-ts
cd training-log-frontend
npm install
```

Lag én side med:

- Liste over alle treningsøkter (GET)
- Et skjema for å legge til ny økt (POST)
- Slett-knapp per økt (DELETE)

Husk CORS i `Program.cs` siden frontend og API kjører på ulike porter.

**Alternativ B – Polering av backend**

Hvis du heller vil gå dypere på backend:

- Legg til filtrering (`?type=Running`, `?from=2024-01-01`)
- Legg til enkel statistikk-endpoint (`/api/workoutsessions/stats` → totalt antall, gjennomsnittlig varighet)
- Skriv én eller to enkle enhetstester med xUnit

<br>

### Mappestruktur når ferdig

```
TrainingLog/
├── Controllers/
│   └── WorkoutSessionsController.cs
├── Data/
│   └── AppDbContext.cs
├── Models/
│   └── WorkoutSession.cs
├── DTOs/
│   ├── CreateWorkoutSessionDto.cs
│   └── WorkoutSessionResponseDto.cs
├── Migrations/
├── docker-compose.yml
├── Dockerfile
└── Program.cs
```

<br>

### Hele flyten
Arbeidet fra dette programmet fungerer slik:
Client -> HTTP Request -> Routing -> Controller(CRUD) -> DbContext(EF Core) -> Database
1. Klient sender request
2. Controller mottar
3. db snakker med databasen med EF Core
4. Resultat returneres som DTO (Data Transfer Object)
5. JSON sendes tilbake

### Viktige konsepter
Her brukes det mange profesjonelle backend-konsepter:
* REST API
* CRUD
- async/await
- dependency injection
- Entity Framework Core
	- Dette som bruker ORM for å kunne jobbe med databaser som vanlige C#-objekter og ungp manuell SQL kode.
- DTO pattern
- routing
- HTTP status codes
- ORM (Object Relational Mapper)
- controller architecture


### Her er komandoer for prosjektet

##### Docker
```Bash
// Dette starter PostgreSQL-containeren. 
docker compose up db -d

// Starter db (PostgreSQL) og api (C# backend)
docker compose up --build

// Kjører ned docker containeren
docker compose down

// Kjører ned og sletter databasen
docker compose down -v
```


